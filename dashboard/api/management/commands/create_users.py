import os
import sys

from django.core.wsgi import get_wsgi_application

sys.path.append('C:\\Users\\Vegard\\bachelor\\it2901-bachelor\\dashboard')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'license_dashboard.settings')
application = get_wsgi_application()

from django.contrib.auth import get_user_model
from api.models import SoftwarePerComputer

CustomUser = get_user_model()

# Get all unique email addresses and their organizations from the SoftwarePerComputer model
email_and_organizations = SoftwarePerComputer.objects.values_list('primary_user_email', 'organization').distinct()

# Loop through each email address and organization
for email, organization in email_and_organizations:
    if email is not None:
        # Check if the user already exists
        user_exists = CustomUser.objects.filter(primary_user_email=email).exists()

        if not user_exists:
            # If not, create a new user account with a default password and set the organization
            user = CustomUser.objects.create_user(primary_user_email=email, password='defaultpassword',
                                                  organization=organization)
            print(f'Created user account for {email} with organization {organization}')
        else:
            # If the user already exists, update the organization field
            user = CustomUser.objects.get(primary_user_email=email)
            if user.organization != organization:
                user.organization = organization
                user.save()
                print(f'Updated organization for {email} to {organization}')
            else:
                print(f'User account for {email} already exists and has the correct organization')
