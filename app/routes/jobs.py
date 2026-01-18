from flask import Blueprint, request, jsonify
from app import db
from app.models.job import Job
from app.utils.serializers import job_to_dict 

ALLOWED_STATUSES = ["applied", "interview", "offer", "rejected"]

jobs_bp = Blueprint("jobs", __name__, url_prefix="/jobs")


@jobs_bp.route("", methods=["POST"])
def create_job():
    data = request.get_json()

    if not data:
        return jsonify({"error": "JSON body is required"}), 400
    
    company = data.get("company")
    role = data.get("role")

    if not company or not role:
        return jsonify({"error": "company and role are required"}), 400

    job = Job(
        company=company.strip(),
        role=role.strip()
    )

    db.session.add(job)
    db.session.commit()

    return jsonify(job_to_dict(job)), 201 

@jobs_bp.route("", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()

    result = [job_to_dict(job) for job in jobs]
    
    return jsonify(result), 200    

@jobs_bp.route("/<int:id>", methods=["GET"])
def get_job(id):
    job = Job.query.get(id)

    if not job:
        return jsonify({"error": "job not found"}), 404
    
    return jsonify(job_to_dict(job)), 200

@jobs_bp.route("/<int:id>", methods=["PATCH"])
def update_job(id):
    job = Job.query.get(id)

    if not job :
        return jsonify({"error": "job not found"}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON body is required"}), 400
    
    status = data.get("status")

    if not status:
        return jsonify({"error": "status is required"}), 400
    
    if status not in ALLOWED_STATUSES:
        return jsonify({""
        "error": f"status must be one of {ALLOWED_STATUSES}"
        }), 400
    
    job.status = status
    db.session.commit()

    return jsonify(job_to_dict(job)), 200     

@jobs_bp.route("/<int:id>", methods=["DELETE"])
def delete_job(id):
    job = Job.query.get(id)

    if not job:
        return jsonify({"error": "job not found"}), 404

    db.session.delete(job)
    db.session.commit()

    return "", 204