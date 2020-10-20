import { errorMessages } from "../constants/messages";
import BaseComponent from './BaseComponent';

export default class FormValidation extends BaseComponent {
  constructor() {
    super();
    this._inputHandler = this._inputHandler.bind(this);
  }

  setEventListeners(form) {
    console.log(form)
    const inputs = form.querySelectorAll(".form__input");
    inputs.forEach((input) =>
      this._addHandler(input, 'input', this._inputHandler)
    );
  };

  removeEventListeners(form) {
    const inputs = form.querySelectorAll(".form__input");
    inputs.forEach((input) =>
      this._removeHandler(input, 'input', this._inputHandler)
    );
  };

  //обработчик событий
  _inputHandler(event) {
    this._submit = event.target
      .closest(".form")
      .querySelector(".button");
    console.log(this._submit)
    const inputs = [...event.target.closest(".form").elements].filter(
      (input) => input.type !== "submit"
    );

    this.isFieldValid(event.target);

    if (inputs.every(this._isValidate)) {
      this.setSubmitButtonState(this._submit, true);
    } else {
      this.setSubmitButtonState(this._submit, false);
    }
  }

  //Добавляет или удаляет ошибку
  isFieldValid(input) {
    const errorElem = input
      .closest(".form")
      .querySelector(`#${input.name}-error`);
    const valid = this._isValidate(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  }

  //Проверяет поля и выбирает ошибку
  _isValidate(input) {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(errorMessages.empty);
      return false;
    }

    if (input.id === 'userName') {
      if (input.validity.tooShort || input.value.length > 30) {
        input.setCustomValidity(errorMessages.wrongLengthName);
        return false;
      }
    }

    if (input.validity.tooShort && input.type === "password") {
      input.setCustomValidity(errorMessages.wrongLength);
      return false;
    }

    if (input.validity.typeMismatch && input.type === "email") {
      input.setCustomValidity(errorMessages.wrongEmail);
      return false;
    }

    return input.checkValidity();
  }

  // Активирует и деактивирует кнопку submit
  setSubmitButtonState(submit, state) {
    if (state) {
      this._submit.removeAttribute("disabled");
      this._submit.classList.remove(`popup__button_is-disabled`);
    } else {
      this._submit.setAttribute("disabled", true);
      this._submit.classList.add(`popup__button_is-disabled`);
    }
  }
}
