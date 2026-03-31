console.log("Script loaded successfully");
window.createJob = createJob;
const API_URL = "http://127.0.0.1:5000/jobs";

// Load jobs on page load
window.onload = fetchJobs;

function fetchJobs() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("jobsTable");
            table.innerHTML = "";

            data.forEach(job => {
                table.innerHTML += `
                    <tr>
                        <td>${job.id}</td>
                        <td>${job.company}</td>
                        <td>${job.role}</td>
                        <td>
                          <select onchange="updateStatus(${job.id}, this.value)">
                            <option value="applied" ${job.status === "applied" ? "selected" : ""}>Applied</option>
                            <option value="interview" ${job.status === "interview" ? "selected" : ""}>Interview</option>
                            <option value="offer" ${job.status === "offer" ? "selected" : ""}>Offer</option>
                            <option value="rejected" ${job.status ==="rejected" ? "selected" : ""}>Rejected</option>
                          </select>
                        </td>
                        <td>
                          <button onclick="deleteJob(${job.id})">Delete</button>
                        </td>    
                    </tr>
                `;
            });
        });
}

function createJob() {
    const company = document.getElementById("company").value;
    const role = document.getElementById("role").value;

    if (!company || !role) {
        alert("Company and Role are required");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ company, role })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("company").value = "";
        document.getElementById("role").value = "";
        fetchJobs(); 
    });
}
window.createJob = createJob;

function deleteJob(id) {
    fetch(`${API_URL}/${ID}`, {
        method: "DELETE"
    })
    .then(() => fetchJobs());
}

function updateStatus(id, status) {
    fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })
    .then(() => fetchJobs());
}