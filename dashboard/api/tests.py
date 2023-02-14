from django.test import RequestFactory, TestCase
from django.urls import include, path, reverse
from rest_framework.test import APIRequestFactory, APITestCase
from .views import get_organizations
from .models import SoftwarePerComputer


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
        expected_organizations = ['Servere', 'Hovedtillitsvalgte']
        response = self.client.get(self.get_org_url)
        self.assertEqual(response.status_code, 200)
        for org in expected_organizations:
            self.assertIn(org, list(response.data))

    def test_get_software_recommendations_view(self):
        url = reverse('recommendations')
        response = self.client.get(url)
        expected_recommendations = [{
            'application_name': 'myapplication', 'primary_user_full_name': 'My User',
            'primary_user_email': 'myuser@example.com', 'organization': 'Servere', 'last_used': 378

        }, {'application_name': 'Hovedtillitsvalgte', 'primary_user_full_name': 'My User',
            'primary_user_email': 'myuser@example.com', 'organization': 'Hovedtillitsvalgte', 'last_used': 378

            }]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, expected_recommendations)
    # def test_get_software_recommendations_view_param(self):
    #     url = reverse('recommendations', kwargs={'organization': 'Servere'})
    #     response = self.client.get(url)
    #     print(response.data)

