document.addEventListener("DOMContentLoaded", function () {
    // Signup functionality
    let signupButton = document.getElementById("signupbotton");
    if (signupButton) {
        signupButton.addEventListener("click", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();

            if (!username || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let existingUser = users.find(user => user.email === email);

            if (existingUser) {
                alert("An account with this email already exists.");
            } else {
                users.push({ username, email, password });
                localStorage.setItem("users", JSON.stringify(users));
                alert("Account created successfully! You can now log in.");
                window.location.href = "login.html";
            }
        });
    }

    // Login functionality
    let loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            event.preventDefault();

            let email = document.getElementById("login-email").value.trim();
            let password = document.getElementById("login-password").value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let validUser = users.find(user => user.email === email && user.password === password);

            if (validUser) {
                localStorage.setItem("authToken", email); // Store email as session token
                alert("Login successful! Redirecting to your dashboard...");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }

    // Logout functionality in dashboard
    let logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("authToken");
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }

    // Redirect to login if user is not authenticated
    if (window.location.pathname.includes("dashboard.html")) {
        let authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("You must be logged in to access the dashboard.");
            window.location.href = "index.html";
        } else {
            document.getElementById("userEmail").textContent = authToken; // Display logged-in email
        }
    }
});
