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


/*форма поиска статей*/
export const serchForm = document.querySelector('.search__form');
export const searchInput = document.querySelector('.search__input');
export const serchButton = document.querySelector('#searchNews');

/* -- попап с формой входа -- */
export const popupLogin = document.querySelector('#form-login-template').content.querySelector(".popup__content"); //окно с контентом

/* -- попап с формой регистрации -- */
export const popupReg = document.querySelector('#form-reg-template').content.querySelector(".popup__content"); //окно с контентом

/* -- попап с сообщением об успешной регистрации -- */
export const popupRes = document.querySelector('#form-response-template').content.querySelector(".popup__content"); //окно с контентом

/* -- попап с сообщением об успешной регистрации -- */
export const newsCardMarkup = document.querySelector('#card-template'); //окно с контентом

/* -- блоки из секции resurse-search -- */
export const blockSearchContent = document.querySelector('.result-search__block_type_content');
export const buttonMore = document.querySelector('.result-search__button');
export const newsCardList = document.querySelector('.result-search__article-list');
export const preloader = document.querySelector('.result-search__block_type_preloader');
export const blockNotFound = document.querySelector('.result-search__block_type_not-found');
export const blockError = document.querySelector('.result-search__block_type_error');