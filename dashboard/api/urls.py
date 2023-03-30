# Every single endpoint is defined here
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from . import views
from .views import LicenseInfoView
from .views import UpdatePoolObject

urlpatterns = [
    path('organizations/', views.get_organizations, name='organizations'),
    path('recommendations/', views.get_software_recommendations, name='recommendations'),
    path('software/', views.get_org_software_names, name='software'),
    path('applications/', views.get_org_software_users, name='get_applications_by_user'),
    path('userlicenses/<str:username>', views.get_licenses_associated_with_user,
         name='get_licenses_associated_with_user'),
    path('softwarebyname/<str:software>', views.get_reallocatabe_by_software_name,
         name='get_reallocatabe_by_software_name'),
    path('softwarebyuser/', views.get_org_software_users_by_name, name='get_org_software_users_by_name'),
    path('count', views.software_counts, name='software_counts'),
    path('pool_req/', views.get_pool_requests, name='pool_requests'),
    path('pool/get/', views.GetLicensePool.as_view(), name='licensepool'),
    path('pool/update/<int:id>/', UpdatePoolObject.as_view(),
         name='software_per_computer_detail'),
    path('pool/create', views.CreatePoolObject.as_view(), name='create_pool_object'),
    path('licenseinfo/', LicenseInfoView.as_view(), name='licenseinfo'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
