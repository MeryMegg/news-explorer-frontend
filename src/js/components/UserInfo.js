export default class UserInfo {
  constructor() {
  }

  //сохраняет пользовательские данные
  setUserInfo = (data) => {
    this._name = data ? data.name : "";
    this._email = data ? data.email : "";
    this._userId = data ? data._id : "";
  }

  //отдает пользовательские данные
  getUserData = () => {
    const name = this._name;
    const userId = this._userId;
    return { name, userId }
  }
}
