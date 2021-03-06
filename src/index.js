import './styles/index.css';
import { newsServerConfig, myServerConfig } from "./js/constants/config"
import {
  body, overlay, buttonOpenMenu, buttonCloseMenu,
  menuMobile, buttonOpenLoginPopup,
  buttonLogout, itemsAuth, itemUnauth,
  serchForm, searchInput, serchButton,
  popupLogin, popupReg, popupRes,
  preloader
} from "./js/constants/constants";

import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/newsApi";
import Header from "./js/components/Header";
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import UserInfo from './js/components/UserInfo';
import FormValidation from './js/components/FormValidation';
import PopupContent from './js/components/PopupContent';
import Menu from './js/components/Menu';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';


(function () {
  /* -- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ  -- */
  //октрыть форму авторизации
  function openOverlay(template) {
    if (template) {
      const content = popupContent.createContent(template);
      if (isOpenMenuMobile()) {
        menu.close();
      }
      popup.open(content);
      return
    }
    popup.open();
  }

  //закрыть мобильное меню
  function closeMenuMobile() {
    menu.close();
  }

  //закрытие всех попапов по крестику
  function closeOverlay() {
    popup.close();
  }

  //переключение форм по ссылке в попапе
  function choicePopup(content) {
    popup.choicePopup(content);
  }

  //вызывает обработчик инпутов формы в экземпляре класса formValidation
  function formInputHandler(event) {
    formValidation.inputHandler(event);
  }

  //вызывает обработчик отправки формы в экземпляре класса form
  function formSubmitHandler(event) {
    event.preventDefault();
    const activeForm = event.target;
    sendData(activeForm, form.submitHandler(activeForm));
  }

  //вызывает функцию в классе Menu показывающую кнопки открытия/закрытия меню
  function showButtonOpenMenu(button) {
    menu.showButton(button);
  }
  //вызывает функцию в классе Menu скрывающую кнопки открытия/закрытия меню
  function hideButtonOpenMenu(button) {
    menu.hideButton(button)
  }

  //Проверяет открыто ли мобильное меню
  function isOpenMenuMobile() {
    return (menuMobile.classList.contains('header__menu_is-visible')) ? true : false;
  }

  //разблокировать инпуты формы поиска статей
  function enableSearchInputs() {
    form.enableInputs();
  }

  //настроить страницу под пользователя
  function renderAuthPage(data) {
    userInfo.setUserInfo(data);
    header.render(userInfo.getUserName());
  }

  //обезличить страницу
  function renderUnauthPage() {
    userInfo.setUserInfo();
    header.logoutRendered();
    menu.setEventListener(buttonOpenMenu);
    if (isOpenMenuMobile()) {
      menu.close();
    }
  };

  //вызывает метод класса Form для снятия слушателей c контента
  function removeContentPopupListeners() {
    popupContent.removeEventListeners();
  }

  //Preloader
  function renderLoading(isLoading) {
    isLoading ?
      preloader.classList.remove('result-search__preloader_is-invisible')
      : preloader.classList.add('result-search__preloader_is-invisible');
  };

  //роут
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

  /* -- ЭКЗЕМПЛЯРЫ КЛАССОВ -- */
  //MainApi
  const mainApi = new MainApi(myServerConfig);
  //NewsApi
  const newsApi = new NewsApi(newsServerConfig);
  //Header
  const header = new Header({ popupLogin, buttonOpenLoginPopup, buttonLogout, itemsAuth, itemUnauth, buttonOpenMenu, openOverlay, logout });
  //Overlay
  const popup = new Popup({ body, overlay, showButtonOpenMenu, hideButtonOpenMenu, buttonOpenMenu, closeMenuMobile, isOpenMenuMobile, removeContentPopupListeners });
  //Form
  const form = new Form(popupReg);
  //UserInfo
  const userInfo = new UserInfo();
  //PopupContent
  const popupContent = new PopupContent(popupReg, popupLogin, closeOverlay, choicePopup, formInputHandler, formSubmitHandler)
  //FormValidator
  const formValidation = new FormValidation(enableSearchInputs);
  const menu = new Menu({ menuMobile, buttonOpenMenu, buttonCloseMenu, openOverlay, closeOverlay })
  //class NewsCard
  const newsCard = ([...arg]) => new Card([...arg]);

  /* -- СЛУШАТЕЛИ -- */
  function setEventListeners() {
    serchForm.addEventListener("submit", formSubmitHandler);
    searchInput.addEventListener('input', formInputHandler);
    menu.setEventListener(buttonOpenMenu);
  }

  /* -- ЗАПРОСЫ -- */
  //регистрация пользователя
  function regUser(data) {
    mainApi.signUp(data)
      .then((res) => {
        choicePopup(popupContent.createContent(popupRes));
      })
      .catch((err) => {
        err.json().then(res => form.setErrorMessage(res.message))
      })
      .finally(() => form.enableInputs())
  };

  //авторизация пользователя
  function authUser(data) {
    mainApi.signIn(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        form.setErrorMessage();
        closeOverlay();
        header.render(userInfo.getUserName());
      })
      .catch((err) => {
        err.json().then(res => form.setErrorMessage(res.message))
        form.enableInputs();
      })
      .finally(() => form.enableInputs())
  };

  //данные пользователя
  mainApi.getUserData()
    .then((res) => {
      renderAuthPage(res);
    })
    .catch((err) => {
      if (err.status === 401) {
        header.render();
        err.json().then(res => console.log(res.message))
      }
    })
    .finally(() => setEventListeners());

  // выход из системы
  function logout() {
    mainApi.signOut()
      .then(() => {
        renderUnauthPage();
      })
      .catch((err) =>
        err.json().then(res => console.log(res.message))
      );
  }

  //поиск статей
  function searchNews(form, data) {
    const keyWord = formValidation.getValidateData(form, data)
    if (!keyWord) {
      console.log('Поле пустое');
      return;
    }
    renderLoading(true);
    newsApi.getArticles(keyWord)
      .then((res) => {
        console.log(res)
        // userInfo.setUserInfo(res);
        // header.render(userInfo.getUserName());
        // console.log(popupContent.createContent(popupRes))
        // choicePopup(popupContent.createContent(popupRes));
      })
      .catch((err) => {
        err.json().then(res => console.log(res.message))
      })
      .finally(() => {
        renderLoading(false);
        enableSearchInputs();
      })
  }
})();