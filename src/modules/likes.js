class ShowLikes {
  constructor() {
    this.link = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/vEd7M0bIqSsuVuChZddE/likes/';
    this.likes = {};
    this.renderLikes();
  }

  updateLikes = async (index) => {
    try {
      const response = await fetch(this.link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id: index }),
      });
      const data = await response.text();
      console.log('Like created successfully:', data);
      this.likes[index] = (this.likes[index] || 0) + 1;
      this.renderLikes();
    } catch (error) {
      console.error('Error creating like:', error);
    }
  };

  renderLikes = async () => {
    try {
      const response = await fetch(this.link);
      const data = await response.json();
      console.log(data);
      data.forEach((like) => {
        const { item_id, likes } = like;
        this.likes[item_id] = likes;
        const heartIcon = document.querySelector(
          `[data-index='${item_id}'].heart`,
        );
        const likeCount = document.querySelector(
          `[data-index='${item_id}']#likeCount`,
        );

        if (likeCount) {
          likeCount.textContent = `(${this.likes[item_id]})`;
        }
        if (heartIcon) {
          if (this.likes[item_id] > 0) {
            heartIcon.style.color = 'red';
          } else {
            heartIcon.style.color = 'black';
          }
        } else {
          console.log('No');
        }
      });
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };
}

export default ShowLikes;