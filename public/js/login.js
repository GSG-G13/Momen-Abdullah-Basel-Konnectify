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
            username: emailInput.value,
            password: passwordInput.value,
        })
    }).then((response) => {
        if (response.ok) {
            // the user signed in successfully.
            window.location.replace("/home");
        } else {
            console.log(response);
        }
    })
});