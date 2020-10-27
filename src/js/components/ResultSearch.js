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
    this._renderNextArticles = params.renderNextArticles.bind(this);
    this._articles = [];
    this._blockArticles = [];
    //this._renderArticles = [];
  }

  renderResultSearch(articles, keyWord) {
  const arrLength = articles.length;
    switch (true) {
      case arrLength === 0:
        this.show(this._blockNotFound)
        break;
      case arrLength < 3:
        this.show(this._blockContent, false)
        break;
      case arrLength > 3:
        this.show(this._blockContent, true)
        break;
    }
    this._setResArticlesData(articles, keyWord)
  }

  show(block, flag) {
    if (block === this._blockContent && flag) {
      this._showButtonMore();
    }
    block.classList.remove('result-search__block_is-invisible');
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
    //this._renderArticles = this._renderArticles.concat(this._blockArticles);
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
        block.classList.add('result-search__block_is-invisible');
      }
      if (!block.classList.contains('result-search__block_is-invisible')) {
        block.classList.add('result-search__block_is-invisible');
      }
    })
  }
}