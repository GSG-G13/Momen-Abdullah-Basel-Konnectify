const postsContainer = document.querySelector(".posts .container");
fetch(`/posts`)
  .then((response) => response.json())
  .then((data) => showPosts(data))
  .catch((err) => console.log(err));

const showPosts = (allPosts) => {
  allPosts.forEach((post) => {
    addASinglePost(post);
  });
};

const addASinglePost = (post) => {
  const postDate = new Date(post.date);
  const currentDate = new Date();
  const timeDiff = currentDate - postDate;

  //
  const timeDiffSeconds = Math.floor(timeDiff / 1000);
  let finalDate;
  if (timeDiffSeconds < 60) {
    finalDate = `${timeDiffSeconds} seconds ago`;
  } else if (timeDiffSeconds < 3600) {
    const minutes = Math.floor(timeDiffSeconds / 60);
    finalDate = `${minutes} m`;
  } else if (timeDiffSeconds < 86400) {
    const hours = Math.floor(timeDiffSeconds / 3600);
    finalDate = `${hours} h`;
  } else {
    const days = Math.floor(timeDiffSeconds / 86400);
    finalDate = `${days} d`;
  }

  //

  const postContainer = document.createElement("div");
  postContainer.classList.add("post", "content-box");

  const info = document.createElement("div");
  info.classList.add("info");

  const userImgA = document.createElement("a");
  userImgA.href = `/user/${post.name}`;

  const userImg = document.createElement("img");
  userImg.classList.add("small-img");
  userImg.src = post.user_img_url;
  userImg.alt = "user-pitcher";

  const infoText = document.createElement("div");
  infoText.classList.add("info-text");

  const userName = document.createElement("p");
  const userNameText = document.createTextNode(post.name);
  userName.appendChild(userNameText);

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("post-time");
  const timeSpanText = document.createTextNode(finalDate);
  timeSpan.appendChild(timeSpanText);

  const worldIcon = document.createElement("i");
  worldIcon.classList.add("fa-solid", "fa-earth-americas");

  const postText = document.createElement("div");
  const postTextContent = document.createTextNode(post.content);
  postText.classList.add("post-text");
  postText.appendChild(postTextContent);

  timeSpan.appendChild(worldIcon);
  infoText.appendChild(userName);
  infoText.appendChild(timeSpan);
  userImgA.appendChild(userImg);
  info.appendChild(userImgA);
  info.appendChild(infoText);
  postContainer.appendChild(info);
  postContainer.appendChild(postText);
  if (post.img_url) {
    const postImg = document.createElement("img");
    postImg.classList.add("post-img");
    postImg.src = post.img_url;
    postImg.alt = "post-img";
    postContainer.appendChild(postImg);
  }

  postsContainer.appendChild(postContainer);
};
