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
Depending on which of the the urls from [urls.py](dashboard/api/urls.py) is requested on the frontend, the correct view is shown.

#### Template 
Django does not use a controller to manage the model like in many other types of projects.
Instead, a 'template' is used, which is our frontend (see above for a link).

## 2. How the models are made
The project is heavily dependent on the file [data/software_per_computer.csv](data/software_per_computer.csv). 
- The dashboard uses the SoftwarePerComputer model from [api/models.py](api/models.py). 
It is an exact copy of the .csv file, with the same data.
- The license pool is not based on data from another file. 
It shares many of the fields as SoftwarePerComputer, such as `primary_user_full_name`. 
At the moment, it contains random entries from SoftwarePerComputer in order to display mock data, but this will not be the case if used in the real world. 


## 3. Troubleshooting
- If another process is running on port 3000, run `npx kill-port 3000` before repeating step 5 of the installation.


## 4. Other information
### In order to run the Python tests:
1. Locate to /dashboard
2. Run `python manage.py test`

The python tests are located in the file [api/tests.py](api/tests.py).

### In order to run the Typescript tests:
1. Locate to /dashboard/frontend
2. Run `npm test`

The Typescript tests are located throughout the frontend, in the same folder as the corresponding file that is tested.
####


### Python dependencies
See [requirements.txt](requirements.txt), in the root of the project.







