import './styles/index.css';
import { newsServerConfig, myServerConfig } from "./js/constants/config"
import {
  body, overlay, menuMobile, buttonOpenLoginPopup,
  buttonLogout, itemsAuth, itemUnauth,
  buttonOpenMenu, buttonCloseMenu, popupLogin,
  popupReg, popupRes
} from "./js/constants/constants";
import { errorMessages } from "./js/constants/messages";

import MainApi from "./js/api/MainApi";
import Header from "./js/components/Header";
import Popup from './js/components/Popup';
import FormRegistration from './js/components/FormRegistration';
import FormValidation from './js/components/FormValidation';
import FormAuthorization from './js/components/FormAuthorization';


(function () {
  /* -- функции -- */
  function openLoginPopup() {
    console.log('меня нажали');
    popup.open(formAuth.createContent());
  }

  function openMenuMobile() {
    console.log('меня открыли');
  }

  function closePopup() {
    popup.close();
  }

  function choiceRegPopup() {
    popup.choicePopup(formReg.createContent());
  }

  function choiceLoginPopup() {
    popup.choicePopup(formAuth.createContent());
  }

  //вызывает метод класса FormValidator для добавления слушателей
  const setInputListener = (form) => {
    console.log(form)
    formValidation.setEventListeners(form);
  }

  function logout() {
    console.log('Выход из системы')
    header.logoutRendered();
  }

  //вызывает методы классов FormAddCard или FormEditProfile для снятия слушателей при закрытии popup по крестику
  const removeContentPopupListeners = (form) => {
    if (form.name === "formLogin") {
      formAuth.removeEventListeners();
    }
    if (form.name === "formReg") {
      formReg.removeEventListeners();
    }
    // if (form.name === "formR") {
    //   instanceFormAvatar.removeEventListeners();
    // }
    formValidation.removeEventListeners(form);
  };

  /* -- Создание экземпляров классов -- */
  //MainApi
  const mainApi = new MainApi(myServerConfig);

  //Header
  const header = new Header({ buttonOpenLoginPopup, buttonLogout, itemsAuth, itemUnauth, buttonOpenMenu, openLoginPopup, openMenuMobile, logout });

  //Overlay
  const popup = new Popup(body, overlay, removeContentPopupListeners);

  //FormAuthorization
  const formAuth = new FormAuthorization(popupLogin, setInputListener, closePopup, choiceRegPopup);

  //FormRegistration
  const formReg = new FormRegistration(popupReg, setInputListener, closePopup, choiceLoginPopup);

  //FormValidator
  const formValidation = new FormValidation(errorMessages);

  //запрос данные пользователя
  mainApi.getUserData()
    .then((res) => {
      header.render(res)
    })
    .catch((err) => {
      if (err.status === 401) {
        header.render();
        // buttonOpenLoginPopup.addEventListener('click', openLoginPopup);
      }
    });
})();