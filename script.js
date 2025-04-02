document.getElementById("signupbotton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevents default form action

    // Get user details from input fields
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username && email && password) {
        localStorage.setItem("authToken", "userLoggedIn"); // Store session token
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Please fill all fields.");
    }
});

// Login button redirection (if you have a login page)
document.getElementById("loginbutton").addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email && password) {
        localStorage.setItem("authToken", "userLoggedIn");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid credentials");
    }
});
