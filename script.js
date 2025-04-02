// Signup Functionality
document.addEventListener("DOMContentLoaded", function () {
    let signupButton = document.getElementById("signupbotton");
    if (signupButton) {
        signupButton.addEventListener("click", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            if (username && email && password) {
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userPassword", password);
                localStorage.setItem("userName", username);
                alert("Account created successfully! Please log in.");
                window.location.href = "login.html";
            } else {
                alert("Please fill in all fields.");
            }
        });
    }

    // Login Functionality
    let loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            event.preventDefault();

            let loginEmail = document.getElementById("login-email").value;
            let loginPassword = document.getElementById("login-password").value;

            let storedEmail = localStorage.getItem("userEmail");
            let storedPassword = localStorage.getItem("userPassword");

            if (loginEmail === storedEmail && loginPassword === storedPassword) {
                localStorage.setItem("authToken", "authenticated");
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }

    // Logout Functionality (for dashboard)
    let logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("authToken");
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    }

    // Dashboard Access Control
    if (window.location.pathname.includes("dashboard.html")) {
        if (!localStorage.getItem("authToken")) {
            alert("You are not logged in. Redirecting to login page.");
            window.location.href = "index.html";
        }
    }
});
