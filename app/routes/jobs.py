from flask import Blueprint, request, jsonify
from app import db
from app.models.job import Job

jobs_bp = Blueprint("jobs", __name__, url_prefix="/jobs")


@jobs_bp.route("", methods=["POST"])
def create_job():
    data = request.get_json()

    job = Job(
        company=data["company"],
        role=data["role"]
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({
        "id": job.id,
        "company": job.company,
        "role": job.role,
        "status": job.status
    }), 201