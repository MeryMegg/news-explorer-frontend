import '../styles/index.css';

(function () {

  const body = document.querySelector('.body');
  const buttonOpenMenu = document.querySelector('#openMenu');
  const buttonCloseMenu = document.querySelector('#closeMenu');
  const overlay = document.querySelector('#overlay');
  const menuMobile = document.querySelector('.header__menu')
  const popupLogin = document.querySelector('#popupLogin');
  const popupReg = document.querySelector('#popupReg');
  const popupRes = document.querySelector('#popupResponse');
  const buttonOpenLogitPopup = document.querySelector('#openLoginPopup');
  const linkOpenLoginPopup = document.querySelector('#buttonChoiceLogin');
  const linkOpenRegPopup = document.querySelector('#buttonChoiceReg');
  const closeButtons = document.querySelectorAll('.popup__close');
  const buttonLogin = document.querySelector('#buttonLogin');
  const formReg = document.querySelector('[name = formReg]');

  // убирает/восстанавливает скролл на странице
  function toggleOverflow() {
    body.classList.toggle('body_overflow_hidden');
  }

  //добавляет/убирает класс popup_is-opened для попапов
  function togglePopup(popup) {
    popup.classList.toggle('popup_is-opened');
  }

  function openPopupResponse(e) {
    console.log(e);
    e.preventDefault();
    console.log(e);
    console.log(popupRes);
    togglePopup(popupReg);
    togglePopup(popupRes);
  }

  //добавляет/убирает класс header__menu_is-visible для мобильного меню
  function toggleMenuMobile() {
    menuMobile.classList.toggle('header__menu_is-visible')
  }

  //скрывает/показывает кнопку openMenu
  function toggleButtonOpenMenu() {
    buttonOpenMenu.classList.toggle('button-icon_is-invisible');
  }

  //скрывает/показывает кнопку closeMenu
  function toggleButtonCloseMenu() {
    buttonCloseMenu.classList.toggle('button-icon_is-invisible');
  }

  //открывает/закрывает мобильное меню
  function toggleMenuMobileBurger() {
    toggleOverflow();
    toggleButtonOpenMenu();
    toggleButtonCloseMenu();
    togglePopup(overlay);
    toggleMenuMobile();
  }

  //открытие попапа Авторизации по кнопке в мобильном меню
  function openLoginPopup() {
    if (!body.classList.contains('body_overflow_hidden')) {
      toggleOverflow();
      toggleButtonOpenMenu();
    }
    if (menuMobile.classList.contains('header__menu_is-visible')) {
      toggleMenuMobile();
      toggleButtonCloseMenu();
      togglePopup(overlay);
    }
    togglePopup(menuMobile);
    togglePopup(popupLogin);
  }

  //выбор попапа по ссылке в нутри попапа
  function choicePopup() {
    togglePopup(popupLogin);
    togglePopup(popupReg);
  }

  //закрытие попапов
  function closePopup(e) {
    console.log(e)
    if (buttonOpenMenu.classList.contains('button-icon_is-invisible')) {
      toggleButtonOpenMenu();
    }
    toggleOverflow();
    e.target.closest('.popup').classList.toggle('popup_is-opened');
  }



  buttonOpenMenu.addEventListener('click', toggleMenuMobileBurger);
  buttonCloseMenu.addEventListener('click', toggleMenuMobileBurger);
  buttonOpenLogitPopup.addEventListener('click', openLoginPopup);
  linkOpenRegPopup.addEventListener('click', choicePopup);
  linkOpenLoginPopup.addEventListener('click', choicePopup);
  formReg.addEventListener('submit', (e) => openPopupResponse(e));
  [...closeButtons].forEach(closeButton => {
    closeButton.addEventListener('click', (e) => closePopup(e));
  });
})();