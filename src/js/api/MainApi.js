export default class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._header = config.headers;
  }

  signUp(data) {
    console.log(JSON.stringify({
      email: data.regEmail,
      password: data.regPassword,
      name: data.userName
    }))
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
    console.log(data)
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
      .then((res) => this._requestHandler(res));
  }

  _requestHandler(res) {
    if (res.ok) {
      return res.json();
    }
    //console.log(res.status)
    return Promise.reject(res);
  }
}