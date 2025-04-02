document.addEventListener("DOMContentLoaded", function () {
    // SIGNUP FUNCTION
    document.getElementById("signupbotton").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default button behavior

        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        let userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("This email is already registered. Please log in.");
            return;
        }

        // Save new user
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html"; // Redirect to login page
    });

    // LOGIN FUNCTION
document.getElementById("loginButton").addEventListener("click", function (event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        localStorage.setItem("authToken", email); // Store session token
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid email or password. Please try again.");
    }
});


    // LOGOUT FUNCTION
    if (document.getElementById("logoutButton")) {
        document.getElementById("logoutButton").addEventListener("click", function () {
            localStorage.removeItem("authToken");
            alert("Logged out successfully!");
            window.location.href = "index.html"; // Redirect to homepage
        });
    }

    // DASHBOARD ACCESS CONTROL
    if (document.body.contains(document.getElementById("logoutButton"))) {
        if (!localStorage.getItem("authToken")) {
            alert("You must be logged in to access the dashboard.");
            window.location.href = "index.html";
        }
    }
});
