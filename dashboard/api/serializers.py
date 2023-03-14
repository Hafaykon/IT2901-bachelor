from rest_framework import serializers
from .models import SoftwarePerComputer


class SoftwarePerComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwarePerComputer
        fields = '__all__'
