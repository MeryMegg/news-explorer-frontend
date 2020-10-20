import '../styles/favourites.css';

(function () {

  const body = document.querySelector('.body');
  const buttonOpenMenu = document.querySelector('#openMenu');
  const buttonCloseMenu = document.querySelector('#closeMenu');
  const overlay = document.querySelector('#overlay');
  const menuMobile = document.querySelector('.header__menu');
  const logo = document.querySelector('.logo');

  // убирает/восстанавливает скролл на странице
  function toggleOverflow() {
    body.classList.toggle('body_overflow_hidden');
  }

  // меняет цвет logo с черного на белый и обратно
  function toggleLogoColor() {
    logo.classList.toggle('logo_color_black');
  }

  //добавляет/убирает класс popup_is-opened для попапов
  function togglePopup(popup) {
    popup.classList.toggle('popup_is-opened');
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
    toggleLogoColor();
    togglePopup(overlay);
    toggleMenuMobile();
  }

  buttonOpenMenu.addEventListener('click', toggleMenuMobileBurger);
  buttonCloseMenu.addEventListener('click', toggleMenuMobileBurger);
})();