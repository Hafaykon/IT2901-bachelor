from django.test import RequestFactory, TestCase
from django.urls import include, path, reverse
from rest_framework.test import APIRequestFactory
from .views import get_organizations


# Create your tests here.
class GetOrganizationsViewTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        urlpatterns = [
            path('api/', include('api.urls')),
        ]

    def test_get_organizations(self):
        url = reverse('organizations')
        request = self.factory.get(url)
        print(request)

