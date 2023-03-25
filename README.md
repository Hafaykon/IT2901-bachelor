# IT2901-bachelor project - Group  TRDK3
## Information
This bachelor project is made as part of the subject IT2901 - 
Informatikk Prosjektarbeid II at the Norwegian University of Science and Technology.


The group members are:
- Alvaro W.
- Emma Blix
- Håkon Hargott Wullum
- Ida Waage Høyland
- Sarmi Ponnuthurai
- Solveig Myren
- Vegard Henriksen

## Documentation
This README provides general information about the project, and a guide on how to install and run it. 
Most of the documentation is organised as comments in the files.

### File structure
The project has the following (simplified) file structure:


. /root \
├── /dashboard\
│   ├── /api\
│   ├── /frontend \
│   ├── /license_dashboard \
│   ├── db.sqlite3\
│   └── manage.py\
├── README.md\
├── requirements.txt



## Installation
Installation assumes Python 3.9 or later is installed. From the root of the project:
1. Run `pip install -r requirements.txt` to make sure all required Python libraries are installed.
2. Run `cd dashboard`
3. Run `python manage.py runserver`
4. Run `cd frontend`
5. Run `npm install`, then `npm start`. The project will be accessible on the url `http://localhost:3000/`
   1. Note: if another process is running on port 3000, run `npx kill-port 3000`, then try step 5 again.

### Python dependencies
See requirements.txt in the root of the project.


## License
The project is created under a GPL3 license.





