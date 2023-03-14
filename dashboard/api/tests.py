from django.test import RequestFactory, TestCase, Client
from django.urls import include, path, reverse
from rest_framework.test import APIRequestFactory, APITestCase
from .views import get_organizations
from .models import SoftwarePerComputer
import datetime

# Create your tests here.
class TestViews(APITestCase):
    def setUp(self):
        self.get_org_url = reverse('organizations')
        SoftwarePerComputer.objects.create(
            computer_name='mycomputer',
            application_name='myapplication',
            category='mycategory',
            family='myfamily',
            family_version='1.0',
            family_edition='Standard',
            license_required=True,
            manufacturer='mymanufacturer',
            organization='Servere',
            organization_path='/my/organization/path',
            date_added='2022-01-01',
            last_used='2022-02-01',
            run_times=10,
            total_minutes=1000,
            active_minutes=500,
            average_usage_per_run=100.0,
            active_usage_per_run=50.0,
            remote_total_minutes=0,
            remote_active_minutes=0,
            device_total_minutes=1000,
            device_active_minutes=500,
            server=False,
            cloud=False,
            virtual=False,
            portable=False,
            terminal_server=False,
            test_development=False,
            manual_client=False,
            manual_application=False,
            operating_system='Windows 10',
            total_cpus=2,
            total_cores=4,
            last_scanned='2022-02-14',
            status='Active',
            gdpr_risk=False,
            manufacturer_gdpr_compliant=True,
            manufacturer_ps_sh_compliant=True,
            manufacturer_dpd_compliant=True,
            suite=False,
            part_of_suite=False,
            suite_names='',
            license_suite=False,
            part_of_license_suite=False,
            license_suite_names='',
            block_listed=False,
            primary_user='myuser',
            primary_user_full_name='My User',
            primary_user_email='myuser@example.com'
        )
        SoftwarePerComputer.objects.create(
            computer_name='mycomputer',
            application_name='Hovedtillitsvalgte',
            category='mycategory',
            family='myfamily',
            family_version='1.0',
            family_edition='Standard',
            license_required=True,
            manufacturer='mymanufacturer',
            organization='Hovedtillitsvalgte',
            organization_path='/my/organization/path',
            date_added='2022-01-01',
            last_used='2022-02-01',
            run_times=10,
            total_minutes=1000,
            active_minutes=500,
            average_usage_per_run=100.0,
            active_usage_per_run=50.0,
            remote_total_minutes=0,
            remote_active_minutes=0,
            device_total_minutes=1000,
            device_active_minutes=500,
            server=False,
            cloud=False,
            virtual=False,
            portable=False,
            terminal_server=False,
            test_development=False,
            manual_client=False,
            manual_application=False,
            operating_system='Windows 10',
            total_cpus=2,
            total_cores=4,
            last_scanned='2022-02-14',
            status='Active',
            gdpr_risk=False,
            manufacturer_gdpr_compliant=True,
            manufacturer_ps_sh_compliant=True,
            manufacturer_dpd_compliant=True,
            suite=False,
            part_of_suite=False,
            suite_names='',
            license_suite=False,
            part_of_license_suite=False,
            license_suite_names='',
            block_listed=False,
            primary_user='myuser',
            primary_user_full_name='My User',
            primary_user_email='myuser@example.com'
        )

    def test_get_organizations_view(self):
        """
        Test for the get_organizations view. Should return all distinct organizations.
        :return:
        """
        expected_organizations = ['Servere', 'Hovedtillitsvalgte']
        response = self.client.get(self.get_org_url)
        self.assertEqual(response.status_code, 200)
        for org in expected_organizations:
            self.assertIn(org, list(response.data))

    def test_get_primary_user_full_name(self):
        """
        Should return the full name of all users.
        """
        expected_names = ['My User', 'My User']
        url = reverse('users')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        for user in expected_names:
            self.assertIn(user, list(response.data))

    def test_get_software_recommendations_view(self):
        """
        Should return all recommendations the the IT-department (standard).
        """
        url = reverse('recommendations')
        response = self.client.get(url)
        expected_recommendations = [{
            'application_name': 'myapplication', 'primary_user_full_name': 'My User',
            'primary_user_email': 'myuser@example.com', 'organization': 'Servere'

        }, {'application_name': 'Hovedtillitsvalgte', 'primary_user_full_name': 'My User',
            'primary_user_email': 'myuser@example.com', 'organization': 'Hovedtillitsvalgte'

            }]

        selected_fields = []
        for rec in response.data:
            selected_fields.append({'application_name': rec['application_name'],
                                    'primary_user_full_name': rec['primary_user_full_name'],
                                    'primary_user_email': rec['primary_user_email'],
                                    'organization': rec['organization']})

        '''
        expected_fields = []
        for rec in expected_recommendations:
            expected_fields.append({'application_name': rec['application_name'],
                                    'primary_user_full_name': rec['primary_user_full_name'],
                                    'primary_user_email': rec['primary_user_email'],
                                    'organization': rec['organization']})
        '''

        self.assertEqual(response.status_code, 200)
        self.assertEqual(selected_fields, expected_recommendations)

    def test_get_software_recommendations_view_param(self):
        """
        Should only return recommendations for the specified organization.
        """
        organization = 'Hovedtillitsvalgte'
        url = reverse('recommendations') + f'?organization={organization}'
        response = self.client.get(url)
        expected_recommendations = [{'application_name': 'Hovedtillitsvalgte', 'primary_user_full_name': 'My User',
                                     'primary_user_email': 'myuser@example.com', 'organization': 'Hovedtillitsvalgte'}]

        selected_fields = []
        for rec in response.data:
            selected_fields.append({'application_name': rec['application_name'],
                                    'primary_user_full_name': rec['primary_user_full_name'],
                                    'primary_user_email': rec['primary_user_email'],
                                    'organization': rec['organization']})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(selected_fields, expected_recommendations)

    '''
    NB! As of now 'organization' is hardcoded in the get-request meaning we can't call this method without a parameter
    def test_get_organization_software(self):
        """
        Should return all software used by the entire municipality.
        """
        url = reverse('software')
        response = self.client.get(url)
        expected_software = {"Hovedtillitsvalgte": ["Hovedtillitsvalgte"], "Servere": ["myapplication"]}

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, expected_software)

    '''

    def test_get_organization_software_param(self):
        """
        Should return all software used by the given organization.
        """
        organization = "Servere"
        url = reverse('software') + f'?organization={organization}&status=active'
        response = self.client.get(url)
        expected_software = []

        self.assertEqual(response.status_code, 200)
        self.assertEqual(list(response.data), expected_software)

    '''
    NB! As of now 'organization' is hardcoded in the get-request meaning we can't call this method without a parameter
    def test_get_org_software_users(self):
        """
        Should return a list of all the software the organization uses, and its users
        """
        url = reverse('get_applications_by_user')
        response = self.client.get(url)
        expected_return_data = [{
            'application_name': 'Hovedtillitsvalgte', 'users': [{"full_name": "My User", "email": 'myuser@example.com',
                                                                  "total_minutes": 1000, "active_minutes": 500}]},
            {'application_name': 'myapplication', 'users': [{"full_name": "My User", "email": 'myuser@example.com',
                                                            "total_minutes": 1000, "active_minutes": 500}]}
        ]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, expected_return_data)
    '''

    def test_get_org_software_users_param(self):
        """
        Should return a list of all the software the organization uses, and its users
        """
        organization = "Servere"
        url = reverse('get_applications_by_user') + f'?organization={organization}'
        response = self.client.get(url)
        expected_return_data = [{
            'application_name': 'myapplication', 'users': [{"full_name": "My User", "email": 'myuser@example.com',
                                                            "total_minutes": 1000, "active_minutes": 500}]}]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, expected_return_data)

    def test_get_licenses_associated_with_users(self):
        """
        Should return specified user with his/her licenses.
        """
        user = 'My User'
        url = reverse('get_licenses_associated_with_user', args=[user])
        response = self.client.get(url)
        last_used = datetime.date(2022, 2, 1)
        expected_software = [{'application_name': 'Hovedtillitsvalgte',
                               'data': [{'Active Minutes': 500,
                                         'Computer name': 'mycomputer',
                                         'Last used': last_used,
                                         'Total Minutes': 1000,
                                         'Username': 'My User'}]},
                              {'application_name': 'myapplication',
                               'data': [{'Active Minutes': 500,
                                         'Computer name': 'mycomputer',
                                         'Last used': last_used,
                                         'Total Minutes': 1000,
                                         'Username': 'My User'}]}]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, expected_software)

    def test_get_reallocatabe_by_software_name(self):
        """
        Should return a string with total- and reallocatable licenses for a given software.
        """
        software = 'Hovedtillitsvalgte'
        url = reverse('get_reallocatabe_by_software_name', args=[software])
        response = self.client.get(url)
        expected_response = "There are currently 1 licenses for Hovedtillitsvalgte, " \
                            "where 1 have not been used the last 90 days."
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, expected_response)
