const Cards = document.querySelector('.container');

class TVShowCards {
  constructor() {
    this.collection = [];
  }

  fetchCardsData = async () => {
    for (let i = 1; i <= 22; i++) {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${i}`);
        const data = await response.json();
        this.collection.push(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    return this.collection;
  };

  renderCards = (cardsData) => {
    Cards.innerHTML = '';
    cardsData.forEach((data) => {
      if (data.image) {
        Cards.innerHTML += `<div class='cards'>
              <div class='image-div'>
                <img src='${data.image.medium}' alt='#' class='image'>
              </div>
              <div class='name-like'>
                <h2 class='ch-nmae'>${data.name}</h2>
                <span class='heart'>&#x2764;</span>
                <span id='likeCount'>(0)</span>
              </div>
              <button class='comment-Btn'>Comments</button>
            </div>`;
      }
    });
  };

  updateCards = async () => {
    const cardsData = await this.fetchCardsData();
    this.renderCards(cardsData);
  };
}

export default TVShowCards;