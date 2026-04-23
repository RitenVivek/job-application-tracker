from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    CORS(app)
    db.init_app(app)
    
    from app.routes.jobs import jobs_bp
    app.register_blueprint(jobs_bp)

    with app.app_context():
        db.create_all()

    @app.route("/")
    def home():
        return "Job Tracker API is running"

    @app.route("/health")
    def health():
        return {"status": "OK"}
    
    return app