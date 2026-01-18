def job_to_dict(job):
    return {
        "id": job.id,
        "company": job.company,
        "role": job.role,
        "status": job.status
    }