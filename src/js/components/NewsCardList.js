export default class NewsCardList {
  constructor(createNewsCard) {
    this._createNewsCard = createNewsCard;
  }

  render = (cards) => {
    cards.forEach((card) => this.addCard(card));
  };

  addCard(card) {
    this._container.append(
      this._createNewsCard(card)
    );
  }

  // saveCard = (card) => {
  //   this._instanceApi
  //     .createCards(card)
  //     .then((res) => {
  //       this.addCard(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("Что-то пошло не так... Повторите попытку...");
  //     })
  //     .finally(() => this._renderLoading(false));
  // };


}
