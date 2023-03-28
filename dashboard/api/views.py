import datetime as dt
from datetime import datetime, timedelta

import numpy as np
import pandas as pd
from django_pandas.io import read_frame


from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound, APIException
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import SoftwarePerComputer
from .serializers import SoftwarePerComputerSerializer


# Create your views here.
@api_view(['GET'])
def get_organizations(request, format=None):
    """
    :return: Returns a list of all distinct organizations.
    """
    try:
        organizations = SoftwarePerComputer.objects.values_list('organization', flat=True).distinct()
        organizations = sorted(organizations)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(organizations)


@api_view(['GET'])
def get_primary_user_full_name(request, format=None):
    """
    :return: Returns a list of users with their full name.
    """
    users = SoftwarePerComputer.objects.filter(primary_user_full_name__isnull=False).values_list(
        'primary_user_full_name', flat=True).distinct()
    return Response(users)


# @api_view(['GET'])
# def get_primary_user_email(request, format=None):
#     """
#     :return: Returns a list of emails.
#     """
#     emails = SoftwarePerComputer.objects.filter(primary_user_email__isnull=False).values_list('primary_user_email',
#                                                                                               flat=True).distinct()
#     return Response(emails)

class GetPrimaryUserEmailView(generics.ListAPIView):
    serializer_class = SoftwarePerComputerSerializer

    def get_queryset(self):
        emails = SoftwarePerComputer.objects.filter(
            primary_user_email__isnull=False
        ).values_list(
            'primary_user_email', flat=True
        ).distinct()
        return emails

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response(queryset)


@api_view(['GET'])
def get_software_recommendations(request, format=None):
    """
    :param request: A GET request with an optional 'organization' parameter.
    :return: A list of software that has not been used in the last 90 days and could potentially be reallocated.
    """
    organization = request.GET.get('organization', None)

    software_data = SoftwarePerComputer.objects.only('primary_user_full_name', 'primary_user_full_email',
                                                     'organization', 'application_name',
                                                     'last_used').values()
    software_data = software_data.filter(license_required=True)
    if organization:
        software_data = software_data.filter(organization=organization)
    else:
        pass

    df = get_sorted_df_of_unused_licenses(software_data)
    recommendations = df[['application_name', 'primary_user_full_name', 'primary_user_email', 'organization',
                          'last_used']].to_dict('records')
    return Response(recommendations)


@api_view(['GET'])
def get_org_software_users(request, format=None):
    """

    :param request:  A GET request with an optional 'organization' parameter.
    :return:  Returns a list all the software the organization uses, and its users.
    """
    organization = request.GET.get('organization', 'IT-tjenesten')
    software = SoftwarePerComputer.objects.only('organization',
                                                'application_name', 'primary_user_full_name', 'primary_user_email',
                                                'total_minutes', 'active_minutes')
    software = software.filter(license_required=True)
    if organization:
        software = software.filter(organization=organization)

    software_df = pd.DataFrame.from_records(software.values())
    grouped = software_df.groupby("application_name")

    result = []
    for name, group in grouped:
        if 'active_minutes' in group:
            data = {
                "application_name": name,
                "users": []
            }
            sorted_group = group.sort_values(by='active_minutes', ascending=True)
            for i, row in sorted_group.iterrows():
                data["users"].append({
                    "full_name": row["primary_user_full_name"],
                    "email": row["primary_user_email"],
                    "total_minutes": row["total_minutes"],
                    "active_minutes": row["active_minutes"]
                })
            result.append(data)

    return Response(result)


@api_view(['GET'])
def get_licenses_associated_with_user(request, format=None, username=None):
    """
    :param request:  A GET request with an 'primary_user_full_name' or 'computer_name' parameter.
    :return: Returns a list of all the licenses currently associated with a user or computer_name.
    """
    try:
        username = request.GET.get('primary_user_full_name', username)
        if username is None:
            raise KeyError("Provide a valid username or computername")

        software_data = SoftwarePerComputer.objects.filter(primary_user_full_name=username).values_list(
            "application_name", flat=True).distinct()
        if not software_data.exists():
            software_data = SoftwarePerComputer.objects.filter(computer_name=username).values_list(
                "application_name", flat=True).distinct()
        software_data = software_data.filter(license_required=True)
        software_df = pd.DataFrame.from_records(software_data.values())
        grouped = software_df.groupby("application_name")

        result = []
        for name, group in grouped:
            if 'active_minutes' in group:
                data = {
                    "application_name": name,
                    "data": []
                }
                sorted_group = group.sort_values(by='last_used', ascending=True)
                for i, row in sorted_group.iterrows():
                    data["data"].append({
                        "Username": row["primary_user_full_name"],
                        "Computer name": row["computer_name"],
                        "Total Minutes": row["total_minutes"],
                        "Active Minutes": row["active_minutes"],
                        "Last used": row["last_used"]
                    })
                result.append(data)

        return Response(result)

    except KeyError as e:
        print(e)
        return Response("No user or computer with that name")


@api_view(['GET'])
def get_reallocatabe_by_software_name(request, format=None, software=None):
    """
    :param request:  A GET request with an 'application_name' parameter.
    :return: Currently returns a string that with total- and allocateable licenses for a given software.
    """
    try:
        software = request.GET.get('application_name', software)
        if software is None:
            raise KeyError("No software with that name")

        software_list = SoftwarePerComputer.objects.filter(application_name=software).values("application_name",
                                                                                             "last_used")
        software_list = software_list.filter(license_required=True)
        total_licenses = len(list(software_list))

        df = get_sorted_df_of_unused_licenses(software_list)
        total_allocatable = len(df)

        # unused_by_software_name = df[['application_name', 'last_used']].to_dict('records')
        # return Response(unused_by_software_name)

        return Response(f"There are currently {total_licenses} licenses for {software}, where"
                        f" {total_allocatable} have not been used the last 90 days.")
    except KeyError as e:
        print(e)
        return Response("No software with that name")


@api_view(['GET'])
def get_org_software_users_by_name(request, format=None):
    """
    :param request: A GET request with 'application_name' and 'organization' as parameters.
    :return: Returns a list of all the users of the given software within the given organization.
    """
    application_name = request.GET.get('application_name', 'Microsoft Office 2016 PowerPoint')
    organization = request.GET.get('organization', None)

    software = SoftwarePerComputer.objects.filter(application_name=application_name,
                                                  license_required=True, license_suite_names__isnull=True)
    if organization:
        software = software.filter(organization=organization)

    software_df = pd.DataFrame.from_records(software.values())
    # Fill null values in the "active_minutes" and "total_minutes" columns with 0
    software_df[['active_minutes', 'total_minutes']] = software_df[['active_minutes', 'total_minutes']].fillna(0)
    # Sort by "active_minutes" column, moving null values to the end
    sorted_group = software_df.sort_values(by='active_minutes', ascending=True, na_position='last')

    # Group by organization
    groups = sorted_group.groupby('organization')

    result = []
    for org, group in groups:
        details = []
        for i, row in group.iterrows():
            details.append({
                "id": row["id"],
                "full_name": row["primary_user_full_name"],
                "computer_name": row["computer_name"],
                "email": row["primary_user_email"],
                "total_minutes": row["total_minutes"],
                "active_minutes": row["active_minutes"],
            })
        result.append({
            "application_name": application_name,
            "organization": org,
            "details": details
        })

    return Response(result)


@api_view(['GET'])
def software_counts(request):
    try:
        organization = request.GET.get('organization', None)
        if not organization:
            raise ParseError("No organization provided")
        software = SoftwarePerComputer.objects.filter(
            organization=organization
        ).values('last_used', 'license_required')
        software = software.filter(license_required=True, license_suite_names__isnull=True)

        # Count of total licenses filter by organization
        total_licenses = software.count()

        # Count of software that has last_used = null (Xupervisor haven't registered activity)
        never_used = software.filter(last_used__isnull=True).count()

        # Count of software that has last_used >= 90 days
        df = get_sorted_df_of_unused_licenses(software)
        unused_software = len(df)
        # Count of active licenses
        active_licenses = total_licenses - unused_software - never_used

        counts = {
            'total_licenses': total_licenses,
            'active_licenses': active_licenses,
            'never_used': never_used,
            'unused_licenses': unused_software,
        }
        return Response(counts)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ParseError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


def get_sorted_df_of_unused_licenses(software_data):
    """
    :param software_data: The software data object you want to work with
    :return: A sorted dataframe of all the software that haven't been used the las 90 days
    """
    df = pd.DataFrame(list(software_data))
    now = dt.datetime.now()
    three_months_ago = now - dt.timedelta(days=90)
    df = df[df['last_used'].notnull()]  # Filter out None values in the 'last_used' column
    df['last_used'] = np.where(df['last_used'].isnull(), three_months_ago, df['last_used'])  # Handle null values
    df['last_used'] = pd.to_datetime(df['last_used'], errors='coerce')
    df = df[np.array(df['last_used'].dt.date) <= three_months_ago.date()]
    df['last_used'] = (now - df['last_used']).dt.days
    df = df.sort_values(by='last_used', ascending=False)
    return df


class LicenseInfoView(generics.ListAPIView):
    queryset = SoftwarePerComputer.objects.all()
    serializer_class = SoftwarePerComputerSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        application_name = self.request.query_params.get('application_name', '')
        organization = self.request.query_params.get('organization')
        status = self.request.query_params.get('status')

        if not organization:
            raise ParseError("The 'organization' parameter is required.")
        if not status:
            raise ParseError("The 'status' parameter is required.")

        threshold_date = datetime.now() - timedelta(days=120)

        queryset = self.queryset.filter(
            license_required=True,
            license_suite_names__isnull=True,
            organization=organization,
        )
        if application_name:
            queryset = queryset.filter(application_name=application_name)

        status_value = None
        if status == 'active':
            queryset = queryset.filter(last_used__gte=threshold_date)
            status_value = "Aktiv"

        elif status == 'unused':
            queryset = queryset.filter(last_used__isnull=True)
            status_value = 'Ikke brukt'

        elif status == 'available':
            pass
            # TODO: Fetch data from license pool
            status_value = 'Ledig'

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if queryset.count() == 0:
            return self.get_paginated_response([])

        df = read_frame(queryset)
        grouped_df = df.groupby(['application_name', 'primary_user_full_name', 'computer_name']) \
            .apply(lambda x: x[['id', 'last_used']].to_dict('records')) \
            .reset_index() \
            .rename(columns={0: 'details'})

        sort = self.request.query_params.get('sort')
        grouped_df = grouped_df.sort_values(sort)

        result = grouped_df.to_dict('records')

        status_value = None
        if 'status' in self.request.query_params:
            status_value = self.request.query_params.get('status')
            for item in result:
                item["status"] = status_value

        paginated_result = self.paginate_queryset(result)

        return self.get_paginated_response(paginated_result)


@api_view(['GET'])
def get_license_pool(request, format=None):
    """
    :param request: A GET request with 'application_name' and 'organization' as parameters.
    :return: Returns a list containing software licenses from the license pool.
    """
    try:
        application_name = request.GET.get('application_name', None)
        organization = request.GET.get('organization', None)

        if not application_name:
            software = SoftwarePerComputer.objects.filter(application_name__isnull=False,
                                                          license_required=True, license_suite_names__isnull=True)
            software = software[0:10]
        else:
            software = SoftwarePerComputer.objects.filter(application_name=application_name,
                                                          license_required=True, license_suite_names__isnull=True)

        if organization:
            software = software.filter(organization=organization)

        software_df = pd.DataFrame.from_records(software.values())

        if software_df.empty:
            raise NotFound("No software found for the given parameters.")

        # Sort by "active_minutes" column, moving null values to the end
        sorted_group = software_df.sort_values(by='active_minutes', ascending=True, na_position='last')

        # Group by organization
        groups = sorted_group.groupby('organization')

        result = []
        for org, group in groups:
            details = []
            for i, row in group.iterrows():
                application = row["application_name"]
                details.append({
                    "id": row["id"],
                    "full_name": row["primary_user_full_name"],
                    "computer_name": row["computer_name"],
                    "email": row["primary_user_email"],
                    "last_used": row["last_used"],
                    "family": row["family"],
                    "family_version": row["family_version"],
                    "family_edition": row["family_edition"],
                })
            result.append({
                "application_name": application_name if application_name else application,
                "organization": org,
                "details": details
            })
        return Response(result)

    except ParseError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except NotFound as e:
        return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        raise APIException(str(e))


@api_view(['GET'])
def get_organization_software(request, format=None):
    """
    :param request: A GET request with an optional 'organization' parameter.
    :return: Returns a list of all distinct software used.
    """
    organization = request.GET.get('organization', None)
    status = request.GET.get('status', None)

    #if not organization:
    #    raise ParseError("Organization parameter is required.")
    if not status:
        raise ParseError("status parameter is required.")

    # Get the date 90 days ago
    threshold_date = datetime.now() - timedelta(days=90)

    try:
        software = SoftwarePerComputer.objects.values_list('application_name', flat=True).distinct()
        software = software.filter(license_required=True, license_suite_names__isnull=True)
        if organization:
            software = software.filter(organization=organization)

        if status == 'unused':
            software = software.filter(last_used__isnull=True)
        elif status == 'active':
            software = software.filter(last_used__isnull=False, last_used__gte=threshold_date)

        software = sorted(software)

        return Response(software)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
