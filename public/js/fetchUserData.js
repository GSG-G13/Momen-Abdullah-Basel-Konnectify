const userName = window.location.href.split("http://localhost:3000/user/")[1];
const bgImg = document.querySelector(".profile-info .bg-img");
const userImg = document.querySelector(".profile-info .user-img");
const userNameElement = document.querySelector(".profile-info .user-name");
const userBio = document.querySelector(".profile-info .user-bio");
const skillsContainer = document.querySelector(".profile-info .user-skills");

fetch(`/${userName}/data`)
  .then((response) => response.json())
  .then((data) => renderUserData(data[0]))
  .catch((err) => console.log(err));

const renderUserData = (data) => {
  bgImg.src = data.bg_img_url;
  userImg.src = data.img_url;
  userNameElement.textContent = data.name;
  userBio.textContent = data.bio_content;

  data.skills.split(",").forEach((skill) => {
    const div = document.createElement("div");
    div.classList.add("skill", skill);

    const skillName = document.createTextNode(skill);

    const iconClass = {
      html: "fa-brands fa-html5",
      css: "fa-brands fa-css3-alt",
      js: "fa-brands fa-js",
      react: "fa-brands fa-react",
      github: "fa-brands fa-github",
      sql: "fa-solid fa-database",
      php: "fa-brands fa-php",
      nodejs: "fa-brands fa-node",
    }[skill];
    const icon = document.createElement("i");
    icon.className = iconClass;

    div.appendChild(skillName);
    div.appendChild(icon);
    skillsContainer.append(div);
  });
};