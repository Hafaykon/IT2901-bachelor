from rest_framework import serializers
from .models import SoftwarePerComputer, PoolRequest


class SoftwarePerComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwarePerComputer
        fields = '__all__'


class PoolRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoolRequest
        fields = '__all__'
