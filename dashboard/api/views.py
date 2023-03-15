import datetime as dt
import json

import numpy as np
import pandas as pd
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from .models import SoftwarePerComputer, PoolRequest, LicensePool
from .serializers import SoftwarePerComputerSerializer, PoolRequestSerializer, PoolSerializer


# Create your views here.
@api_view(['GET'])
def get_organizations(request, format=None):
    """
    :return: Returns a list of organizations.
    """
    organizations = SoftwarePerComputer.objects.values_list('organization', flat=True).distinct()
    organizations = sorted(organizations)
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
def get_organization_software(request, format=None):
    """
    :param request: A GET request with an optional 'organization' parameter.
    :return: Returns a list of all distinct software used grouped by organization.
    """
    organization = request.GET.get('organization', 'IT-tjenesten')
    software = SoftwarePerComputer.objects.values_list('application_name', flat=True).distinct()
    software = software.filter(license_required=True)
    if organization:
        software = software.filter(organization=organization)
    software = sorted(software)

    return Response(software)


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
                                                  license_required=True)
    if organization:
        software = software.filter(organization=organization)

    software_df = pd.DataFrame.from_records(software.values())
    # Fill null values in the "active_minutes" and "total_minutes" columns with 0
    software_df[['active_minutes', 'total_minutes']] = software_df[['active_minutes', 'total_minutes']].fillna(0)
    # Sort by "active_minutes" column, moving null values to the end
    sorted_group = software_df.sort_values(by='active_minutes', ascending=True, na_position='last')

    result = []
    for i, row in sorted_group.iterrows():
        result.append({
            "id": row["id"],
            "full_name": row["primary_user_full_name"],
            "email": row["primary_user_email"],
            "organization": row["organization"],
            "total_minutes": row["total_minutes"],
            "active_minutes": row["active_minutes"],
        })

    return Response(result)


@api_view(['GET'])
def software_counts(request):
    organization = request.GET.get('organization', '')
    software = SoftwarePerComputer.objects.filter(
        organization=organization
    ).values('last_used', 'license_required')
    software = software.filter(license_required=True)

    # Count of total licenses filter by organization
    total_licenses = software.count()

    # Count of software that has last_used = null (it has never been used)
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


@api_view(['GET'])
def get_license_pool(request):
    application_name = request.GET.get('application_name', "Spotify")
    organization = request.GET.get('organization', "IT-tjenesten")

    license_pool_element = LicensePool.objects.only('organization', 'application_name', 'primary_user_email').values()
    license_pool_data = license_pool_element.filter(application_name=application_name, organization=organization)
    serialize_request = PoolSerializer(license_pool_data, many=True)

    return Response(serialize_request.data)

    """
    organizations = LicensePool.objects.values_list('organization', flat=True).distinct()
    organizations = sorted(organizations)
    return Response(organizations)

    """


@api_view(['POST'])
def insert_to_pool(request):
    # Get the user object
    # user = SoftwarePerComputer.objects.get(primary_user_full_name='Leendert Wienhofen')

    # Create a new LicensePool object and set its attributes

    data = json.loads(request.body)

    primary_user_full_name = data['primary_user_full_name']
    primary_user_email = data['primary_user_email']
    organization = data['organization']
    application_name = data['application_name']
    family = data['family']
    family_version = data['family_version']
    family_edition = data['family_edition']
    computer_name = data['computer_name']

    new_pool_object = LicensePool.objects.create(
        primary_user_full_name=primary_user_full_name,
        primary_user_email=primary_user_email,
        organization=organization,
        application_name=application_name,
        family=family,
        family_version=family_version,
        family_edition=family_edition,
        computer_name=computer_name
    )

    # Return a response indicating success
    return Response(primary_user_full_name)


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


@api_view(['DELETE'])
def delete_from_license_pool(request, id):
    pool_obj = LicensePool.objects.get(id=id)
    pool_obj.delete()
    return Response(status=204)


class SoftwarePerComputerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = LicensePool.objects.all()
    serializer_class = PoolSerializer
    lookup_field = 'id'


SoftwarePerComputerDetailView = SoftwarePerComputerDetailView.as_view()
