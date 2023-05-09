# Technical information about the project

[Back to main README.md](../README.md)

## 1. Stack used

For the backend, we used for the backend a combination of Django and Django Rest Framework (DRF) and SQLite for the
database system.
For the frontend, we have used React and Typescript.

- The database file is located in [dashboard/db.sqlite3](/dashboard/db.sqlite3)
- The backend files are located in [dashboard/api](/dashboard/api)
- The frontend files are located in [dashboard/frontend/](/dashboard/frontend/)

### MVT

The project is based on the Model-Controller-Template (MVT) model.

#### Model

The models are located in [dashboard/api/models.py](dashboard/api/models.py).
They are the actual tables in the database.

#### View

The view is located in [dashboard/api/views.py](dashboard/api/views.py).
This file is how the data is accessed by the frontend.
Depending on which of the the urls from [urls.py](dashboard/api/urls.py) is requested on the frontend, the correct view
is shown.

#### Template

Django does not use a controller to manage the model like in many other types of projects.
Instead, a 'template' is used, which is our frontend (see above for a link).

#### Detailed repository (as viewed from /[dashboard](dashboard))

Please note that the files and folders mentioned here are what the team sees as the ones that could use some explanation
of what they are.
It is not meant as a list of all files.

[api/](dashboard/api): Where main the Python files lie. urls, models etc.

- [/management](dashboard/api/management): Useful Python files during the development of the product. Should not be of
  interest to most users.
- [/urls](dashboard/api/urls): The Django urls.
- [/views](dashboard/api/views): The Django views.
- [tests.py](dashboard/api/tests.py): All tests used for frontend.

[frontend/](dashboard/frontend): Where the frontend files are located.

- [/cypress](dashboard/frontend/cypress): The Cypress test folder. The tests are in the folder called "e2e".
- [/src](dashboard/frontend/src): Contains the most important files for frontend.
    - [/components](dashboard/frontend/src/components): All the components used in the React pages, sorted in folders
      for the respective page.
    - [/pages](dashboard/frontend/src/pages): The page files.

[license_dashboard/](dashboard/license_dashboard): Django settings.

[db.sqlite3](dashboard/db.sqlite3): The SQLite database file.

[manage.py](dashboard/manage.py): The manage.py file used to start the server etc.

[TECHNICAL_README.md](dashboard/TECHNICAL_README.md): The technical README for the project.

## 2. Troubleshooting

- If another process is running on port 3000, run `npx kill-port 3000` before repeating step 5 of the installation.
- If you get the error message `django.db.utils.OperationalError: table api_licensepool" already exists` when trying to
  migrate tables, run ` python manage.py migrate --fake`.

## 3. Other information - how to run tests

### Backend tests:

1. Locate to RERERR/dashboard
2. Run `python manage.py test api`

The python tests are located in the file [api/tests.py](api/tests.py).

### Frontend tests:

1. Locate to /dashboard/frontend
2. Run `npm test`

The Typescript tests are located throughout the frontend, in the same folder as the corresponding file that is tested.

### Cypress tests:
The Cypress tests are located inside [dashboard/frontend/cypress](frontend/cypress).
Since running them requires installation of Cypress, a tutorial will not be provided here.
When Cypress is installed, run:

1. `npx cypress open`.
2. Choose to configure "E2E" testing.
3. Run the tests.