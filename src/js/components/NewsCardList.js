export default class NewsCardList {
  constructor(params) {
    this._container = params.newsCardList;

    this._createNewsArticle = params.createNewsArticle;
    this._getUserId = params.getUserId;
  }

  render = (cards) => {
    cards.forEach((card) => this.addCard(card));
  };

  addCard(card) {
    this._container.append(
      this._createNewsArticle(card)
    );
  };

  clear() {
    const articles = [...this._container.querySelectorAll('.article')];
    articles.forEach((article) => {
      article.remove();
    });
  }
}
