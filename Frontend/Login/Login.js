// Show/Hide Password
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", () => {
    const icon = togglePassword.querySelector("i");
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

// Sending data after login button pressed
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const data = new URLSearchParams(new FormData(loginForm));
    const response = await fetch("http://localhost:5000/loginUser",{
        method : "POST",
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : data
    });
    if(response.status == 200){
        const res = await response.json();
        localStorage.setItem('userId',res.userId);
        window.location.href = "../FeedPage/FeedPage.html";
    }else{
        alert("Invalid email or password");
    }
});