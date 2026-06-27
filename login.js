
function login() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("role", "admin");

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "block";

        displayTickets();

    } else if (user !== "" && pass !== "") {
        localStorage.setItem("role", "user");

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "block";

        displayTickets();

    } else {
        alert("Please enter a username and password.");
    }
}

function logout() {

    document.getElementById("app").style.display = "none";
    document.getElementById("loginBox").style.display = "block";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

}
