# Technical information about the project

[Back to main README.md](../README.md)

## 1. Stack used

The technology stack used is Django-React, and the database used is SQLite.

- The database file is located in [dashboard/db.sqlite3](dashboard/db.sqlite3)
- The python files are located in [dashboard/api](dashboard/api)
- The Typescript files are located in [dashboard/frontend/src](dashboard/frontend/src)

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


## 2. Troubleshooting

- If another process is running on port 3000, run `npx kill-port 3000` before repeating step 5 of the installation.
- If you get the error message `django.db.utils.OperationalError: table api_licensepool" already exists` when trying to
  migrate tables, run ` python manage.py migrate --fake`.

## 3. Other information - how to run tests


### Python tests:

1. Locate to RERERR/dashboard
2. Run `python manage.py test`

The python tests are located in the file [api/tests.py](api/tests.py).

### Typescript tests:

1. Locate to /dashboard/frontend
2. Run `npm test`

The Typescript tests are located throughout the frontend, in the same folder as the corresponding file that is tested.

### Cypress tests:
The Cypress tests are located inside the FRONTEND folder. 
Since running them requires installation of Cypress, a tutorial will not be provided here.
When Cypress is installed, Run 
1. `npx cypress open`.
2. Choose to configure "E2E" testing.
3. Run the tests.






