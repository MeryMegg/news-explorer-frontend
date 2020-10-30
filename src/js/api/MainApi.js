export default class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  //регистрация
  signUp(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: data.regEmail,
        password: data.regPassword,
        name: data.userName
      }),
    })
      .then((res) => this._requestHandler(res));
  }

  //авторизация
  signIn(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: data.loginEmail,
        password: data.loginPassword,
      }),
    })
      .then((res) => this._requestHandler(res));
  }

  //получить данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._requestHandler(res))
  }

  //сохранить статью на сервере
  createArticle({ keyword, title, text, date, source, link, image }) {
    return fetch(`${this._url}/articles`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        keyword, title, text, date, source, link, image,
      }),
    })
      .then((res) => this._requestHandler(res))
  }

  //получить все статьи
  getArticles() {
    return fetch(`${this._url}/articles`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._requestHandler(res))
  }

  //удалить статью из базы
  removeArticle(articleId) {
    return fetch(`${this._url}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._requestHandler(res))
  }

  //выйти из системы
  signOut() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
      }),
    })
      .then((res) => this._requestHandler(res))
  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(Promise.reject.bind(Promise))
  }
}
