let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function addTicket() {
  let name = document.getElementById("name").value;
  let issue = document.getElementById("issue").value;

  let ticket = {
    name: name,
    issue: issue,
    status: "Open"
  };

  tickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));

  displayTickets();
}

function displayTickets() {
  let list = document.getElementById("ticketList");
  list.innerHTML = "";

  let role = localStorage.getItem("role");

  tickets.forEach((t, index) => {
    list.innerHTML += `
      <div class="ticket">
        <b>${t.name}</b><br>
        ${t.issue}<br>
        Status: ${t.status}<br><br>
        
        ${role === "admin" ? `
          <button onclick="editTicket(${index})">Edit</button>
          <button onclick="deleteTicket(${index})">Delete</button>
          <button onclick="toggleResolved(${index})">
            ${t.status === "Resolved" ? "Reopen" : "Mark Resolved"}
          </button>
        ` : `
          <small>User View (read-only)</small>
        `}
      </div>
    `;
  });
}

function deleteTicket(index) {
  tickets.splice(index, 1);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  displayTickets();
}

function toggleResolved(index) {
  if (tickets[index].status === "Resolved") {
    tickets[index].status = "Open";
  } else {
    tickets[index].status = "Resolved";
  }

  localStorage.setItem("tickets", JSON.stringify(tickets));
  displayTickets();
}

function editTicket(index) {
  let newIssue = prompt("Update issue text:", tickets[index].issue);

  if (newIssue !== null && newIssue.trim() !== "") {
    tickets[index].issue = newIssue;

    localStorage.setItem("tickets", JSON.stringify(tickets));
    displayTickets();
  }
}

//<button onclick="resolveTicket(${index})">Mark Resolved</button>

function filterTickets(status) {

    let list = document.getElementById("ticketList");
    list.innerHTML = "";

    let role = localStorage.getItem("role");

    let filtered = tickets;

    if (status !== "ALL") {
        filtered = tickets.filter(t => t.status === status);
    }

    filtered.forEach((t, index) => {

        list.innerHTML += `
        <div class="ticket">

            <b>${t.name}</b><br>
            ${t.issue}<br>
            Status: ${t.status}<br><br>

            ${
                role === "admin"
                ? `
                    <button onclick="editTicket(${index})">Edit</button>

                    <button onclick="deleteTicket(${index})">Delete</button>

                    <button onclick="toggleResolved(${index})">
                        ${t.status === "Resolved"
                            ? "Reopen"
                            : "Mark Resolved"}
                    </button>
                  `
                : `<small>User View (Read Only)</small>`
            }

        </div>
        `;

    });

}