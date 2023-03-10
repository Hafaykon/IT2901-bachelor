# Every single endpoint is defined here
from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.get_primary_user_full_name, name='users'),
    path('organizations/', views.get_organizations, name='organizations'),
    path('emails/', views.GetPrimaryUserEmailView.as_view(), name='emails'),
    path('recommendations/', views.get_software_recommendations, name='recommendations'),
    path('software/', views.get_organization_software, name='software'),
    path('applications/', views.get_org_software_users, name='get_applications_by_user'),
    path('userlicenses/<str:username>', views.get_licenses_associated_with_user,
         name='get_licenses_associated_with_user'),
    path('softwarebyname/<str:software>', views.get_reallocatabe_by_software_name,
         name='get_reallocatabe_by_software_name'),
    path('softwarebyuser/', views.get_org_software_users_by_name, name='get_org_software_users_by_name'),
    path('count', views.software_counts, name='software_counts'),
    path('pool_req/', views.get_pool_requests, name='pool_requests'),
    path('pool', views.get_license_pool, name='licensepool'),
    path('insert', views.insert_to_pool, name='insert'),

]
