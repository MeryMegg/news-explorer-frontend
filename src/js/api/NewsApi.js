import { getQuery } from "../utils/utils";

export default class NewsApi {
  constructor(config) {
    this._url = config.baseUrl;
  }

  getArticles() {
    const query = getQuery();
    return fetch(`${this.config.baseUrl}/v2/everything?${query}`)
      .then((res) => this._requestHandler(res));
  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}