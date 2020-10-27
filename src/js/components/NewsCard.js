import { conversionDateForCard } from '../utils/utils'
import BaseComponent from './BaseComponent';

export default class Card extends BaseComponent {
  constructor(params) {
    super();
    this._cardMarkup = params.newsCardMarkup;
    this._placeholderUrl = params.placeholderUrl;
    this._tooltipText = params.tooltipMessages;
    
    //функции
    this._getUserId = params.getUserId;
    this._saveArticle = params.saveArticle;
    this._revomeArticleData = params.revomeArticleData;

    this._isSaved = this._isSaved.bind(this);
    this._removeArticleFromSaved = this._removeArticleFromSaved.bind(this);
  }

  createCard(cardData) {
    const userId = this._getUserId();
    this._view = this._cardMarkup.cloneNode(true);
    const urlImege = this._getUrl(cardData.urlToImage);
    this._view.querySelector(".article__image").setAttribute('src', urlImege);
    this._view.querySelector('.article__tooltip').textContent = this._tooltipText.needAuth;
    this._view.querySelector('.article__button-icon').classList.add('article__button-icon_type_save');
    const articleDate = this._view.querySelector('.article__date')
    const dateTime = conversionDateForCard(cardData.publishedAt).dateAtribute;
    const dateArticle = conversionDateForCard(cardData.publishedAt).dateCard;
    articleDate.setAttribute('datetime', dateTime);
    articleDate.textContent = dateArticle;
    this._view.querySelector(".article__title").textContent = cardData.title;
    this._view.querySelector('.article__text').textContent = cardData.description;
    const source = this._view.querySelector('.article__link');
    source.textContent = cardData.source.name;
    source.setAttribute('href', cardData.url);
    this._view.querySelector('.article__keyword').textContent = cardData.keyWord;    
    this.cardElement = this._view;
    if (userId) {
      this.activateButton(this.cardElement);
    }
    return this.cardElement;
  }

  //устанавливаем картинку для статьи
  _getUrl(url) {
    const urlArticle = url ? url : this._placeholderUrl;
    return urlArticle;
  }

  //вешаем слушатель на иконку
  _setEventListener(icon) {
    this._addHandler(icon, 'click', this._isSaved)
  }

  _removeEventListener(icon) {
    this._removeHandler(icon, 'click', this._isSaved)
  }

  activateButton(card) {
    card.querySelector('.article__tooltip').classList.add('article__tooltip_is-invisible');
    const icon = card.querySelector('.article__button-icon');
    this._setEventListener(icon);
  }

  _isSaved(event) {
    if (event.target.classList.contains("article__button-icon_type_save-active")) {      
      this._removeArticleFromSaved(event);
    } else this._saved(event);
  }

  _saved(event) {
    const article = event.target.closest('.article');
    const sourceLink = article.querySelector('.article__link');
    const articleData = {
      keyword: article.querySelector('.article__keyword').textContent,
      title: article.querySelector('.article__title').textContent,
      text: article.querySelector('.article__text').textContent,
      date: article.querySelector('.article__date').textContent,
      source: sourceLink.textContent,
      link: sourceLink.getAttribute('href'),
      image: article.querySelector('.article__image').getAttribute('src')
    }
    this._saveArticle(articleData, article);
  }

  _removeArticleFromSaved (event) {
    const article = event.target.closest('.article');
    const articleId = article.getAttribute('id');
    this._revomeArticleData(articleId, article);
  }

  updateDataCard(article, articleId) {    
    console.log(article)    
    //const attribute = article.getAttribute('id') === articleId;
    //console.log(attribute)   
    if (article.getAttribute('id') === articleId) {
      article.removeAttribute('id')
    } 
    article.setAttribute('id', articleId);
    //attribute ? article.removeAttribute('id') : article.setAttribute('id', articleId);
    this._changeIcon(article);
  }

  _changeIcon(card) {
    console.log(card)
    const icon = card.querySelector('.article__button-icon');
    this._toggleClassIcon(icon);    
  }

  _toggleClassIcon(icon) {
    icon.classList.toggle("article__button-icon_type_save-active");
    icon.classList.toggle("article__button-icon_type_save");
  }

  // _chooseCallBack(icon) {
  //   const callback = (icon.classList.contains('article__button-icon_type_save')) ? this._isSaved : this._removeArticleFromSaved;
  //   return callback;
  // }  
}
