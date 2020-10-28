import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(params) {
    super();
    this._blockContent = params.blockSearchContent;
    this._blockNotFound = params.blockNotFound;
    this._blockError = params.blockError;
    this._button = params.buttonMore;
    this._numberOfArticles = params.numberOfArticles;
    this._clearNewsCardList = params.clearNewsCardList;
    this._saveArticleData = params.saveArticleData;
    this._getUserId = params.getUserId;
    this._renderNextArticles = params.renderNextArticles.bind(this);
    this._clickHandler = this._clickHandler.bind(this)
    this.removeEventListenerOnBlock = this.removeEventListenerOnBlock.bind(this);
    this._articles = [];
    this._blockArticles = [];
  }

  renderResultSearch(articles, keyWord) {
    const arrLength = articles.length;
    if (arrLength === 0) {
      this.show(this._blockNotFound)
      return
    }
    this.show(this._blockContent, arrLength);
    this._setResArticlesData(articles, keyWord)
  }

  show(block, arrLength) {
    if (block === this._blockContent && this._getUserId()) {
      this.setEventListenerOnBlock();
    }
    block.classList.remove('result-search__block_is-invisible');
    if (arrLength > this._numberOfArticles) {
      this._showButtonMore();
    }
  }

  setEventListenerOnBlock() {
    console.log("Вешаем слушатель")
    this._addHandler(this._blockContent, 'click', this._clickHandler)
  }

  removeEventListenerOnBlock() {
    console.log("снимаем слушатель")
    this._addHandler(this._blockContent, 'click', this._clickHandler)
  }

  _clickHandler(event) {
    if (event.target.classList.contains('article__button-icon')) {
      console.log("меня нажали")
      this._saveArticleData(event);
    }
  }

  hide(block) {
    block.classList.add('result-search__block_is-invisible');
  }

  _showButtonMore() {
    this._button.classList.remove('result-search__button_is-invisible');
    this._addHandler(this._button, 'click', this._renderNextArticles);
  }

  hideButtonMore() {
    this._button.classList.add('result-search__button_is-invisible');
    this._removeHandler(this._button, 'click', this.renderNextArticles);
  }

  _setResArticlesData(articles, subjectArticle) {
    const keyword = { keyWord: subjectArticle };
    this._articles = articles.map((article) => ({ ...article, ...keyword }));
  }

  getArticles() {
    this._blockArticles = this._articles.splice(0, this._numberOfArticles);
    return this._blockArticles;
  }

  getLengthArticles() {
    return this._articles.length;
  }

  //Закрывает все блоки секции result-search
  closeResultSearchBlocks() {
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