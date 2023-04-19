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
      data.forEach((like) => {
        const { itemId, likes } = like;
        this.likes[itemId] = likes;
        const heartIcon = document.querySelector(
          `[data-index='${itemId}'].heart`,
        );
        const likeCount = document.querySelector(
          `[data-index='${itemId}']#likeCount`,
        );

        if (likeCount) {
          likeCount.textContent = `(${this.likes[itemId]})`;
        }
        if (heartIcon) {
          if (this.likes[itemId] > 0) {
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
