import { buttonOpenMenu } from '../constants/dom-elements';
import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(params) {
    super();
    /* dom elements */
    this._buttonLogin = params.buttonOpenLoginPopup;
    this._buttonLogout = params.buttonLogout;
    this._itemsAuth = params.itemsAuth;
    this._itemUnauth = params.itemUnauth;
    this._buttonOpenMenu = params.buttonOpenMenu;
    this._popupLogin = params.popupLogin;

    /* functions */
    this._openOverlay = params.openOverlay;
    //this._openMenuMobile = params.openMenuMobile;
    this._logout = params.logout.bind(this);

    this._openPopup = this._openPopup.bind(this);
  }

  render(name) {
    if (!name) {
      this.setEventListener(this._buttonLogin);
      return;
    }
    this.setNameButton(name);
    this._itemsAuth.forEach((item) => {
      item.classList.remove(`list__item_is-invisible`);
    });
    this._itemUnauth.classList.add(`list__item_is-invisible`);
    this._changeListeners(true);
  }

  setNameButton(name) {
    this._buttonLogout.textContent = name;
  }

  logoutRendered() {
    this._itemsAuth.forEach((item) => {
      item.classList.add(`list__item_is-invisible`);
    });
    this._itemUnauth.classList.remove(`list__item_is-invisible`);
    this._changeListeners(false);
  }

  setEventListener(button) {
    this._addHandler(button, 'click', this._chooseCallBack(button));
  }

  _openPopup() {
    this._openOverlay(this._popupLogin);
  }

  _chooseCallBack(button) {
    const callback = (button === this._buttonLogout) ? this._logout : this._openPopup;
    return callback;
  }

  _changeListeners(flag) {
    if (flag) {
      this._addHandler(this._buttonLogout, 'click', this._logout);
      this._removeHandler(this._buttonLogin, 'click', this._openLoginPopup);
      return;
    }
    this._addHandler(this._buttonLogin, 'click', this._openLoginPopup);
    this._removeHandler(this._buttonLogout, 'click', this._logout);
  }
}