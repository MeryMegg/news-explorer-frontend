import { getQuery } from "../utils/utils";

export default class NewsApi {
  constructor(config) {
    this._url = config.baseUrl;
  }

  getArticles(keyWord) {
    const query = getQuery(keyWord);
    console.log(query);
    return fetch(`${this._url}${query}`)
      .then((res) => this._requestHandler(res));
  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}