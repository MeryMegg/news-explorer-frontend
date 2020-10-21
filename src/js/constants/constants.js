export const body = document.querySelector('.body');
export const overlay = document.querySelector('#overlay'); //оверлей

/* -- header -- */
export const buttonOpenMenu = document.querySelector('#openMenu'); //кнопка для открытия мобильного меню
export const buttonCloseMenu = document.querySelector('#closeMenu'); //кнопка для закрытия мобильного меню
export const menuMobile = document.querySelector('.header__menu'); //мобильное меню
export const buttonOpenLoginPopup = document.querySelector('#openLoginPopup'); //кнопка открытия попапа с формой входа
export const buttonLogout = document.querySelector('#logout'); //кнопка выхода из системы
export const itemsAuth = document.querySelectorAll('.list__item_auth'); //пункты меню для авторизированных пользователей
export const itemUnauth = document.querySelector('.list__item_unauth'); //пункты меню для неавторизированных пользователей
/*logo*/

/*мобильное меню*/


/* -- попап с формой входа -- */
export const popupLogin = document.querySelector('#form-login-template').content.querySelector(".popup__content"); //окно с контентом
export const formLogin = popupLogin.querySelector('.popup__form');
export const closeButtonPopupLogin = popupLogin.querySelector('.popup__close');
export const linkPopupLogin = popupLogin.querySelector('.popup__link');
export const inputsFormLogin = popupLogin.querySelectorAll('.form__input');
export const buttonFormLogin = popupLogin.querySelectorAll('.popup__button');



/* -- попап с формой регистрации -- */
export const popupReg = document.querySelector('#form-reg-template').content.querySelector(".popup__content"); //окно с контентом
export const formReg = popupReg.querySelector('.form');
export const closeButtonPopupReg = popupReg.querySelector('.popup__close');
export const linkPopupReg = popupReg.querySelector('.popup__link');
export const inputsFormReg = popupReg.querySelectorAll('.form__input');
export const buttonFormReg = popupReg.querySelectorAll('.popup__button');

/* -- попап с сообщением об успешной регистрации -- */
export const popupRes = document.querySelector('#form-response-template').content.querySelector(".popup__content"); //окно с контентом
export const closeButtonPopupRes = popupRes.querySelector('.popup__close');
export const linkPopupRes = popupRes.querySelector('.popup__link');

/* -- все попапы -- */
//export const closeButtons = document.querySelectorAll('.popup__close'); //кнопка закрытия всех попапов

/* -- блоки из секции resurse-search -- */
export const preloader = document.querySelector('.result-search__preloader');