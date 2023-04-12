postAddBtn.addEventListener("click", () => {
  if (postTextInput) {
    const body = {
      post_text: postTextInput.value,
      post_img: postImgUrlInput.value,
    };
    fetch("/add/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resopnse) => resopnse.json())
      .then((data) => {
        console.log("good");
        console.log(data);
        // addASinglePost(data[0])
      })
      .catch((err) => console.log(err));
  }
  hidePopUp();
});
