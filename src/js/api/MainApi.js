export default class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._header = config.headers;
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._requestHandler(res));
  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}