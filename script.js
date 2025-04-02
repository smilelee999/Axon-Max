document.addEventListener("DOMContentLoaded", function () {
   // SIGN UP FUNCTION (in script.js)
document.getElementById("signupbotton").addEventListener("click", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Check if user already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("An account with this email already exists.");
    } else {
        // Add the new user to the local storage
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html"; // Redirect to login page after sign-up
    }
});


   // LOGIN FUNCTION
document.getElementById("loginButton").addEventListener("click", function (event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    // Retrieve users data from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with matching email and password
    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        // Store the session token to indicate user is logged in
        localStorage.setItem("authToken", email); 
        alert("Login successful! Redirecting to your dashboard...");
        
        // Redirect to dashboard
        window.location.href = "dashboard.html"; 
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
