/* eslint-disable no-unused-vars */
const gameKey = 'lA4aY26h8QYvNopssI0V';
const popUpContainer = document.querySelector('.popup-container');
const form = document.querySelector('form');
const commentContainer = document.createElement('ul');
commentContainer.classList.add('popup-comments');

class ShowComment {
 getSeverData = async (link) => {
   try {
     const response = await fetch(link, {
       method: 'GET',
     });
     const responseData = await response.json();
     return responseData;
   } catch (error) {
     return error;
   }
 };

// Load comments from API
loadComments = async (index) => {
  commentContainer.innerHTML = '';
  const movieComments = await this.getSeverData(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${gameKey}/comments?item_id=${index}`,
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

togglePopUp = () => {
  popUpContainer.classList.toggle('hidden');
};

deployPopUp = async (show, index) => {
  const comments = await this.loadComments(index);
  const popupCommentsContainer = document.createElement('div');
  popupCommentsContainer.classList.add('popup-comments-container');
  popupCommentsContainer.innerHTML = `
    <h3>Comments</h3>
  `;
  popupCommentsContainer.appendChild(comments);
  popUpContainer.innerHTML = `
    <div class="popup">
    <i class="fa fa-times close-popup" aria-hidden="true"></i>
      <div class="popup-image">
        <img src="${show.image.medium}" alt="${show.name}">
      </div>
      <div class="popup-details">
        <div class="popup-about-container">
          <h3>Stats this year</h3>
          ${show.summary}
          <ul class="popup-about">
            <li><span class="popup-about-title">Rating</span> <span class="popup-about-value">${show.rating.average}</span></li>
            <li> <span class="popup-about-title">Runtime</span> <span class="popup-about-value">${show.runtime}</span></li>
            <li> <span class="popup-about-title">Genre</span><span class="popup-about-value">${show.genres[0]}</span></li>
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
}

popUpContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('close-popup')) {
    popUpContainer.classList.toggle('hidden');
  } else if (event.target.classList.contains('comment-btn')) {
    event.preventDefault();
    const userName = form.elements.user.value;
    const userComment = form.elements.comment.value;
    const itemId = 3;

    const raw = JSON.stringify({
      itemId,
      username: userName,
      comment: userComment,
    });
    form.elements.user.value = '';
    form.elements.comment.value = '';
  }
});

export default ShowComment;
