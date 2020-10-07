import '../styles/index.css';

(function () {

  const body = document.querySelector('.body');
  const buttonOpenMenu = document.querySelector('#openMenu');
  const buttonCloseMenu = document.querySelector('#closeMenu');
  const menuMobile = document.querySelector('.header__popup');
  const popupLogin = document.querySelector('#popupLogin');
  const buttonOpenLogitPopup = document.querySelector('#openLoginPopup');

  function toggleOverflow() {
    body.classList.toggle('body_overflow_hidden');
  }

  function toggleMenuMobile() {
    toggleOverflow();
    menuMobile.classList.toggle('popup_is-opened');
  }

  function toggleOpenMenuButton() {
    toggleOverflow();
    buttonOpenMenu.classList.toggle('button-icon_invisible');
  }

  function toggleLoginPopup() {
    toggleOpenMenuButton();
    toggleMenuMobile();
    popupLogin.classList.toggle('popup_is-opened');
  }



  buttonOpenMenu.addEventListener('click', toggleMenuMobile);
  buttonCloseMenu.addEventListener('click', toggleMenuMobile);
  buttonOpenLogitPopup.addEventListener('click', toggleLoginPopup);


  console.log(buttonOpenMenu)
})();