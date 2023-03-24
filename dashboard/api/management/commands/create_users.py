import os
import sys
from django.core.wsgi import get_wsgi_application

sys.path.append('C:\\Users\\Vegard\\bachelor\\it2901-bachelor\\dashboard')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'license_dashboard.settings')
application = get_wsgi_application()

from django.contrib.auth import get_user_model
from api.models import SoftwarePerComputer






CustomUser = get_user_model()

# Get all unique email addresses from the CustomUser model
email_addresses = SoftwarePerComputer.objects.values_list('primary_user_email', flat=True).distinct()

# Loop through each email address and create a new user account
for email in email_addresses:
    if email is not None:
        # Check if the user already exists
        if not CustomUser.objects.filter(primary_user_email=email).exists():
            # If not, create a new user account with a default password
            user = CustomUser.objects.create_user(primary_user_email=email, password='defaultpassword')
            print(f'Created user account for {email}')
        else:
            print(f'User account for {email} already exists')