import BaseComponent from './BaseComponent';

export default class Menu extends BaseComponent {
  constructor(params) {
    super();
    this._menu = params.menuMobile;
    this._buttonOpen = params.buttonOpenMenu;
    this._buttonClose = params.buttonCloseMenu;

    this._openOverlay = params.openOverlay;
    this._closeOverlay = params.closeOverlay;

    this._open = this._open.bind(this);
    this.close = this.close.bind(this);
  }

  setEventListener(button) {
    this._addHandler(this._buttonOpen, 'click', this._open);
  }

  _open() {
    this._openOverlay();
    this._menu.classList.add('header__menu_is-visible');
    this.showButton(this._buttonClose);
  }

  hideButton(button) {
    button.classList.add('button-icon_is-invisible');
    this._removeHandler(button, 'click', this._chooseCallBack(button));
  }

  showButton(button) {
    button.classList.remove('button-icon_is-invisible');
    this._addHandler(button, 'click', this._chooseCallBack(button));
  }

  _chooseCallBack(button) {
    const callback = (button === this._buttonOpen) ? this._open : this.close;
    return callback;
  }

  close() {
    this._menu.classList.remove('header__menu_is-visible');
    this.hideButton(this._buttonClose);
    this._closeOverlay();
  }
}