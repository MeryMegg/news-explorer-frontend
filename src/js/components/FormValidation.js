import { errorMessages } from "../constants/messages";
import BaseComponent from './BaseComponent';

export default class FormValidation extends BaseComponent {
  constructor(errorMessages, enableSearchInputs) {
    super();
    this.errorMessages = errorMessages;
    this._enableSearchInputs = enableSearchInputs;

  }

  //обработчик событий
  inputHandler = (event) => {
    this._submit = event.target
      .closest(".form")
      .querySelector(".button");
    const inputs = [...event.target
      .closest(".form").querySelectorAll(".input")];

    this.isFieldValid(event.target);

    if (inputs.every(this._isValidate)) {
      this.setSubmitButtonState(this._submit, true);
    } else {
      this.setSubmitButtonState(this._submit, false);
    }
  }

  //Проверяет наличие данных в форме поиска новостей перед отправкой
  getValidateData = (form, data) => {
    const values = Object.values(data);
    const errorElem = form.querySelector(`.error-message`);
    const i = 0;
    const keyWord = values[i];
    if (keyWord === "") {
      errorElem.textContent = errorMessages.empty;
      this._enableSearchInputs();
    }
    return keyWord;
  }

  //Добавляет или удаляет ошибку
  isFieldValid = (input) => {
    const errorElem = input
      .closest(".form")
      .querySelector(`#${input.name}-error`);
    const valid = this._isValidate(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  }

  //Проверяет поля и выбирает ошибку
  _isValidate = (input) => {
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

    if (input.validity.patternMismatch && input.type === "email") {
      input.setCustomValidity(errorMessages.wrongEmail);
      return false;
    }

    return input.checkValidity();
  }

  // Активирует и деактивирует кнопку submit
  setSubmitButtonState = (submit, state) => {
    if (submit.id === "searchNews") {
      return;
    }
    if (state) {
      submit.removeAttribute("disabled");
      submit.classList.remove(`button_is-disabled`);
    } else {
      submit.setAttribute("disabled", true);
      submit.classList.add(`button_is-disabled`);
    }
  }
}
