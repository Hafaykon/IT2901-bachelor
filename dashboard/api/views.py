import datetime as dt
from collections import defaultdict
from datetime import datetime, timedelta

import numpy as np
import pandas as pd
from django_pandas.io import read_frame
from django.utils.functional import cached_property
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import ParseError
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import PoolRequest, LicensePool, SoftwarePerComputer
from .serializers import SoftwarePerComputerSerializer, PoolRequestSerializer, PoolSerializer


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
    print(len(organizations))
    return Response(organizations)


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
            raise KeyError("Provide a valid username or computer name")

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
                "primary_user_full_name": row["primary_user_full_name"],
                "computer_name": row["computer_name"],
                "primary_user_email": row["primary_user_email"],
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
        available_licenses = LicensePool.objects.filter(organization=organization).count()

        counts = {
            'total_licenses': total_licenses,
            'active_licenses': active_licenses,
            'never_used': never_used,
            'unused_licenses': unused_software,
            'available_licenses': available_licenses
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
        application_name = self.request.query_params.get('application_name', None)
        organization = self.request.query_params.get('organization')
        application_status = self.request.query_params.get('status')

        if not organization:
            raise ParseError("The 'organization' parameter is required.")
        if not application_status:
            raise ParseError("The 'status' parameter is required.")

        threshold_date = datetime.now() - timedelta(days=90)
        queryset = self.queryset.filter(
            license_required=True,
            license_suite_names__isnull=True,
            organization=organization,
        )
        if application_name:
            queryset = queryset.filter(application_name=application_name)

        if application_status == 'unused':
            queryset = queryset.filter(last_used__isnull=True)

        elif application_status == 'available':
            queryset = queryset.filter(last_used__lte=threshold_date)
        return queryset

    def aggregate_data(self, data):
        aggregated_data = defaultdict(list)

        for record in data:
            key = (record['application_name'], record['primary_user_full_name'], record['computer_name'])
            aggregated_data[key].append(record)

        result = []
        for (application, user, computer_name), details in aggregated_data.items():
            result.append({
                'application_name': application,
                'primary_user_full_name': user,
                'computer_name': computer_name,
                'details': details
            })

        return result

    def list(self, request, *args, **kwargs):
        sort = self.request.GET.get('sort', None)
        queryset = self.get_queryset().order_by(sort)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            aggregated_data = self.aggregate_data(serializer.data)
            return self.get_paginated_response(aggregated_data)

        serializer = self.get_serializer(queryset, many=True)
        aggregated_data = self.aggregate_data(serializer.data)

        return Response(aggregated_data)


@api_view(['GET'])
def get_org_software_names(request, format=None):
    """
    Returns a list of all distinct software used by an organization.
    :param request: A GET request with an optional 'organization' parameter.
    :return: Returns a list of all distinct software used.
    """
    organization = request.GET.get('organization', None)
    application_status = request.GET.get('status', None)
    pool = request.GET.get('pool', None)

    if not application_status:
        raise ParseError("status parameter is required.")

    # Get the date 90 days ago
    threshold_date = datetime.now() - timedelta(days=90)

    try:
        if pool == 'true':
            software = LicensePool.objects.values_list('application_name', flat=True).distinct()
        elif pool == 'false':
            software = SoftwarePerComputer.objects.values_list('application_name', flat=True).distinct()
            software = software.filter(license_required=True, license_suite_names__isnull=True)

            if application_status == 'unused':
                software = software.filter(last_used__isnull=True)

            elif application_status == 'available':
                software = software.filter(last_used__isnull=False, last_used__lte=threshold_date)

        if organization:
            software = software.filter(organization=organization)
        if len(software) == 0:
            return Response([])

        software = sorted(software)

        return Response(software)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetLicensePool(generics.ListAPIView):
    """
    Returns a list of all licenses in the license pool.
    parameters: application_name, organization
    """
    serializer_class = PoolSerializer
    queryset = LicensePool.objects.all()
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = LicensePool.objects.all().order_by('application_name')
        application_name = self.request.GET.get('application_name', None)
        organization = self.request.GET.get('organization', None)

        if application_name:
            if application_name in LicensePool.objects.values_list('application_name', flat=True).distinct():
                queryset = queryset.filter(application_name=application_name)
            else:
                raise NotFound("The given application name does not exist.")
        if organization:
            if organization in LicensePool.objects.values_list('organization', flat=True).distinct():
                queryset = queryset.filter(organization=organization)
            else:
                raise NotFound("The given organization does not exist.")
        return queryset

    def aggregate_data(self, data):
        aggregated_data = defaultdict(list)

        for record in data:
            key = (record['application_name'], record['organization'])
            aggregated_data[key].append(record)

        result = []
        for (application, organization), details in aggregated_data.items():
            result.append({
                'application_name': application,
                'organization': organization,
                'details': details,
            })

        return result

    def list(self, request, *args, **kwargs):
        sort = self.request.GET.get('sort', None)
        queryset = self.get_queryset().order_by(sort)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            aggregated_data = self.aggregate_data(serializer.data)
            return self.get_paginated_response(aggregated_data)

        serializer = self.get_serializer(queryset, many=True)
        aggregated_data = self.aggregate_data(serializer.data)

        return Response(aggregated_data)


@api_view(['GET'])
def get_pool_requests(request):
    organization = request.query_params.get('organization', None)

    pool_req = PoolRequest.objects.all()
    if organization:
        req_data = PoolRequest.objects.filter(contact_organization=organization)
    else:
        req_data = PoolRequest.objects.all()

    serialize_request = PoolRequestSerializer(req_data, many=True)
    return Response(serialize_request.data)


class UpdatePoolObject(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a license pool object.
    """
    queryset = LicensePool.objects.all()
    serializer_class = PoolSerializer
    lookup_field = 'id'


class CreatePoolObject(generics.CreateAPIView):
    """
    Create a new object in the license pool.
    """
    queryset = LicensePool.objects.all()
    serializer_class = PoolSerializer
