import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(body, overlay, removeContentPopupListeners) {
    super();
    this._overlay = overlay;
    this._body = body;
    this._removeContentPopupListeners = removeContentPopupListeners;

    this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
    this._handleCloseByOverlay = this._handleCloseByOverlay.bind(this);
    this._removeEventListeners = this._removeEventListeners.bind(this);

  }

  open(content) {
    this._overlay.append(content);
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
    this._overlay.querySelector('.popup__content').remove();
  }

  _removeEventListeners() {
    this._removeHandlers([
      [this._overlay, 'click', this._handleCloseByOverlay],
      [document, 'keyup', this._handleCloseByEsc],
    ]);
    if (
      this._overlay
        .querySelector(".popup__content")
        .classList.contains("popup__content_type_form")
    ) {
      const form = this._overlay.querySelector(".form");

      this._removeContentPopupListeners(form);
    }
  }

  close() {
    this._body.classList.toggle('body_overflow_hidden');
    this._clearContent();
    this._togglePopup();
  };

  _handleCloseByOverlay(event) {
    if (event.target === this._overlay && event.target !== this._overlay.querySelector('.popup__content')) {
      this.close();
    }
  }

  _handleCloseByEsc(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}