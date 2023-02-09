# Every single endpoint is defined here
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name="routes"),
    path('testerino/', views.get_dataframe, name="dataframe")

]
