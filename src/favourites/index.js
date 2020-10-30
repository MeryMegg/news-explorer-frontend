import '../styles/favourites.css';
import { myServerConfig } from "../js/constants/config";
import { placeholderUrl, numberOfArticles, declinableWords, declinableendings, numberOfKeyWords, nunberOrItem } from '../js/constants/constants';
import {
  body, overlay, buttonOpenMenu, buttonCloseMenu,
  menuMobile, buttonLogout, logo,
  preloader, newsCardMarkup, newsCardList,
  blockSearchContent, blockNotFound, blockError,
  title, listKeyWords, titelBlockKeyWords
} from "../js/constants/dom-elements";

import MainApi from "../js/api/MainApi";
import Header from "../js/components/Header";
import Popup from '../js/components/Popup';
import UserInfo from '../js/components/UserInfo';
import MenuMobile from '../js/components/MenuMobile';
import NewsCardList from '../js/components/NewsCardList';
import NewsCard from '../js/components/NewsCard';
import ResultSearch from '../js/components/ResultSearch';
import Title from '../js/components/Title';

(function () {
  /* ************************************************** ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ  *********************************************************/
  /* -------------------------------------------------- Page, Auth & Unauth ------------------------------------------------------------ */
  //настраивает страницу при первом входе
  function renderPage(data) {
    setEventListener();
    instanceUserInfo.setUserInfo(data);
    instanceHeader.setNameButton(getUserName());
  }

  function setEventListener() {
    instanceMenuMobile.setEventListener(buttonOpenMenu);
    instanceHeader.setEventListener(buttonLogout);
  }

  //почучить Id пользователя
  function getUserId() {
    return instanceUserInfo.getUserData().userId;
  }

  //почучить Имя пользователя
  function getUserName() {
    return instanceUserInfo.getUserData().name;
  }

  /* ----------------------------------------------- overlay, popups menumobile ---------------------------------------------------------- */
  function openOverlay() {
    instancePopup.open();
  }

  //закрытие всех попапов по крестику
  function closeOverlay() {
    instancePopup.close();
  }

  //вызывает функцию в классе MenuMobile показывающую кнопки открытия/закрытия меню
  function showButtonOpenMenu(button) {
    instanceMenuMobile.showButton(button);
  }
  //вызывает функцию в классе MenuMobile скрывающую кнопки открытия/закрытия меню
  function hideButtonOpenMenu(button) {
    instanceMenuMobile.hideButton(button)
  }

  //вызывает метод класса Form для снятия слушателей c контента
  function removeContentPopupListeners() {
    instancePopupContent.removeEventListeners();
  }

  //закрытие всех попапов по крестику
  function closeOverlay() {
    instanceMenuMobile.changeLogoColor();
    instancePopup.close();
  }

  /* -------------------------------------------------- NewsCardLis, NewsCard, ResultSearch ---------------------------------------------- */
  //обработка и отрисовка полученного с сервера массива карточек
  //отрисовка карточек
  function renderArticles(articles, keyWord) {
    instanceResultSearch.renderResultSearch(articles, keyWord);
    instanceNewsCardList.render(instanceResultSearch.getArticles());
  }

  //создание экземпляра новостной карточки
  function createNewsArticle(dataCard) {
    return instanceNewsCard.createCardForFavouritesPage(dataCard);
  }

  //удаление карточки
  function removeCard(event) {
    instanceNewsCard.removeArticleFromSaved(event);
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
  //Header
  const instanceHeader = new Header({ buttonLogout, buttonOpenMenu, openOverlay, logout });
  //Overlay
  const instancePopup = new Popup({ body, overlay, buttonOpenMenu, showButtonOpenMenu, hideButtonOpenMenu, removeContentPopupListeners });
  //UserInfo
  const instanceUserInfo = new UserInfo();
  //Title
  const instanceTitle = new Title({ title, listKeyWords, titelBlockKeyWords, declinableWords, declinableendings, numberOfKeyWords, nunberOrItem, getUserName });
  //MenuMobile
  const instanceMenuMobile = new MenuMobile({ menuMobile, buttonOpenMenu, buttonCloseMenu, logo, openOverlay, closeOverlay });
  //class NewsCardList
  const instanceNewsCardList = new NewsCardList({ newsCardList, getUserId, createNewsArticle, removeEventListener });
  //class ResultSearch
  const instanceResultSearch = new ResultSearch({ blockSearchContent, blockNotFound, blockError, numberOfArticles, getUserId, removeCard });
  //class NewsCard
  const instanceNewsCard = new NewsCard({ placeholderUrl, newsCardMarkup, getUserId, revomeArticleData });

  /* *************************************************** ЗАПРОСЫ *************************************************************************** */
  //данные пользователя / проверка авторизации
  function isAuth() {
    instanceMainApi.getUserData()
      .then((res) => {
        renderPage(res);
      })
      .catch(() => {
        return location = './';
      })
  }

  //получение статьи
  function getArticles() {
    renderLoading(true);
    instanceMainApi.getArticles()
      .then((res) => {
        instanceTitle.setUserInfo(res);
        renderArticles(res);
      })
      .catch(() => {
        instanceResultSearch.show(blockError);
      })
      .finally(() => {
        renderLoading(false);
      })
  }

  //удаление статьи
  function revomeArticleData(articleId, article) {
    if (confirm("Удалить cтатью?")) {
      instanceMainApi.removeArticle(articleId)
        .then(() => {
          instanceNewsCardList.removeCard(article);
        })
        .catch((err) => alert(err.message))
    }
  }

  // выход из системы
  function logout() {
    instanceMainApi.signOut()
      .then(() => {
        return location = './';
      })
      .catch(() => {
        return location = './';
      });
  }

  isAuth();
  getArticles();
})();