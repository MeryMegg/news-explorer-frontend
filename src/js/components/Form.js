import PopupContent from './PopupContent';

export default class Form extends PopupContent {
  constructor(popupReg) {
    super();

  }

  submitHandler(form) {
    this._form = form;
    this._inputs = this._form.querySelectorAll('.input');
    const userInfo = [...this._inputs].reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    this._disableInputs();
    if (this._form.name === "formSearch" && !userInfo[this._inputs[0].name]) {
      console.log('Это поле пустое')
    }
    return userInfo;
  };

  _disableInputs() {
    this._button = this._form.querySelector(".button");
    this._inputs.forEach((input) =>
      input.setAttribute('disabled', true)
    );
    this._button.classList.add('button_is-disabled')
    this._button.setAttribute('disabled', true)
  };

  enableInputs() {
    this._inputs.forEach((input) =>
      input.removeAttribute('disabled', true)
    );
    this._button.classList.remove('button_is-disabled');
    this._button.removeAttribute('disabled', true)
  };

  setErrorMessage(message) {
    this._errorMessage = this._form.name === "formSearch" ? this._form.querySelector('.search__error-message') : this._form.querySelector('.popup__error-message');
    this._errorMessage.textContent = message ? message : "";
  }
}