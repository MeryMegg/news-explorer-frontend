export default class UserInfo {
  constructor(renderHeader) {
    // this._renderHeader = renderHeader;
    // this._buttonLogout = buttonLogout;

  }

  setUserInfo(userInfo) {
    this.name = userInfo.name;
    this._email = userInfo.email;
    //this._setButtonName();
    //this._config.myId = this._userInfo._id;
  }

  takeButtonName() {
    return this.name;
  }
}
