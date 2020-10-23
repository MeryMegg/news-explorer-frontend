import BaseComponent from './BaseComponent';

export default class PopupContent extends BaseComponent {
  constructor(popupReg, popupLogin, closePopup, choicePopup, formInputHandler, formSubmitHandler) {
    super();
    this._popupReg = popupReg;
    this._popupLogin = popupLogin;
    this._closePopup = closePopup;
    this._choicePopup = choicePopup;
    this._formInputHandler = formInputHandler;
    this._formSubmitHandler = formSubmitHandler;
    this._choiceContent = this._choiceContent.bind(this);
  }

  createContent(markup) {
    this._view = markup.cloneNode(true);
    this.content = this._view;
    this._setEventListeners();
    return this.content = this._view;
  }

  _choiceContent(event) {
    switch (true) {
      case event.target.id === "buttonChoiceReg":
        this._choicePopup(this.createContent(this._popupReg));
        break;
      case event.target.id === "buttonChoiceLogin" || event.target.id === "buttonChoiceLoginFromRes":
        this._choicePopup(this.createContent(this._popupLogin));
        break;
    }
  }

  _setEventListeners() {
    if (this.content.classList.contains('popup__content_form')) {
      this._form = this.content.querySelector('.form');
      this._inputs = this.content.querySelectorAll('.form__input');
      this._addHandler(this._form, 'submit', this._formSubmitHandler);
      this._inputs.forEach((input) => {
        this._addHandler(input, 'input', this._formInputHandler);
      });
    }
    this._closeButton = this.content.querySelector('.popup__close');
    this._link = this.content.querySelector('.popup__link');
    this._setHandlers([
      [this._link, 'click', this._choiceContent],
      [this._closeButton, 'click', this._closePopup],
    ]);
  }

  _removeEventListeners() {
    if (this._view.classList.contains('.popup__content_form')) {
      this._removeHandler(this._form, 'submit', this._formSubmitHandler);
      this._inputs.forEach((input) => {
        this._removeHandler(input, 'input', this._formInputHandler);
      });
    }

    this._removeHandlers([
      [this._closeButton, 'click', this._closeContent],
      [this._link, 'click', this._choicePopup]
    ]);
    // this._setInputListener(this._form);
  }


  // setEventListeners(form) {
  //   const inputs = form.querySelectorAll(".form__input");
  //   inputs.forEach((input) =>
  //     this._addHandler(input, 'input', this._inputHandler)
  //   );
  // };
}