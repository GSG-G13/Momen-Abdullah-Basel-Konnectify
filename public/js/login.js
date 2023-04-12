const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const signinBtn = document.querySelector(".signinBtn");
// console.log("signinBtn clicked just now");
signinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("signinBtn clicked just now");
    fetch('/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
        })
    }).then((data) => {
        console.log("data:   ", data.json());
    })
});