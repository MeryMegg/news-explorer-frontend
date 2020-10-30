export default class NewsCardList {
  constructor(params) {
    /* dom elements */
    this._container = params.newsCardList;
    /* functions */
    this._createNewsArticle = params.createNewsArticle;
    this._getUserId = params.getUserId;
  }

  //отправляет карточки из массива на отрисовку
  render = (cards) => {
    cards.forEach((card) => this.addCard(card));
  };


  //добавляет в разметку готовые карточки
  addCard = (card) => {
    this._container.append(
      this._createNewsArticle(card)
    );
  };

  //отправляет массив карточек на удаление
  clear = () => {
    const articles = [...this._container.querySelectorAll('.article')];
    articles.forEach((article) => {
      this.removeCard(article);
    });
  }

  //удаляет карточку
  removeCard = (article) => {
    article.remove();
  }
}
