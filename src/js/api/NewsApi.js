import { getQuery } from "../utils/utils";

export default class NewsApi {
  constructor(config) {
    this._url = config.baseUrl;
  }

  getArticles(keyWord) {
    const query = getQuery(keyWord);
    return fetch(`https://nomoreparties.co/news/v2/everything?${query}`)
      .then((res) => this._requestHandler(res));
  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(Promise.reject.bind(Promise))
  }
}