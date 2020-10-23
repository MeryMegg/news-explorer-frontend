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
import { errorMessages } from "./js/constants/messages";

import MainApi from "./js/api/MainApi";
import Header from "./js/components/Header";
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import UserInfo from './js/components/UserInfo';
import FormValidation from './js/components/FormValidation';
import PopupContent from './js/components/PopupContent';


(function () {
  /* -- функции -- */
  //открытие формы авторизации из хедера
  function openLoginPopup() {
    popup.open(popupContent.createContent(popupLogin));
  }
  //открытие мобильного меню
  function openMenuMobile() {
    console.log('меня открыли');
  }
  //закрытие всех попапов по крестику
  function closePopup() {
    popup.close();
  }
  //переключение форм по ссылке в попапе
  function choicePopup(content) {
    popup.choicePopup(content);
  }

  //вызывает обработчик инпутов формы в экземпляре класса formValidation
  function formInputHandler(event) {
    console.log(event.target)
    formValidation.inputHandler(event);
  }

  //вызывает обработчик отправки формы в экземпляре класса form
  function formSubmitHandler(event) {
    event.preventDefault();
    const activeForm = event.target;
    sendData(activeForm, form.submitHandler(activeForm));
  }

  function sendData(activeForm, data) {
    switch (true) {
      case activeForm.name === "formLogin":
        authUser(data);
        break;
      case activeForm.name === "formReg":
        regUser(data);
        break;
      case activeForm.name === "formSearch":
        console.log(data)
        break;
    }
  }


  function authUser(data) {
    mainApi.signIn(data)
      .then((res) => {
        console.log(res)
        userInfo.setUserInfo(res);
        form.setErrorMessage();
        closePopup();
        console.log(userInfo.getButtonName())
        header.render(userInfo.getButtonName());
      })
      .catch((err) => {
        err.json().then(res => form.setErrorMessage(res.message))
        form.enableInputs();
      })
  };

  function regUser(data) {
    mainApi.signUp(data)
      .then((res) => {
        console.log(res)
        userInfo.setUserInfo(res);
        header.render(userInfo.getButtonName());
        console.log(popupContent.createContent(popupRes))
        choicePopup(popupContent.createContent(popupRes));
      })
      .catch((err) => {
        console.log(err)
        err.json().then(res => form.setErrorMessage(res.message))
        form.enableInputs();
      })
  };


  function logout() {
    mainApi.signOut()
      .then((res) => {
        console.log(res)
        userInfo.setUserInfo();
        header.logoutRendered();
      })
      .catch((err) =>
        err.json().then(res => console.log(res.message))
      );
  }

  //вызывает методы классов FormAddCard или FormEditProfile для снятия слушателей при закрытии popup по крестику
  // const removeContentPopupListeners = (form) => {
  //   if (form.name === "formLogin") {
  //     formAuth.removeEventListeners();
  //   }
  //   if (form.name === "formReg") {
  //     formReg.removeEventListeners();
  //   }
  //   if (form.name === "formRes") {
  //     instanceFormAvatar.removeEventListeners();
  //     return
  //   }
  //   formValidation.removeEventListeners(form);
  // };

  //Preloader
  const renderLoading = (isLoading) => {
    if (isLoading) {
      preloader.classList.add('result-search__preloader_is-invisible');
    } else {
      preloader.classList.remove('result-search__preloader_is-invisible');
    }
  };

  /* -- Создание экземпляров классов -- */
  //MainApi
  const mainApi = new MainApi(myServerConfig);
  //Header
  const header = new Header({ buttonOpenLoginPopup, buttonLogout, itemsAuth, itemUnauth, buttonOpenMenu, openLoginPopup, openMenuMobile, logout });
  //Overlay
  const popup = new Popup({ body, overlay });
  //Form
  const form = new Form(popupReg);
  //UserInfo
  const userInfo = new UserInfo();
  //PopupContent
  const popupContent = new PopupContent(popupReg, popupLogin, closePopup, choicePopup, formInputHandler, formSubmitHandler)
  //FormValidator для форм в poppup
  const formValidation = new FormValidation();

  /* -- слушатели -- */
  serchForm.addEventListener("submit", formSubmitHandler);
  searchInput.addEventListener('input', formInputHandler);


  //запрос данные пользователя
  mainApi.getUserData()
    .then((res) => {
      userInfo.setUserInfo(res);
      header.render(userInfo.getButtonName());
    })
    .catch((err) => {
      if (err.status === 401) {
        header.render();
        err.json().then(res => console.log(res.message))
      }
    });
})();