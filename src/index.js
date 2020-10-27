import './styles/index.css';
import { newsServerConfig, myServerConfig, placeholderUrl, numberOfArticles } from "./js/constants/config";
import { errorMessages, tooltipMessages } from "./js/constants/messages";
import {
  body, overlay, buttonOpenMenu, buttonCloseMenu,
  menuMobile, buttonOpenLoginPopup,
  buttonLogout, itemsAuth, itemUnauth,
  serchForm, searchInput, serchButton,
  popupLogin, popupReg, popupRes,
  preloader, newsCardMarkup, newsCardList,
  blockSearchContent, buttonMore, blockNotFound,
  blockError
} from "./js/constants/constants";

import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/newsApi";
import Header from "./js/components/Header";
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import UserInfo from './js/components/UserInfo';
import FormValidation from './js/components/FormValidation';
import PopupContent from './js/components/PopupContent';
import MenuMobile from './js/components/MenuMobile';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';
import ResultSearch from './js/components/ResultSearch';

(function () {
  /* ************************************************** ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ  *********************************************************/
  /* -------------------------------------------------- Page, Auth & Unauth ------------------------------------------------------------ */
  //вешает слушатели при первом заходе на страницу
  function setEventListeners() {
    serchForm.addEventListener("submit", formSubmitHandler);
    searchInput.addEventListener('input', formInputHandler);
    instanceMenuMobile.setEventListener(buttonOpenMenu);
  }  

  //настраивает страницу при первом входе
  function renderPage(data) {
    instanceUserInfo.setUserInfo(data);
    instanceHeader.render(instanceUserInfo.getUserData().name);
  }

  //настроить страницу под пользователя
  function renderAuthPage(data) {
    instanceUserInfo.setUserInfo(data);
    instanceForm.setErrorMessage();
    closeOverlay();
    instanceHeader.render(instanceUserInfo.getUserData().name);
    if (!blockSearchContent.classList.contains('result-search__block_is-invisible')) {
      const cardsArticle = [...newsCardList.querySelectorAll('.article')];
      activateButton(cardsArticle)
    }
  }

  //почучить Id пользователя
  function getUserId() {
    return instanceUserInfo.getUserData().userId;
  }

  //обезличить страницу
  function renderUnauthPage() {
    instanceUserInfo.setUserInfo();
    instanceHeader.logoutRendered();
    if (isOpenMenuMobile()) {
      instanceMenuMobile.close();
    }
    instanceResultSearch.closeResultSearchBlocks();
  };

  /* ----------------------------------------------- overlay, popups menumobile ---------------------------------------------------------- */
  //октрыть форму авторизации
  function openOverlay(template) {
    if (template) {
      const content = instancePopupContent.createContent(template);
      if (isOpenMenuMobile()) {
        instanceMenuMobile.close();
      }
      instancePopup.open(content);
      return
    }
    instancePopup.open();
  }

  //закрыть мобильное меню
  function closeMenuMobile() {
    instanceMenuMobile.close();
  }

  //закрытие всех попапов по крестику
  function closeOverlay() {
    instancePopup.close();
  }

  //переключение форм по ссылке в попапе
  function choicePopup(content) {
    instancePopup.choicePopup(content);
  }

  //вызывает обработчик инпутов формы в экземпляре класса formValidation
  function formInputHandler(event) {
    instanceFormValidation.inputHandler(event);
  }

  //вызывает обработчик отправки формы в экземпляре класса form
  function formSubmitHandler(event) {
    event.preventDefault();
    const activeForm = event.target;
    sendData(activeForm, instanceForm.submitHandler(activeForm));
  }

  //вызывает функцию в классе MenuMobile показывающую кнопки открытия/закрытия меню
  function showButtonOpenMenu(button) {
    instanceMenuMobile.showButton(button);
  }
  //вызывает функцию в классе MenuMobile скрывающую кнопки открытия/закрытия меню
  function hideButtonOpenMenu(button) {
    instanceMenuMobile.hideButton(button)
  }

  //Проверяет открыто ли мобильное меню
  function isOpenMenuMobile() {
    return (menuMobile.classList.contains('header__menu_is-visible')) ? true : false;
  }

  //разблокировать инпуты формы поиска статей
  function enableSearchInputs() {
    instanceForm.enableInputs();
  }

  //вызывает метод класса Form для снятия слушателей c контента
  function removeContentPopupListeners() {
    instancePopupContent.removeEventListeners();
  }

  //distributor
  function sendData(activeForm, data) {
    switch (true) {
      case activeForm.name === "formLogin":
        authUser(data);
        break;
      case activeForm.name === "formReg":
        regUser(data);
        break;
      case activeForm.name === "formSearch":
        searchNews(activeForm, data);
        break;
    }
  }

  /* -------------------------------------------------- NewsCardLis, NewsCard, ResultSearch ---------------------------------------------- */

  //очистить newsCardList
  function clearNewsCardList() {
    instanceNewsCardList.clear();
  }

  //создание экземпляра новостной карточки
  function createNewsArticle(dataCard) {
    return createInstanceNewsCard().createCard(dataCard);
  }

  //вызывает метод класса NewsCard активирующий кнопку сохранения статьи
  function activateButton(cards) {
    const instanceNewsCard = createInstanceNewsCard();
    cards.forEach((card) => instanceNewsCard.activateButton(card));
  }

  function removeEventListener(article) {
    const icon = article.querySelector('.article__button-icon');
    createInstanceNewsCard()._removeEventListener(icon);
  }

  //отрисовка карточек
  function renderArticles(articles, keyWord) {
    instanceResultSearch.renderResultSearch(articles, keyWord);    
    instanceNewsCardList.render(instanceResultSearch.getArticles());    
  }  

  //отрисовка по 3 карточки
  function renderNextArticles() {    
    instanceNewsCardList.render(instanceResultSearch.getArticles());
    if (instanceResultSearch.getLengthArticles() === 0) {
      instanceResultSearch.hideButtonMore();
    }
  }  

  //Preloader
  function renderLoading(isLoading) {
    isLoading ?
      instanceResultSearch.show(preloader)
      : instanceResultSearch.hide(preloader);      
  };
  
  /* ***************************************************** ЭКЗЕМПЛЯРЫ КЛАССОВ *************************************************************** */
  //MainApi
  const instanceMainApi = new MainApi(myServerConfig);
  //NewsApi
  const instanceNewsApi = new NewsApi(newsServerConfig);
  //Header
  const instanceHeader = new Header({ popupLogin, buttonOpenLoginPopup, buttonLogout, itemsAuth, itemUnauth, buttonOpenMenu, openOverlay, logout });
  //Overlay
  const instancePopup = new Popup({ body, overlay, showButtonOpenMenu, hideButtonOpenMenu, buttonOpenMenu, closeMenuMobile, isOpenMenuMobile, removeContentPopupListeners });
  //Form
  const instanceForm = new Form(popupReg);
  //UserInfo
  const instanceUserInfo = new UserInfo();
  //PopupContent
  const instancePopupContent = new PopupContent(popupReg, popupLogin, closeOverlay, choicePopup, formInputHandler, formSubmitHandler);
  //FormValidator
  const instanceFormValidation = new FormValidation(errorMessages, enableSearchInputs);
  //MenuMobile
  const instanceMenuMobile = new MenuMobile({ menuMobile, buttonOpenMenu, buttonCloseMenu, openOverlay, closeOverlay });
  //class NewsCardList
  const instanceNewsCardList = new NewsCardList({ newsCardList, getUserId, createNewsArticle, removeEventListener });
  //class ResultSearch
  const instanceResultSearch = new ResultSearch({ blockSearchContent, blockNotFound, blockError, buttonMore, numberOfArticles, clearNewsCardList, renderNextArticles });
  //class NewsCard
  function createInstanceNewsCard() {
    const instanceNewsCard = new NewsCard({ placeholderUrl, newsCardMarkup, tooltipMessages, getUserId, saveArticle, revomeArticleData });
    return instanceNewsCard;
  };  

  /* -- ЗАПРОСЫ -- */
  //регистрация пользователя
  function regUser(data) {
    instanceMainApi.signUp(data)
      .then((res) => {
        choicePopup(instancePopupContent.createContent(popupRes));
      })
      .catch((err) => {
        err.json().then(res => instanceForm.setErrorMessage(res.message));
      })
      .finally(() => instanceForm.enableInputs());
  };

  //авторизация пользователя
  function authUser(data) {
    instanceMainApi.signIn(data)
      .then((res) => {
        renderAuthPage(res);
      })
      .catch((err) => {
        console.log(err)
        err.name === "ReferenceError" ? console.log(err) : err.json().then(res => instanceForm.setErrorMessage(res.message))
        //err.json().then(res => instanceForm.setErrorMessage(res.message))
        instanceForm.enableInputs();
      })
      .finally(() => instanceForm.enableInputs())
  };

  //данные пользователя
  instanceMainApi.getUserData()
    .then((res) => {
      renderPage(res);
    })
    .catch((err) => {
      if (err.status === 401) {
        instanceHeader.render();
        //err.json().then(res => console.log(res.message))
      }
      err.name === "ReferenceError" ? console.log(err) : err.json().then(res => console.log(res.message))
    })
    .finally(() => setEventListeners());

  //сохранение статьи
  function saveArticle(data, article) {
    instanceMainApi.createArticle(data)
      .then((res) => {        
        createInstanceNewsCard().updateDataCard(article, res._id);
      })
      .catch((err) => console.log(err)
        //err.name === "ReferenceError" ? console.log(err) : err.json().then(res => console.log(res.message))
      )
  }

  function revomeArticleData(articleId, article) {
    instanceMainApi.removeArticle(articleId)
    .then((res) => {        
        createInstanceNewsCard().updateDataCard(article);
      })
      .catch((err) => console.log(err)
        //err.name === "ReferenceError" ? console.log(err) : err.json().then(res => console.log(res.message))
      )
  }

  // выход из системы
  function logout() {
    instanceMainApi.signOut()
      .then(() => {
        renderUnauthPage();
      })
      .catch((err) => err.json().then(res => console.log(res.message))
      );
  }

  //поиск статей
  function searchNews(form, data) {
    const keyWord = instanceFormValidation.getValidateData(form, data)
    if (!keyWord) {
      return;
    }
    instanceResultSearch.closeResultSearchBlocks();
    renderLoading(true);        
    instanceNewsApi.getArticles(keyWord)
      .then((res) => {
        console.log(res.articles)
        renderArticles(res.articles, keyWord);        
      })
      .catch((err) => console.log(err)
        //err.name === "ReferenceError" ? console.log(err) : err.json().then(res => console.log(res.message))
      )
      .finally(() => {
        renderLoading(false);
        enableSearchInputs();
        instanceForm.clearForm(serchForm);
      })
  }
})();