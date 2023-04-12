const signUpButton = document.getElementById("signup-button");

signUpButton.addEventListener("click", (event) => {
    event.preventDefault();

<<<<<<< HEAD
    const person_name = document.getElementById("person_name").value;

    const username = document.getElementById("username").value;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const profile_image = document.getElementById("profile_image").value;
    const bg_img_url = document.getElementById("bg_img_url").value;
    const bio = document.getElementById("bio").value;
    const skills = document.getElementById("skills").value;
=======
  const person_name = document.getElementById("person_name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const profile_image = document.getElementById("profile_image").files[0];
  const bg_img_url = document.getElementById("bg_img_url").files[0];
  const bio = document.getElementById("bio").value;
  const skills = document.getElementById("skills").value;
>>>>>>> main

    let isValid = true;

    // Validation
    const nameError = document.getElementById("person_name_error");
    if (person_name.trim() === "") {
        nameError.innerHTML = "Please enter your name";
        isValid = false;
    } else {
        nameError.innerHTML = "";
    }

    const usernameError = document.getElementById("username_error");
    if (username.trim() === "") {
        usernameError.innerHTML = "Please enter a username";
        isValid = false;
    } else {
        usernameError.innerHTML = "";
    }

<<<<<<< HEAD
    const emailError = document.getElementById("email_error");
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        emailError.innerHTML = "Please enter a valid email address";
        isValid = false;
    } else {
        emailError.innerHTML = "";
    }
=======
  const emailError = document.getElementById("email_error");
  
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    emailError.innerHTML = "Please enter a valid email address";
    isValid = false;
  } else {
    emailError.innerHTML = "";
  }
  
>>>>>>> main

    const passwordError = document.getElementById("password_error");
    if (password.trim() === "") {
        passwordError.innerHTML = "Please enter a password";
        isValid = false;
    } else {
        passwordError.innerHTML = "";
    }

<<<<<<< HEAD
    const profileImageError = document.getElementById("profile_image_error");
    if (profile_image.trim() === "") {
        profileImageError.innerHTML = "Please enter a profile image URL";
        isValid = false;
    } else {
        profileImageError.innerHTML = "";
    }

    const bgImgError = document.getElementById("bg_img_url_error");
    if (bg_img_url.trim() === "") {
        bgImgError.innerHTML = "Please enter a background image URL";
        isValid = false;
    } else {
        bgImgError.innerHTML = "";
    }
=======
  const profileImageError = document.getElementById("profile_image_error");
  if (!profile_image) {
    profileImageError.innerHTML = "Please select a profile image";
    isValid = false;
  } else {
    profileImageError.innerHTML = "";
  }

  const bgImgError = document.getElementById("bg_img_url_error");
  if (!bg_img_url) {
    bgImgError.innerHTML = "Please select a background image";
    isValid = false;
  } else {
    bgImgError.innerHTML = "";
  }
>>>>>>> main

    const skillsError = document.getElementById("skills_error");
    if (skills.trim() === "") {
        skillsError.innerHTML = "Please enter your skills";
        isValid = false;
    } else {
        skillsError.innerHTML = "";
    }

<<<<<<< HEAD
    // Submit data if all inputs are valid
    if (isValid) {
        const data = {
            person_name,
            username,
            email,
            password,
            profile_image,
            bg_img_url,
            bio,
            skills,
        };

        fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if (response.ok) {
                    window.location.replace("/login");
                    console.log("User signed up successfully");
                    // Do something here after the user signs up successfully
                } else {
                    console.error("Failed to sign up user");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
});
=======
  // Submit data if all inputs are valid
  if (isValid) {
    const data = new FormData();
    data.append("person_name", person_name);
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("profile_image", profile_image);
    data.append("bg_img_url", bg_img_url);
    data.append("bio", bio);
    data.append("skills", skills);

    fetch("/signup", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          window.location.replace("/login");
          console.log("User signed up successfully");
          // Do something here after the user signs up successfully
        } else {
          console.error("Failed to sign up user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
>>>>>>> main
