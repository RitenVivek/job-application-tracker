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
                    <tr class="fade-in">
                        <td>${job.id}</td>
                        <td>${job.company}</td>
                        <td>${job.role}</td>
                        <td>
                          <span class="status ${job.status}">
                            ${job.status}
                          </span>
                          <br/>  
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
            filterJobs()
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
        showToast("Job added ");
    });
}
window.createJob = createJob;

function deleteJob(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => {
      fetchJobs();
    showToast("Job delete");
    });
}   

function updateStatus(id, status) {
    fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })
    .then(() => {
      fetchJobs();
    showToast("status update");
    });
  }

function filterJobs() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;

  const rows = document.querySelectorAll("#jobsTable tr");

  rows.forEach(row => {
    const company = row.children[1].innerText.toLowerCase();
    const role = row.children[2].innerText.toLowerCase();
    const jobStatus = row.querySelector(".status").innerText.toLowerCase();

    const matchSearch =
      company.includes(search) || role.includes(search);

    const matchStatus =
      status === "" || jobStatus === status;

    if (matchSearch && matchStatus) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function renderJobs(jobs) {
  const table = document.getElementById("jobsTable");
  table.innerHTML = "";

  jobs.forEach(job => {
    table.innerHTML += `
      <tr class="fade-in">
        <td>${job.id}</td>
        <td>${job.company}</td>
        <td>${job.role}</td>

        <td>
          <span class="status ${job.status}">
            ${job.status}
          </span>
          <br/>
          <select onchange="updateStatus(${job.id}, this.value)">
            <option value="applied" ${job.status==="applied"?"selected":""}>Applied</option>
            <option value="interview" ${job.status==="interview"?"selected":""}>Interview</option>
            <option value="offer" ${job.status==="offer"?"selected":""}>Offer</option>
            <option value="rejected" ${job.status==="rejected"?"selected":""}>Rejected</option>
          </select>
        </td>

        <td>
          <button onclick="deleteJob(${job.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}