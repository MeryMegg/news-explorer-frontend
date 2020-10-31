import './styles/index.css';
import { newsServerConfig, myServerConfig } from "./js/constants/config";
import { placeholderUrl, numberOfArticles } from './js/constants/constants';
import { errorMessages } from "./js/constants/messages";
import {
  body, overlay, buttonOpenMenu, buttonCloseMenu,
  menuMobile, buttonOpenLoginPopup,
  buttonLogout, itemsAuth, itemUnauth,
  serchForm, searchInput, popupLogin,
  popupReg, popupRes, preloader, newsCardMarkup,
  newsCardList, blockSearchContent, buttonMore,
  blockNotFound, blockError
} from "./js/constants/dom-elements";

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
      activateButton(cardsArticle);
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
    if (!blockSearchContent.classList.contains('result-search__block_is-invisible')) {
      instanceResultSearch.removeEventListenerOnBlock();
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
    return instanceNewsCard.createCardForMainPage(dataCard);
  }

  //сохранить статью в избранных
  function saveArticleData(event) {
    instanceNewsCard.isSaved(event);
  }

  //вызывает метод класса NewsCard активирующий кнопку сохранения статьи
  function activateButton(cards) {
    instanceResultSearch.setEventListenerOnBlock();
    cards.forEach((card) => instanceNewsCard.hideTooltip(card));
  }

  //отрисовка карточек
  function renderArticles(articles, keyWord) {
    instanceResultSearch.renderResultSearch(articles, keyWord);
    instanceNewsCardList.render(instanceResultSearch.getBlockArticles());
  }

  //отрисовка по 3 карточки
  function renderNextArticles() {
    instanceNewsCardList.render(instanceResultSearch.getBlockArticles());
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
  const instanceForm = new Form({ popupReg, popupLogin, closeOverlay, choicePopup, formInputHandler, formSubmitHandler });
  //UserInfo
  const instanceUserInfo = new UserInfo();
  //PopupContent
  const instancePopupContent = new PopupContent({ popupReg, popupLogin, closeOverlay, choicePopup, formInputHandler, formSubmitHandler });
  //FormValidator
  const instanceFormValidation = new FormValidation(errorMessages, enableSearchInputs);
  //MenuMobile
  const instanceMenuMobile = new MenuMobile({ menuMobile, buttonOpenMenu, buttonCloseMenu, openOverlay, closeOverlay });
  //class NewsCardList
  const instanceNewsCardList = new NewsCardList({ newsCardList, getUserId, createNewsArticle, removeEventListener });
  //class ResultSearch
  const instanceResultSearch = new ResultSearch({ blockSearchContent, blockNotFound, blockError, buttonMore, numberOfArticles, saveArticleData, clearNewsCardList, renderNextArticles, getUserId });
  //class NewsCard
  const instanceNewsCard = new NewsCard({ placeholderUrl, newsCardMarkup, getUserId, saveArticle, revomeArticleData });

  /* *************************************************** ЗАПРОСЫ *************************************************************************** */
  //регистрация пользователя
  function regUser(data) {
    instanceMainApi.signUp(data)
      .then((res) => {
        choicePopup(instancePopupContent.createContent(popupRes));
      })
      .catch((err) => {
        console.log(err)
        instanceForm.setErrorMessage(err.message);
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
        instanceForm.setErrorMessage(err.message)
      })
      .finally(() => instanceForm.enableInputs())
  };

  //данные пользователя / проверка авторизации
  function isAuth() {
    instanceMainApi.getUserData()
      .then((res) => {
        renderPage(res);
      })
      .catch((err) => {
        instanceHeader.render();
      })
      .finally(() => setEventListeners());
  }

  //сохранение статьи
  function saveArticle(data, article) {
    instanceMainApi.createArticle(data)
      .then((res) => {
        instanceNewsCard.updateDataCard(article, res._id);
      })
      .catch((err) => alert(err.message))
  }

  function revomeArticleData(articleId, article) {
    instanceMainApi.removeArticle(articleId)
      .then(() => {
        instanceNewsCard.updateDataCard(article);
      })
      .catch((err) => alert(err.message))
  }

  // выход из системы
  function logout() {
    instanceMainApi.signOut()
      .then(() => {
        renderUnauthPage();
      })
      .catch((err) => alert(err.message));
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
        renderArticles(res.articles, keyWord);
      })
      .catch((err) => {
        instanceResultSearch.show(blockError)
      })
      .finally(() => {
        renderLoading(false);
        enableSearchInputs();
        instanceForm.clearForm(serchForm);
      })
  }

  isAuth();
})();