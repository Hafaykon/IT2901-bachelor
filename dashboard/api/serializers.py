from rest_framework import serializers
from datetime import date
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

    def validate(self, data):
        if data['contact_organization'] not in SoftwarePerComputerSerializer.Meta.model.objects.values_list(
                'organization',
                flat=True).distinct():
            raise serializers.ValidationError("Organization does not exist")

        if data['application_name'] not in SoftwarePerComputerSerializer.Meta.model.objects.values_list(
                'application_name', flat=True).distinct():
            raise serializers.ValidationError("Application does not exist")

        if data['request'] not in ['add', 'remove']:
            raise serializers.ValidationError("Request must be 'add' or 'remove'")
        return data

    def create(self, validated_data):
        validated_data['request_date'] = date.today()
        return super(PoolRequestSerializer, self).create(validated_data)
