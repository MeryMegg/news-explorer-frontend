import { conversionDateForCard } from '../utils/utils';
export default class Card {
  constructor(params) {
    this._cardMarkup = params.newsCardMarkup;
    this._placeholderUrl = params.placeholderUrl;
    //функции
    this._getUserId = params.getUserId;
    this._saveArticle = params.saveArticle;
    this._revomeArticleData = params.revomeArticleData;

    //this._removeArticleFromSaved = this._removeArticleFromSaved.bind(this);
  }

  createCardForMainPage(cardData) {
    const userId = this._getUserId();
    this._view = this._cardMarkup.content.querySelector(".article").cloneNode(true);
    //фото
    const urlImage = this._getUrl(cardData.urlToImage);
    this._view.querySelector(".article__image").setAttribute('src', urlImage);
    //дата
    const articleDate = this._view.querySelector('.article__date')
    const dateArticle = conversionDateForCard(cardData.publishedAt).dateCard;
    articleDate.setAttribute('datetime', cardData.publishedAt);
    articleDate.textContent = dateArticle;
    //Заголовок и текст
    this._view.querySelector(".article__title").textContent = cardData.title;
    this._view.querySelector('.article__text').textContent = cardData.description;
    //Источник и ссылка
    const source = this._view.querySelector('.article__link');
    source.textContent = cardData.source.name;
    source.setAttribute('href', cardData.url);
    //Ключевое слово
    const keyWord = this._view.querySelector('.article__keyword');
    keyWord.textContent = cardData.keyWord;
    this.cardElement = this._view;

    if (userId) {
      this.hideTooltip(this.cardElement);
    }
    return this.cardElement;
  }

  createCardForFavouritesPage(cardData) {
    this._view = this._cardMarkup.content.querySelector(".article").cloneNode(true);
    //id
    this._view.setAttribute('id', cardData._id);
    //фото
    const urlImage = this._getUrl(cardData.image);
    this._view.querySelector(".article__image").setAttribute('src', urlImage);
    //дата
    const articleDate = this._view.querySelector('.article__date')
    const dateArticle = conversionDateForCard(cardData.date).dateCard;
    articleDate.setAttribute('datetime', cardData.date);
    articleDate.textContent = dateArticle;
    //Заголовок и текст
    this._view.querySelector(".article__title").textContent = cardData.title;
    this._view.querySelector('.article__text').textContent = cardData.text;
    //Источник и ссылка
    const source = this._view.querySelector('.article__link');
    source.textContent = cardData.source;
    source.setAttribute('href', cardData.link);
    //Ключевое слово
    const keyWord = this._view.querySelector('.article__keyword');
    keyWord.textContent = cardData.keyword;
    this.cardElement = this._view;
    return this.cardElement;
  }

  //устанавливаем картинку для статьи
  _getUrl(url) {
    const urlArticle = url ? url : this._placeholderUrl;
    return urlArticle;
  }

  hideTooltip(card) {
    card.querySelector('.article__tooltip').classList.add('article__tooltip_is-invisible');
  }

  isSaved(event) {
    if (event.target.classList.contains("article__button-icon_type_save-active")) {
      this.removeArticleFromSaved(event);
    } else this._saved(event);
  }

  _saved(event) {
    const article = event.target.closest('.article');
    const sourceLink = article.querySelector('.article__link');
    const articleData = {
      keyword: article.querySelector('.article__keyword').textContent,
      title: article.querySelector('.article__title').textContent,
      text: article.querySelector('.article__text').textContent,
      date: article.querySelector('.article__date').getAttribute('datetime'),
      source: sourceLink.textContent,
      link: sourceLink.getAttribute('href'),
      image: article.querySelector('.article__image').getAttribute('src')
    }
    this._saveArticle(articleData, article);
  }

  removeArticleFromSaved(event) {
    const article = event.target.closest('.article');
    const articleId = article.getAttribute('id');
    this._revomeArticleData(articleId, article);
  }

  updateDataCard(article, articleId) {
    if (article.getAttribute('id') === articleId) {
      article.removeAttribute('id')
    }
    article.setAttribute('id', articleId);
    this._changeIcon(article);
  }

  _changeIcon(card) {
    const icon = card.querySelector('.article__button-icon');
    this._toggleClassIcon(icon);
  }

  _toggleClassIcon(icon) {
    icon.classList.toggle("article__button-icon_type_save-active");
    icon.classList.toggle("article__button-icon_type_save");
  }
}
