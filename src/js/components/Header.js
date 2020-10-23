import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(parametrs) {
    super();
    /* dom elements */
    this._buttonLogin = parametrs.buttonOpenLoginPopup;
    this._buttonLogout = parametrs.buttonLogout;
    this._itemsAuth = parametrs.itemsAuth;
    this._itemUnauth = parametrs.itemUnauth;
    this._buttonOpenMenu = parametrs.buttonOpenMenu;
    this._logout = parametrs.logout.bind(this);

    /* functions */
    this._openLoginPopup = parametrs.openLoginPopup;
    this._openMenuMobile = parametrs.openMenuMobile;


  }

  render(name) {
    this._addHandler(this._buttonOpenMenu, 'click', this._openMenuMobile);
    if (!name) {
      this._addHandler(this._buttonLogin, 'click', this._openLoginPopup);
      return;
    }
    this._buttonLogout.textContent = name;
    this._itemsAuth.forEach((item) => {
      item.classList.remove(`list__item_is-invisible`);
    });
    this._itemUnauth.classList.add(`list__item_is-invisible`);
    this._changeListeners(true);
  }

  logoutRendered() {
    this._itemsAuth.forEach((item) => {
      item.classList.add(`list__item_is-invisible`);
    });
    this._itemUnauth.classList.remove(`list__item_is-invisible`);
    this._changeListeners(false);
  }

  _changeListeners(flag) {
    if (flag) {
      this._addHandler(this._buttonLogout, 'click', this._logout);
      this._removeHandler(this._buttonLogin, 'click', this._openLoginPopup);
      return;
    }
    this._removeHandler(this._buttonLogout, 'click', this._logout);
    this._addHandler(this._buttonLogin, 'click', this._openLoginPopup);
  }
}