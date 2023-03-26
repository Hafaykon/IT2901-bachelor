# Technical information about the project

### 1. Stack used
The technology stack used is Django-React, and the database used is SQLite. 
- The database file is located in [dashboard/db.sqlite3](dashboard/db.sqlite3)
- The python files are located in [dashboard/api](dashboard/api)
- The Typescript files are located in [dashboard/frontend/src](dashboard/frontend/src)

### 2. How the models are made
The project is heavily dependent on the file [data/software_per_computer.csv](data/software_per_computer.csv). 
- The dashboard uses the SoftwarePerComputer model from [api/models.py](api/models.py). 
It is an exact copy of the .csv file, with the same data.
- The license pool is not based on data from another file. 
It shares many of the fields as SoftwarePerComputer, such as `primary_user_full_name`. 
At the moment, it contains random entries from SoftwarePerComputer in order to display mock data, but this will not be the case if used in the real world. 


### 3. Troubleshooting
- If another process is running on port 3000, run `npx kill-port 3000`.


### 4. Other information
#### In order to run the Python tests (located in [api/tests.py](api/tests.py)):
1. Locate to /dashboard
2. Run `python manage.py test`

#### In order to run the Typescript tests:
1. Locate to /dashboard/frontend
2. Run `npm test`

#### 


#### Python dependencies
See [requirements.txt](requirements.txt) in the root of the project.







