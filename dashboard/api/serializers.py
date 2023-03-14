from rest_framework import serializers
from .models import SoftwarePerComputer


class SoftwarePerComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwarePerComputer
        fields = '__all__'


class LicenseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwarePerComputer
        fields = ('id', 'application_name', 'primary_user_full_name', 'computer_name', 'last_used')
