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

  enableInputs(inputs, button) {
    inputs.forEach((input) =>
      input.removeAttribute('disabled', true)
    );
    button.classList.remove('popup__button_is-disabled');
    button.removeAttribute('disabled', true)
  };

  setErrorMessage(err) {
    this._errorMessage = this._form.querySelector('.popup__error-message');
    this._errorMessage.textContent = err.message || "произошла ошибка"
  }
}