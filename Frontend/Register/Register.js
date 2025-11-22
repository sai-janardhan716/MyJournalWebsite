// Show/Hide Password
const passwordInput = document.getElementById("passwordInput");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");
const togglePassword1 = document.getElementById("togglePassword1");
const togglePassword2 = document.getElementById("togglePassword2");
togglePassword1.addEventListener("click", () => {
    const icon = togglePassword1.querySelector("i");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("bi-eye-slash-fill");
        icon.classList.add("bi-eye-fill");
    } else {
        passwordInput.type = "password";
        icon.classList.add("bi-eye-slash-fill");
        icon.classList.remove("bi-eye-fill");
    }
});
togglePassword2.addEventListener("click", () => {
    const icon = togglePassword2.querySelector("i");
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        icon.classList.remove("bi-eye-slash-fill");
        icon.classList.add("bi-eye-fill");
    } else {
        confirmPasswordInput.type = "password";
        icon.classList.add("bi-eye-slash-fill");
        icon.classList.remove("bi-eye-fill");
    }
});
const registerForm = document.getElementById('registerForm');
const pwd1 = document.getElementById('passwordInput');
const pwd2 = document.getElementById('confirmPasswordInput');
const email = document.getElementById('emailInput');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (pwd1.value != pwd2.value) {
        alert("Both passwords should be same");
        return;
    }
    const formData = new URLSearchParams(new FormData(registerForm));
    const response = await fetch("http://localhost:5000/registerUser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    });
    const text = await response.text();
    alert(text);
    if (response.status === 200) {
        window.location.href = "../Login/Login.html";
    };
})