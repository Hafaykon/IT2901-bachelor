from django.db import models


# Create your models here.
class SoftwarePerComputer(models.Model):
    """
    Model for the csv file software_per_computer.csv
    """
    objects = models.Manager()  # default manager
    computer_name = models.CharField(max_length=100)
    application_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    family = models.CharField(max_length=100)
    family_version = models.CharField(max_length=100)
    family_edition = models.CharField(max_length=100)
    license_required = models.BooleanField()
    manufacturer = models.CharField(max_length=100)
    organization = models.CharField(max_length=100)
    organization_path = models.CharField(max_length=200)
    date_added = models.DateField()
    last_used = models.DateField()
    run_times = models.IntegerField()
    total_minutes = models.IntegerField()
    active_minutes = models.IntegerField()
    average_usage_per_run = models.FloatField()
    active_usage_per_run = models.FloatField()
    remote_total_minutes = models.IntegerField()
    remote_active_minutes = models.IntegerField()
    device_total_minutes = models.IntegerField()
    device_active_minutes = models.IntegerField()
    server = models.BooleanField()
    cloud = models.BooleanField()
    virtual = models.BooleanField()
    portable = models.BooleanField()
    terminal_server = models.BooleanField()
    test_development = models.BooleanField()
    manual_client = models.BooleanField()
    manual_application = models.BooleanField()
    operating_system = models.CharField(max_length=100)
    total_cpus = models.IntegerField()
    total_cores = models.IntegerField()
    last_scanned = models.DateField()
    status = models.CharField(max_length=100)
    gdpr_risk = models.BooleanField()
    manufacturer_gdpr_compliant = models.BooleanField()
    manufacturer_ps_sh_compliant = models.BooleanField()
    manufacturer_dpd_compliant = models.BooleanField()
    suite = models.BooleanField()
    part_of_suite = models.BooleanField()
    suite_names = models.CharField(max_length=100)
    license_suite = models.BooleanField()
    part_of_license_suite = models.BooleanField()
    license_suite_names = models.CharField(max_length=100, null=True, blank=True)
    block_listed = models.BooleanField()
    primary_user = models.CharField(max_length=100)
    primary_user_full_name = models.CharField(max_length=100)
    primary_user_email = models.EmailField()


class LicensePool(models.Model):
    objects = models.Manager()  # default manager
    primary_user_full_name = models.CharField(max_length=100)
    primary_user_email = models.EmailField()
    organization = models.CharField(max_length=100)
    application_name = models.CharField(max_length=100)
    family = models.CharField(max_length=100, null=True, blank=True)
    family_version = models.CharField(max_length=100, null=True, blank=True)
    family_edition = models.CharField(max_length=100, null=True, blank=True)
    computer_name = models.CharField(max_length=100)
    # pris?


class PoolRequest(models.Model):
    objects = models.Manager()  # default manager
    primary_user_full_name = models.CharField(max_length=100)
    primary_user_email = models.EmailField()
    computer_name = models.CharField(max_length=100)
    contact_organization = models.CharField(max_length=100)
    application_name = models.CharField(max_length=100)
    family = models.CharField(max_length=100, null=True, blank=True)
    family_version = models.CharField(max_length=100, null=True, blank=True)
    family_edition = models.CharField(max_length=100, null=True, blank=True)
    request = models.CharField(max_length=100)
    completed = models.BooleanField()
