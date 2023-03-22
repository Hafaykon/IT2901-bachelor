from rest_framework import serializers
from .models import SoftwarePerComputer, Licenses



class SoftwarePerComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwarePerComputer
        fields = '__all__'

class LicensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licenses
        fields = '__all__'