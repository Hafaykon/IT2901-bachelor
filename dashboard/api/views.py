import datetime as dt

import numpy as np
import pandas as pd
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import SoftwarePerComputer
from .serializers import SoftwarePerComputerSerializer


# Create your views here.
@api_view(['GET'])
def get_routes(request):
    routes = [
    ]
    return Response('The api is working')


@api_view(['GET'])
def get_organizations(request, format=None):
    """
    :return: Returns a list of organizations sorted alphabetically.
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
    if organization:
        software = software.filter(organization=organization)

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
def get_licenses_associated_with_user(request, format=None):
    """
    :return: Returns a list of all the licenses currently associated with a user.

    """
    try:
        username = request.GET.get('primary_user_full_name', 'Leendert Wienhofen')
        if username is None:
            raise KeyError("No user with that name")

        software_list = SoftwarePerComputer.objects.filter(primary_user_full_name=username).values("application_name")

        software_df = pd.DataFrame.from_records(software_list.values())
        grouped = software_df.groupby("primary_user_full_name").agg(lambda x: list(set(x)))

        return Response(grouped.to_dict()['application_name'])
    except KeyError as e:
        print(e)


@api_view(['GET'])
def get_reallocatabe_by_software_name(request, format=None):
    """
    :param request:  A GET request with an 'application_name' parameter.
    :return: Returns a list of all the licenses currently associated with a user.

    """
    try:
        software = request.GET.get('application_name', 'Microsoft Office 2016 PowerPoint')
        if software is None:
            raise KeyError("No software with that name")

        software_list = SoftwarePerComputer.objects.filter(application_name=software).values("application_name",
                                                                                             "last_used")
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


def get_sorted_df_of_unused_licenses(software_data):
    """
    :param software_data: The software data object you want to work with
    :return: A sorted dataframe of all the software that haven't been used the las 90 days
    """
    df = pd.DataFrame(list(software_data))
    now = dt.datetime.now()
    three_months_ago = now - dt.timedelta(days=90)
    df = df[df['last_used'].notnull()]  # Filter out None values in the 'last_used' column
    df['last_used'] = pd.to_datetime(df['last_used'], errors='coerce')
    df = df[np.array(df['last_used'].dt.date) <= three_months_ago.date()]
    df['last_used'] = (now - df['last_used']).dt.days
    df = df.sort_values(by='last_used', ascending=False)
    return df


@api_view(['GET'])
def get_org_software_users_by_name(request, format=None):
    """
    :param request: A GET request with 'application_name' and 'organization' as parameters.
    :return: Returns a list of all the users of the given software within the given organization.
    """
    application_name = request.GET.get('application_name', 'Microsoft Office 2016 PowerPoint')
    organization = request.GET.get('organization', 'IT-tjenesten')

    software = SoftwarePerComputer.objects.filter(application_name=application_name, organization=organization)

    software_df = pd.DataFrame.from_records(software.values())
    sorted_group = software_df.sort_values(by='active_minutes', ascending=True)

    result = []
    for i, row in sorted_group.iterrows():
        result.append({
            "full_name": row["primary_user_full_name"],
            "email": row["primary_user_email"],
            "total_minutes": row["total_minutes"],
            "active_minutes": row["active_minutes"]
        })


    return Response(result)
