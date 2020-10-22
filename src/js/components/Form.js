import PopupContent from './PopupContent';

export default class Form extends PopupContent {
  constructor(popupReg) {
    super();

  }

  submitHandler(form) {
    this._form = form;
    this._inputs = this._form.querySelectorAll('.form__input');
    const userInfo = [...this._inputs].reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    this._disableInputs();
    return userInfo;
  };

  _disableInputs() {
    this._button = this._form.querySelector(".button");
    this._inputs.forEach((input) =>
      input.setAttribute('disabled', true)
    );
    this._button.classList.add('popup__button_is-disabled')
    this._button.setAttribute('disabled', true)
  };

  enableInputs() {
    this._inputs.forEach((input) =>
      input.removeAttribute('disabled', true)
    );
    this._button.classList.remove('popup__button_is-disabled');
    this._button.removeAttribute('disabled', true)
  };

  setErrorMessage(message) {
    this._errorMessage = this._form.querySelector('.popup__error-message');
    this._errorMessage.textContent = message
  }
}