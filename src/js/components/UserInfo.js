export default class UserInfo {
  constructor() {
  }

  setUserInfo(data) {
    console.log(data)
    this._name = data ? data.name : "";
    this._email = data ? data.email : "";
    this._id = data ? data._id : "";
  }

  getUserName() {
    return this._name;
  }

  getUserId() {
    return this._name;
  }
}
