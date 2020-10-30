import { enumerate, sortKeyWords } from '../utils/utils';

export default class Title {
  constructor(params) {
    this._title = params.title;
    this._listKeyWords = params.listKeyWords;
    this._titelBlockKeyWords = params.titelBlockKeyWords;
    this._declinableWords = params.declinableWords;
    this._declinableendings = params.declinableendings;
    this._numberOfKeyWords = params.numberOfKeyWords;
    this._nunberOrItem = params.nunberOrItem;
    this._getUserName = params.getUserName;
  }

  setUserInfo(articles) {
    if (articles.length === 0) {
      this._title.textContent = `${this._getUserName()}, у вас нет сохраненных статей`;
      this._titelBlockKeyWords.textContent = "";
      return
    }
    this._title.textContent = `${this._getUserName()}, у вас ${articles.length} ${enumerate(articles.length, this._declinableWords)}`;
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
}