const userImage = document.querySelector(".add-post img");
const userName = document.querySelector(".add-post h2 .name");
const profileLink = document.querySelector("header .profile");

fetch("/get-loged-user")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    userName.textContent = data.name;
    userImage.src = `../uploads/${data.img_url}`;
    profileLink.href = `/user/${data.name}`;
  });
