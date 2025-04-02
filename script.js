document.addEventListener("DOMContentLoaded", function () {
    // Load existing users or initialize empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Signup functionality
    let signupButton = document.getElementById("signupbotton");
    if (signupButton) {
        signupButton.addEventListener("click", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("email").value.trim().toLowerCase();
            let password = document.getElementById("password").value.trim();

            if (!username || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            // Check if email already exists
            let existingUser = users.some(user => user.email === email);
            if (existingUser) {
                alert("An account with this email already exists. Try logging in.");
                return;
            }

            // Store user
            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Account created successfully! You can now log in.");
            window.location.href = "login.html";
        });
    }

    // Login functionality
    let loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            event.preventDefault();

            let email = document.getElementById("login-email").value.trim().toLowerCase();
            let password = document.getElementById("login-password").value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            let validUser = users.find(user => user.email === email && user.password === password);
            if (validUser) {
                sessionStorage.setItem("authToken", email);
                alert("Login successful! Redirecting to your dashboard...");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }

    // Dashboard authentication check
    if (window.location.pathname.includes("dashboard.html")) {
        let authToken = sessionStorage.getItem("authToken");
        if (!authToken) {
            alert("You must be logged in to access the dashboard.");
            window.location.href = "index.html";
        } else {
            document.getElementById("userEmail").textContent = authToken;
        }
    }

    // Logout functionality
    let logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.removeItem("authToken");
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }
});
