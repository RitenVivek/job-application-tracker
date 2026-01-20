# Job Application Tracker (Backend API)
A simple Flask REST API to track job applications with full CRUD functionality.
Built as a learning + portfolio project following industry-style backend practices.

 Features
	•	Create a job application
	•	Get all job applications
	•	Get a single job by ID
	•	Update job application status
	•	Delete a job application
	•	Input validation & proper HTTP status codes

 Tech Stack
	•	Python
	•	Flask
	•	Flask-SQLAlchemy
	•	SQLite
	•	REST API

 Project Structure
    job-application-tracker/
    │
    ├── app/
    │   ├── models/
    │   │   └── job.py
    │   ├── routes/
    │   │   └── jobs.py
    │   ├── utils/
    │   │   └── serializers.py
    │   └── __init__.py
    │
    ├── app.db
    ├── config.py
    ├── run.py
    ├── requirements.txt
    ├── README.md
    └── .gitignore

 Setup Instructions
1   Clone the repository
        git clone <your-repo-url>
        cd job-application-tracker
2   Create virtual enviroment
        python -m venv venv
3   Activate virtual enviroment [Windows(PowerShell)]
        venv\Scripts\Activate.ps1    
4   Install dependencies                    
        pip insatll -r requiremnts.txt
5   Run the server
        python run.py
    Server runs at:
    http://127.0.0.1:5000

 API Endpoints
    POST/jobs
    json
    {
        "company":"Google",
        "role":"Software Engineer"
    }    
    Response
    json
    {
        "id":"1,
        "company":"Google",
        "role":"Software Enginner",
        "status":"applied:
    }

 Get All Jobs
    GET/jobs

 Get Single Job
    GET/jobs/{id}

 Update Job Status
    PATCH/JOBS/{ID}
    json
    {
        "status":"interview"
    }          
    Allowed Statuses:
    applied, interview, offer, rejected

 Delete Job
    DELETE/jobs/{id}

 Testing
 APIs tested using PowerShell Involve-RestMethod.
    Example:
    Invoke-RestMethod`
    -Uri http://127.0.0.1:5000/jobs`
    -Method POST
    -Headers @{"Content-Type"="application/json"}`
    -Body '{"company":"Google","role":"Softwer Engineer"}`

 Learning Outcomes
	•	REST API design
	•	Flask Blueprints
	•	SQLAlchemy ORM
	•	Input validation
	•	HTTP status codes
	•	Clean project structure
	•	Git best practices



 Author

 Riten Vivek
 Backend Developer (Python / Flask)
       

                