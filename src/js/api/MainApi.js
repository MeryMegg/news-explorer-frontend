export default class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

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

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => this._requestHandler(res))
    // .catch((err) => {
    //   err.json().then((err) => Promise.reject(err))
    // })
    //.catch(err => err);
  }

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

  removeArticle(articleId) {
    return fetch(`${this._url}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this._headers,    
      credentials: 'include',
    })
     .then((res) => this._requestHandler(res))
  }

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
    return Promise.reject(res);
  }
}
