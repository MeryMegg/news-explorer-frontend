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
export const logo = document.querySelector('.logo');

/*форма поиска статей*/
export const serchForm = document.querySelector('.search__form');
export const searchInput = document.querySelector('.search__input');
export const serchButton = document.querySelector('#searchNews');

/* -- попап с формой входа -- */
export const popupLogin = document.querySelector('#form-login-template'); //окно с контентом

/* -- попап с формой регистрации -- */
export const popupReg = document.querySelector('#form-reg-template'); //окно с контентом

/* -- попап с сообщением об успешной регистрации -- */
export const popupRes = document.querySelector('#form-response-template'); //окно с контентом

/* -- разметка карточки -- */
export const newsCardMarkup = document.querySelector('#card-template'); //окно с контентом

/* -- блоки из секции resurse-search -- */
export const blockSearchContent = document.querySelector('.result-search__block_type_content'); //блок с результатами поиска для главной страницы
export const buttonMore = document.querySelector('.result-search__button'); //Кнопка "Показать еще"
export const newsCardList = document.querySelector('.article-list'); //Контейнер для карточек на первой странице
export const preloader = document.querySelector('.result-search__block_type_preloader'); //Блок с прелоадером
export const blockNotFound = document.querySelector('.result-search__block_type_not-found'); // Блок Not-Found
export const blockError = document.querySelector('.result-search__block_type_error'); //Блок с ошибкой

/* -- блоки Title -- */
export const title = document.querySelector('.title-block__title');
export const listKeyWords = document.querySelector('.title-block__keyword');
export const titelBlockKeyWords = document.querySelector('.title-block__keywords');