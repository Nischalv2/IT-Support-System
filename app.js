let tickets = JSON.parse(localStorage.getItem("tickets")) || [];



function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    alert("Invalid login");
  }
}
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

  tickets.forEach((t, index) => {
    list.innerHTML += `
      <div class="ticket">
        <b>${t.name}</b><br>
        ${t.issue}<br>
        Status: ${t.status}<br><br>

        <button onclick="deleteTicket(${index})">Delete</button>
        <button onclick="editTicket(${index})">Edit</button>
      </div>
    `;
  });
}

function deleteTicket(index) {
  tickets.splice(index, 1);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  displayTickets();
}

function resolveTicket(index) {
  tickets[index].status = "Resolved";
  localStorage.setItem("tickets", JSON.stringify(tickets));
  displayTickets();
}

//<button onclick="resolveTicket(${index})">Mark Resolved</button>

function filterTickets(status) {
  let list = document.getElementById("ticketList");
  list.innerHTML = "";

  let filtered = tickets;

  if (status !== "ALL") {
    filtered = tickets.filter(t => t.status === status);
  }

  filtered.forEach((t, index) => {
    list.innerHTML += `
      <div class="ticket">
        <b>${t.name}</b><br>
        ${t.issue}<br>
        Status: ${t.status}<br>
      </div>
    `;
  });
}

function editTicket(index) {
  let newIssue = prompt("Update issue text:", tickets[index].issue);

  if (newIssue !== null && newIssue.trim() !== "") {
    tickets[index].issue = newIssue;

    localStorage.setItem("tickets", JSON.stringify(tickets));
    displayTickets();
  }
}