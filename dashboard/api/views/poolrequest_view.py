from datetime import datetime

from django.db import IntegrityError
from rest_framework import generics, status, permissions
from rest_framework.response import Response

from ..models import LicensePool, PoolRequest
from ..permissions import IsUnitHead
from ..serializers import PoolRequestSerializer


class UpdatePoolRequest(generics.RetrieveUpdateAPIView):
    """
    Retrieve, update or delete a pool request.
    """
    queryset = PoolRequest.objects.all()
    serializer_class = PoolRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsUnitHead]
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        pool_request = self.get_object()

        if pool_request.completed:
            return Response({'error': 'This request has already been completed.'}, status=status.HTTP_400_BAD_REQUEST)

        action = request.data.get('action')
        if action not in ['approve', 'disapprove']:
            return Response({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

        pool_request.reviewed_by = request.user.primary_user_email
        pool_request.reviewed_date = datetime.now().date()
        if action == 'approve':
            pool_request.approved = True
            pool_request.completed = True

            if pool_request.request == 'add':
                try:
                    license_pool = LicensePool(
                        freed_by_organization=pool_request.contact_organization,
                        application_name=pool_request.application_name,
                        date_added=datetime.now(),
                        family=pool_request.family,
                        family_version=pool_request.family_version,
                        family_edition=pool_request.family_edition,
                        spc_id=pool_request.spc_id,
                    )
                    license_pool.save()
                except IntegrityError:
                    return Response({'error': 'This license already exists in the pool.'},
                                    status=status.HTTP_400_BAD_REQUEST)
            elif pool_request.request == 'remove':
                license_pool = LicensePool.objects.filter(spc_id=pool_request.spc_id)
                if license_pool.exists():
                    license_pool.delete()
        elif action == 'disapprove':
            pool_request.approved = False
            pool_request.completed = True

        pool_request.save()
        return Response(PoolRequestSerializer(pool_request).data)


class CreatePoolRequest(generics.CreateAPIView):
    queryset = PoolRequest.objects.all()
    serializer_class = PoolRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetPoolRequests(generics.ListCreateAPIView):
    serializer_class = PoolRequestSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        own_requests_serializer = self.get_serializer(queryset['own_requests'], many=True)
        org_requests_serializer = self.get_serializer(queryset['org_requests'], many=True)
        return Response({
            'own_requests': own_requests_serializer.data,
            'org_requests': org_requests_serializer.data
        })

    def get_queryset(self):
        user = self.request.user
        if user.is_unit_head:
            own_requests = PoolRequest.objects.filter(requested_by=user.primary_user_email)
            org_requests = PoolRequest.objects.filter(contact_organization=user.organization, completed=False)
            return {'own_requests': own_requests, 'org_requests': org_requests}
        else:
            own_requests = PoolRequest.objects.filter(requested_by=user.primary_user_email)
            return {'own_requests': own_requests, 'org_requests': []}
