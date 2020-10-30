import { getQuery } from "../utils/utils";

//получить статьи с новостного сайта
export default class NewsApi {
  constructor(config) {
    this._url = config.baseUrl;
  }

  getArticles(keyWord) {
    const query = getQuery(keyWord);
    return fetch(`${this._url}${query}`)
      .then((res) => this._requestHandler(res));
  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(Promise.reject.bind(Promise))
  }
}