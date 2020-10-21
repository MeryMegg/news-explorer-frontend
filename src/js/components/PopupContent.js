import BaseComponent from './BaseComponent';

export default class PopupContent extends BaseComponent {
  constructor() {
    super();
  }

  _disableInputs(inputs, button) {
    inputs.forEach((input) =>
      input.setAttribute('disabled', true)
    );
    button.classList.add('popup__button_is-disabled')
  };

  _enableInputs(inputs, button) {
    inputs.forEach((input) =>
      input.removeAttribute('disabled', true)
    );
    button.classList.remove('popup__button_is-disabled')
  };
}