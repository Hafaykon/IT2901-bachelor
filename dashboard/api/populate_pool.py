import requests

url = 'http://127.0.0.1:8000/api/insert'
myobj = {'primary_user_full_name': 'test', 'primary_user_email': 'a@gmail.com', 'organization': 'Administrasjonen',
         'application_name': 'Spotify', 'family': '', 'family_version': '', 'family_edition': '',
         'computer_name': 'TD1243'}

x = requests.post(url, json=myobj)
