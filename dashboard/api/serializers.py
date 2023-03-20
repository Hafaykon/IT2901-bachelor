from rest_framework import serializers

from .models import SoftwarePerComputer, PoolRequest, LicensePool


class SoftwarePerComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwarePerComputer
        fields = '__all__'


class PoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicensePool
        fields = '__all__'

    def validate(self, data):
        if data['organization'] not in SoftwarePerComputerSerializer.Meta.model.objects.values_list('organization',
                                                                                                    flat=True).distinct():
            raise serializers.ValidationError("Organization does not exist")

        elif data['application_name'] not in SoftwarePerComputerSerializer.Meta.model.objects.values_list(
                'application_name', flat=True).distinct():
            raise serializers.ValidationError("Application does not exist")
        return data


class PoolRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoolRequest
        fields = '__all__'
