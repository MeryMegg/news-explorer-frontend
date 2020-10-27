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

/* -- ЭКЗЕМПЛЯРЫ КЛАССОВ -- */
//MainApi
export const instanceMainApi = new MainApi(myServerConfig);
//NewsApi
export const instanceNewsApi = new NewsApi(newsServerConfig);
//Header
export const instanceHeader = new Header({ popupLogin, buttonOpenLoginPopup, buttonLogout, itemsAuth, itemUnauth, buttonOpenMenu, openOverlay, logout });
//Overlay
export const instancePopup = new Popup({ body, overlay, showButtonOpenMenu, hideButtonOpenMenu, buttonOpenMenu, closeMenuMobile, isOpenMenuMobile, removeContentPopupListeners });
//Form
export const instanceForm = new Form(popupReg);
//UserInfo
export const instanceUserInfo = new UserInfo();
//PopupContent
export const instancePopupContent = new PopupContent(popupReg, popupLogin, closeOverlay, choicePopup, formInputHandler, formSubmitHandler)
//FormValidator
export const instanceFormValidation = new FormValidation(errorMessages, enableSearchInputs);
export const instanceMenuMobile = new MenuMobile({ menuMobile, buttonOpenMenu, buttonCloseMenu, openOverlay, closeOverlay })
//class NewsCardList
export const instanceNewsCardList = new NewsCardList({ newsCardList, createNewsArticle });
//class NewsCard
export function createInstanceNewsCard() {
  const instanceNewsCard = new NewsCard({ placeholderUrl, newsCardMarkup, tooltipMessages, getUserId, saveArticle });
  return instanceNewsCard;
}
//class ResultSearch
export const instanceResultSearch = new ResultSearch({ blockSearchContent, buttonMore })