from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)
    from app.routes.jobs import jobs_bp
    app.register_blueprint(jobs_bp)

    @app.route("/health")
    def health():
        return {"status": "OK"}
    
    return app