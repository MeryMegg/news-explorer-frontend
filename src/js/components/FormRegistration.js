import PopupContent from './PopupContent';

export default class FormRegistration extends PopupContent {
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

  _disableFormInputs() {
    this._submit = this._form.querySelector(".button");
    this._inputs = this._form.querySelectorAll("input");
    this._disableInputs(this._inputs, this._submit);
  };

  enableFormInputs() {
    this._submit = this._form.querySelector(".button");
    this._inputs = this._form.querySelectorAll("input");
    this._enableInputs(this._inputs, this._submit);
  };

  _submitHandler(event) {
    event.preventDefault();
    console.log("меня отправили")
    const email = this._view.querySelector("#regInputEmail");
    const password = this._view.querySelector("#regInputPassword");
    const name = this._view.querySelector("#userName");
    const userInfo = { email: email.value, password: password.value, name: name.value };
    this._addUserInfo(userInfo);
    this._disableFormInputs();
  };
}