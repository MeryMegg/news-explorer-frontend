import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(params) {
    super();
    /* dom elements */
    this._overlay = params.overlay;
    this._body = params.body;
    this._buttonOpenMenu = params.buttonOpenMenu;
    //функции
    this._showButtonOpenMenu = params.showButtonOpenMenu;
    this._hideButtonOpenMenu = params.hideButtonOpenMenu;
    this._closeMenuMobile = params.closeMenuMobile;
    this._isOpenMenuMobile = params.isOpenMenuMobile;
    this._removeContentPopupListeners = params.removeContentPopupListeners;
  }

  //открывает оверлей и добавляет контент при наличии
  open = (content) => {
    if (content) {
      this._overlay.append(content);
    }
    this._hideButtonOpenMenu(this._buttonOpenMenu);
    this._body.classList.toggle('body_overflow_hidden');
    this._setEventListeners();
    this._togglePopup();
  }

  _togglePopup = () => {
    this._overlay.classList.toggle("popup_is-opened");
  };

  //смена контента во всплывающем окне
  choicePopup = (content) => {
    this._clearContent();
    this._overlay.append(content);
    this._setEventListeners();
  }

  //устанавливает слушатели
  _setEventListeners = () => {
    this._setHandlers([
      [this._overlay, 'mousedown', this._handleCloseByOverlay],
      [document, 'keyup', this._handleCloseByEsc],
    ]);
  }

  //удаляет контент из всплывающего окна
  _clearContent = () => {
    this._removeEventListeners();
    if (this._overlay.querySelector('.popup__content')) {
      this._overlay.querySelector('.popup__content').remove();
    }
  }

  //снимает слушатели
  _removeEventListeners = () => {
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

  //закрывает оверлей
  close = () => {
    this._showButtonOpenMenu(this._buttonOpenMenu);
    this._body.classList.toggle('body_overflow_hidden');
    this._clearContent();
    this._togglePopup();
  };

  //закрытие окна по клику на оверлей
  _handleCloseByOverlay = (event) => {
    if (event.target === this._overlay && event.target !== this._overlay.querySelector('.popup__content')) {
      this._isOpenMenuMobile() ? this._closeMenuMobile() : this.close();
    }
  }

  //закрытие окна по клику на ESC
  _handleCloseByEsc = (event) => {
    if (event.key === 'Escape') {
      this._isOpenMenuMobile() ? this._closeMenuMobile() : this.close();
    }
  }
}