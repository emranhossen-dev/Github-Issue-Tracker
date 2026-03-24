const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginBtn.addEventListener("click", function() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password! Please use the demo credentials.");
    }
});