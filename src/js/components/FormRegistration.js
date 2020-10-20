import BaseComponent from './BaseComponent';

export default class FormRegistration extends BaseComponent {
  constructor(popupReg, setInputListener, closePopup, choiceLoginPopup) {
    super();
    this._popup = popupReg;
    this._setInputListener = setInputListener;
    this._closePopup = closePopup;
    this._choicePopup = choiceLoginPopup;
  }

  createContent() {
    this._view = this._popup.cloneNode(true);
    this._view.querySelector("#regInputEmail").value = "";
    this._view.querySelector("#regInputPass").value = "";
    this._view.querySelector("#userName").value = "";
    this.content = this._view;
    this._setEventListeners();
    return this.content;
  }

  _setEventListeners() {
    this._closeButton = this.content.querySelector('.popup__close');
    this._form = this.content.querySelector('.form');
    this._link = this.content.querySelector('.popup__choice');
    this._setHandlers([
      [this._closeButton, 'click', this._closePopup],
      [this._form, 'submit', this._submitHandler],
      [this._link, 'click', this._choicePopup],
    ]);
    this._setInputListener(this._form);
  }

  _submitHandler(event) {
    event.preventDefault();
    console.log("меня отправили")
    // const link = this._view.querySelector("[name = url]");
    // const userInfo = { avatar: link.value };
    // this._addUserAvatar(userInfo);

    // this._renderLoading(true, this._view.querySelector(".button"));
  };
}