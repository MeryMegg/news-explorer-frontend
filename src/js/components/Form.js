import PopupContent from './PopupContent';

export default class Form extends PopupContent {
  constructor(params) {
    super(params);
    this.enableInputs = this.enableInputs.bind(this)
  }

  submitHandler(form) {
    this._form = form;
    this._inputs = this._form.querySelectorAll('.input');
    const userInfo = [...this._inputs].reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    this._disableInputs();
    return userInfo;
  };

  clearForm(form) {
    const inputs = form.querySelectorAll('.input');
    inputs.forEach(input => {
      input.value = '';
    });
  }

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
      input.removeAttribute('disabled')
    );
    this._button.classList.remove('button_is-disabled');
    this._button.removeAttribute('disabled')
  };

  setErrorMessage(message) {
    this._errorMessage = this._form.querySelector('.popup__error-message');
    this._errorMessage.textContent = message ? message : "";
  }
}