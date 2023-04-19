/* eslint-disable no-unused-vars */
const gameKey = "lA4aY26h8QYvNopssI0V";
const postBtn = document.querySelector(".post-btn");
const popUpContainer = document.querySelector(".popup-container");
const form = document.querySelector("form");
const commentContainer = document.createElement("ul");
commentContainer.classList.add("popup-comments");
const commentBtn = document.querySelectorAll(".coment-Btn");

const getSeverData = async (link) => {
  try {
    const response = await fetch(link, {
      method: "GET",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return error;
  }
};

// Load comments from API
export const loadComments = async (id) => {
  commentContainer.innerHTML = "";
  const movieComments = await getSeverData(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${gameKey}/comments?item_id=${id}`
  );
  if (movieComments.length > 0) {
    movieComments.forEach((element) => {
      commentContainer.innerHTML += `
    <li class="popup-comment">
    <span>${element.username}: </span> ${element.comment} <br> <span class="comment-date">${element.creation_date}</span>
    </li>`;
    });
  }
  return commentContainer;
};

// Deploy pop up
export const deployPopUp = async (id) => {
  const comments = await loadComments(id);
  const popupCommentsContainer = document.createElement("div");
  popupCommentsContainer.classList.add("popup-comments-container");
  popupCommentsContainer.innerHTML = `
    <h3>Comments</h3>
  `;
  popupCommentsContainer.appendChild(comments);
  popUpContainer.innerHTML = `
    <div class="popup">
    <i class="fa fa-times close-popup" aria-hidden="true"></i>
      <div class="popup-image">
        <img src="../images/haaland.png" alt="#">
      </div>
      <div class="popup-details">
        <div class="popup-about-container">
          <h3>Stats this year</h3>
          <ul class="popup-about">
            <li><span class="popup-about-title">Ratings</span> <span class="popup-about-value">8/10</span></li>
            <li> <span class="popup-about-title">Goals</span> <span class="popup-about-value">37</span></li>
            <li> <span class="popup-about-title">Assists</span><span class="popup-about-value">20</span></li>
          </ul>
        </div>
        <div class="comments-wrapper">
          ${popupCommentsContainer.outerHTML}
          <div class="add-comment-container">
            <h3>Add comment</h3>
            <form action="" class="comment-form">
              <input type="text" maxlength="100" required placeholder="Your name...">
              <textarea name="comment" id="" rows="2" placeholder="Add a comment..." required></textarea>
              <button class="comment-btn">Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Add data to API
const postComment = async (comment) => {
  try {
    const response = await fetch(topSpot, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const apiResponse = await response.json();
    feedbackMessage.textContent = apiResponse.result;
    setTimeout(() => {
      feedbackMessage.textContent = "";
    }, 2000);
  } catch (error) {
    return error;
  }
  return null;
};

// Event listeners
commentBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    alert(index + 1);
    document.body.classList.toggle("no-scroll");
    popUpContainer.classList.toggle("hidden");
    deployPopUp(index + 1);
  });
});

popUpContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-popup")) {
    document.body.classList.toggle("no-scroll");
    popUpContainer.classList.toggle("hidden");
  } else if(event.target.classList.contains('comment-btn')) {
    e.preventDefault();
  const userName = form.elements.user.value;
  const userComment = form.elements.comment.value;
  alert(`${userName} and ${userComment}`);
  postComment({ item_id: item1, username: userName, comment: userComment });
  form.elements.user.value = "";
  form.elements.comment.value = "";
  }
});
