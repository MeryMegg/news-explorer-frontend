import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(params) {
    super();
    this._overlay = params.overlay;
    this._body = params.body;
    this._buttonOpenMenu = params.buttonOpenMenu;
    //функции
    this._showButtonOpenMenu = params.showButtonOpenMenu.bind(this);
    this._hideButtonOpenMenu = params.hideButtonOpenMenu.bind(this);
    this._closeMenuMobile = params.closeMenuMobile;
    this._isOpenMenuMobile = params.isOpenMenuMobile;
    this._removeContentPopupListeners = params.removeContentPopupListeners;

    this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
    this._handleCloseByOverlay = this._handleCloseByOverlay.bind(this);


  }

  open(content) {
    if (content) {
      this._overlay.append(content);
    }
    this._hideButtonOpenMenu(this._buttonOpenMenu);
    this._body.classList.toggle('body_overflow_hidden');
    this._setEventListeners();
    this._togglePopup();
  }

  _togglePopup() {
    this._overlay.classList.toggle("popup_is-opened");

  };

  choicePopup(content) {
    this._clearContent();
    this._overlay.append(content);
    this._setEventListeners();
  }

  _setEventListeners() {
    this._setHandlers([
      [this._overlay, 'mousedown', this._handleCloseByOverlay],
      [document, 'keyup', this._handleCloseByEsc],
    ]);
  }

  _clearContent() {
    this._removeEventListeners();
    if (this._overlay.querySelector('.popup__content')) {
      this._overlay.querySelector('.popup__content').remove();
    }
  }

  _removeEventListeners() {
    this._removeHandlers([
      [this._overlay, 'click', this._handleCloseByOverlay],
      [document, 'keyup', this._handleCloseByEsc],
    ]);
    const content = this._overlay
      .querySelector(".popup__content");
    if (content) {
      this._removeContentPopupListeners();
    }
  }

  close() {
    this._showButtonOpenMenu(this._buttonOpenMenu);
    this._body.classList.toggle('body_overflow_hidden');
    this._clearContent();
    this._togglePopup();
  };

  _handleCloseByOverlay(event) {
    if (event.target === this._overlay && event.target !== this._overlay.querySelector('.popup__content')) {
      this._isOpenMenuMobile() ? this._closeMenuMobile() : this.close();
    }
  }

  _handleCloseByEsc(event) {
    if (event.key === 'Escape') {
      this._isOpenMenuMobile() ? this._closeMenuMobile() : this.close();
    }
  }
}