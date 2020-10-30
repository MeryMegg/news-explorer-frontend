import BaseComponent from './BaseComponent';

export default class PopupContent extends BaseComponent {
  constructor(params) {
    super();
    this._popupReg = params.popupReg;
    this._popupLogin = params.popupLogin;
    this._choicePopup = params.choicePopup;
    this._formInputHandler = params.formInputHandler;
    this._formSubmitHandler = params.formSubmitHandler;
    this._removeCard = params.removeCard;
    this._closeOverlay = params.closeOverlay;
    // this._choiceContent = this._choiceContent.bind(this);
    //this._removeArticle = this._removeArticle.bind(this);
  }


  //формирует контент всплывающего окна
  createContent = (markup) => {
    this._view = markup.content.querySelector(".popup__content").cloneNode(true);
    this.content = this._view;
    this._setEventListeners();
    return this.content = this._view;
  }


  // _removeArticle = (event) => {
  //   const article = event.target.closest('article');
  //   this._removeCard(event);
  //   this._closeOverlay();
  // }

  //формирует контен при замене во всплывающем окне
  _choiceContent = (event) => {
    switch (true) {
      case event.target.id === "buttonChoiceReg":
        this._choicePopup(this.createContent(this._popupReg));
        break;
      case event.target.id === "buttonChoiceLogin" || event.target.id === "buttonChoiceLoginFromRes":
        this._choicePopup(this.createContent(this._popupLogin));
        break;
    }
  }

  //вешает слушатели
  _setEventListeners = () => {
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
    this._delButton = this.content.querySelector('#buttonDel');
    this._addHandler(this._closeButton, 'click', this._closeOverlay);
    this._setHandlers([
      [this._link, 'click', this._choiceContent],
      [this._closeButton, 'click', this._closeOverlay],
    ]);
  }

  //удаляет слушатели
  removeEventListeners = () => {
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
  }
}