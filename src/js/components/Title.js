import { enumerate, sortKeyWords } from '../utils/utils';

export default class Title {
  constructor(params) {
    /* dom-elements */
    this._title = params.title;
    this._listKeyWords = params.listKeyWords;
    this._titelBlockKeyWords = params.titelBlockKeyWords;
    /* constants */
    this._declinableWords = params.declinableWords;
    this._declinableendings = params.declinableendings;
    this._numberOfKeyWords = params.numberOfKeyWords;
    this._nunberOrItem = params.nunberOrItem;
    /* функции */
    this._getUserName = params.getUserName;
    this._changeBlocksResultSearch = params.changeBlocksResultSearch;
  }

  //формирует титульный блок
  setUserInfo = (articles) => {
    const name = this._getUserName();
    if (articles.length === 0) {
      this._title.textContent = `${this._getUserName()}, у вас нет сохраненных статей`;
      this._titelBlockKeyWords.textContent = "";
      return
    }
    this._title.textContent = `${name}, у вас ${articles.length} ${enumerate(articles.length, this._declinableWords)}`;
    const keysSorted = sortKeyWords(articles);
    if (keysSorted.length <= this._numberOfKeyWords) {
      this._listKeyWords.textContent = `${keysSorted.join(', ')}`;
      return
    }
    if (keysSorted.length > this._numberOfKeyWords) {
      this._listKeyWords.textContent = `${keysSorted.splice(0, this._nunberOrItem).join(', ')}
      и ${keysSorted.length}${enumerate(keysSorted.length, this._declinableendings)} другим`;
      return
    }
  }

  //обновляет информацию в титульном блоке при удалении статьи
  updateUserInfo = (articleId) => {
    const arr = JSON.parse(sessionStorage.articles);
    const index = arr.findIndex(item => item.id === articleId);
    arr.splice(index, 1);
    this.setUserInfo(arr);
    sessionStorage.articles = JSON.stringify(arr);
  }
}