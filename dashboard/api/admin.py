from django.contrib import admin
from .models import SoftwarePerComputer, LicensePool, PoolRequest

# Register your models here.
admin.site.register(SoftwarePerComputer)
admin.site.register(LicensePool)
admin.site.register(PoolRequest)


