from django.urls import path, include

from ..views import *

urlpatterns = [
    path('<int:id>', UpdatePoolRequest.as_view(), name='pool_requests'),
    path('get/', GetPoolRequests.as_view(), name='get_pool_req'),
    path('create', CreatePoolRequest.as_view(), name='create_pool_req'),

]
