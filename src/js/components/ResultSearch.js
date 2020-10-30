import BaseComponent from './BaseComponent';

export default class ResultSearch extends BaseComponent {
  constructor(params) {
    super();
    /* dom elements */
    this._blockContent = params.blockSearchContent;
    this._blockNotFound = params.blockNotFound;
    this._blockError = params.blockError;
    this._button = params.buttonMore;
    this._numberOfArticles = params.numberOfArticles;
    /* функции */
    this._clearNewsCardList = params.clearNewsCardList;
    this._saveArticleData = params.saveArticleData;
    this._getUserId = params.getUserId;
    this._renderNextArticles = params.renderNextArticles;
    this._removeCard = params.removeCard;

    //this._clickHandler = this._clickHandler.bind(this)
    //this.removeEventListenerOnBlock = this.removeEventListenerOnBlock.bind(this);
    this._articles = [];
    this._blockArticles = [];
  }

  //выбирает необходимый блок в зависимости от пришедших данных
  renderResultSearch = (articles, keyWord) => {
    const arrLength = articles.length;
    if (arrLength === 0) {
      this.show(this._blockNotFound)
      return
    }
    this.show(this._blockContent, arrLength);
    this._setResArticlesData(articles, keyWord)
  }

  //отображает блок
  show = (block, arrLength) => {
    if (block === this._blockContent && this._getUserId()) {
      this.setEventListenerOnBlock();
    }
    block.classList.remove('result-search__block_is-invisible');
    if (arrLength > this._numberOfArticles) {
      this._showButtonMore();
    }
  }

  //вешает слушатели
  setEventListenerOnBlock = () => {
    this._addHandler(this._blockContent, 'click', this._clickHandler)
  }

  //удаляет слушатели
  removeEventListenerOnBlock = () => {
    this._addHandler(this._blockContent, 'click', this._clickHandler)
  }

  //обрабатывает слушатели
  _clickHandler = (event) => {
    if (event.target.id === "saveIcon") {
      this._saveArticleData(event);
      return
    }
    if (event.target.id === "delIcon") {
      this._removeCard(event)
      return
    }
  }

  //скрывает блок
  hide = (block) => {
    block.classList.add('result-search__block_is-invisible');
  }

  //показывает кнопку "Показать еще"
  _showButtonMore = () => {
    if (this._button) {
      this._button.classList.remove('result-search__button_is-invisible');
      this._addHandler(this._button, 'click', this._renderNextArticles);
    }
  }

  //скрывает кнопку "Показать еще"
  hideButtonMore = () => {
    if (this._button) {
      this._button.classList.add('result-search__button_is-invisible');
      this._removeHandler(this._button, 'click', this._renderNextArticles);
    }
  }

  //добавляем в объекты к карточкам ключевое слово
  _setResArticlesData = (articles, subjectArticle) => {
    const keyword = { keyWord: subjectArticle };
    this._articles = articles.map((article) => ({ ...article, ...keyword }));
  }

  //отдает все статьи
  getArticles = () => {
    return this._articles;
  }

  //отдает по 3 статьи
  getBlockArticles = () => {
    this._blockArticles = this._articles.splice(0, this._numberOfArticles);
    return this._blockArticles;
  }

  //отдает длинну массива
  getLengthArticles = () => {
    return this._articles.length;
  }

  //Закрывает все блоки секции result-search
  closeResultSearchBlocks = () => {
    const blocks = [...document.querySelectorAll('.result-search__block')];
    blocks.forEach((block) => {
      if (!block.classList.contains('result-search__block_is-invisible') && block.classList.contains('result-search__block_type_content')) {
        this._clearNewsCardList();
        if (this._getUserId()) {
          this.removeEventListenerOnBlock();
        }
        block.classList.add('result-search__block_is-invisible');
      }
      if (!block.classList.contains('result-search__block_is-invisible')) {
        block.classList.add('result-search__block_is-invisible');
      }
    })
  }
}