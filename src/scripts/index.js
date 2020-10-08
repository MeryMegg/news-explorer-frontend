import '../styles/index.css';

(function () {

  const body = document.querySelector('.body');
  const buttonOpenMenu = document.querySelector('#openMenu');
  const buttonCloseMenu = document.querySelector('#closeMenu');
  const menuMobile = document.querySelector('.header__popup');
  const popupLogin = document.querySelector('#popupLogin');
  const popupReg = document.querySelector('#popupReg');
  const buttonOpenLogitPopup = document.querySelector('#openLoginPopup');
  const linkOpenLoginPopup = document.querySelector('#buttonChoiceLogin');
  const linkOpenRegPopup = document.querySelector('#buttonChoiceReg');
  const closeButtons = document.querySelectorAll('.popup__close');

  console.log(closeButtons)

  // убирает/восстанавливает скролл на странице
  function toggleOverflow() {
    body.classList.toggle('body_overflow_hidden');
  }

  //добавляет/убирает класс для попапов
  function togglePopup(popup) {
    popup.classList.toggle('popup_is-opened');
  }

  //скрывает/показывает кнопку burger
  function toggleButtonOpenMenu() {
    buttonOpenMenu.classList.toggle('button-icon_invisible');
  }

  //открывает/закрывает мобильное меню
  function toggleMenuMobileBurger() {
    toggleOverflow();
    toggleButtonOpenMenu();
    togglePopup(menuMobile);
  }

  //открытие попапа Авторизации по кнопке в мобильном меню
  function openLoginPopup() {
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
    toggleOverflow()
    toggleButtonOpenMenu();
    e.target.closest('.popup').classList.toggle('popup_is-opened');
  }



  buttonOpenMenu.addEventListener('click', toggleMenuMobileBurger);
  buttonCloseMenu.addEventListener('click', toggleMenuMobileBurger);
  buttonOpenLogitPopup.addEventListener('click', openLoginPopup);
  linkOpenRegPopup.addEventListener('click', choicePopup);
  linkOpenLoginPopup.addEventListener('click', choicePopup);
  [...closeButtons].forEach(closeButton => {
    closeButton.addEventListener('click', (e) => closePopup(e));
  });
})();