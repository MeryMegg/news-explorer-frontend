import BaseComponent from './BaseComponent';

export default class Card extends BaseComponent {
  constructor(card, config, createPopupImage, instanceApi, cardTemplate) {
    super();
    this._card = card;
    this._config = config;
    this._createPopupImage = createPopupImage;
    this._instanceApi = instanceApi;
    this._template = cardTemplate;

    this._isLiked = this._isLiked.bind(this);
  }

  createPlaceCard() {
    this._view = this._template.cloneNode(true);
    this._view.querySelector(".place-card__name").textContent = this._card.name;
    this._view.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this._card.link})`;
    if (this._isLikedMe()) {
      this._view
        .querySelector(".place-card__like-icon")
        .classList.add("place-card__like-icon_liked");
    }
    if (this._isRemovable()) {
      this._view.querySelector(".place-card__delete-icon").style.display =
        "block";
    }
    this._view.querySelector(
      ".place-card__like-count"
    ).textContent = this._card.likes.length;
    this.cardElement = this._view;
    this._setEventListeners();
    return this.cardElement;
  }

  _isLikedMe() {
    return this._card.likes.some((elem) => elem._id === this._config.myId);
  }

  _isRemovable() {
    return this._card.owner._id === this._config.myId;
  }

  _setEventListeners() {
    this.cardElement
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this._isLiked);
    this.cardElement
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this._confirmDelete);
    this.cardElement
      .querySelector(".place-card__image")
      .addEventListener("click", this._openPopupImage);
  }

  _isLiked(event) {
    if (event.target.classList.contains("place-card__like-icon_liked")) {
      this._dislike(event);
    } else this._like(event);
  }

  _like(event) {
    this._instanceApi
      .putLike(this._card._id)
      .then(() => {
        this._toggleLike(event);
        this._view.querySelector(".place-card__like-count").textContent =
          this._card.likes.length + 1;
      })
      .catch((err) => {
        console.log(err);
        alert("Что-то пошло не так... Повторите попытку...");
      });
  }

  _dislike(event) {
    this._instanceApi
      .deleteLike(this._card._id)
      .then(() => {
        this._toggleLike(event);
        this._view.querySelector(".place-card__like-count").textContent =
          this._card.likes.length - 1;
      })
      .catch((err) => {
        console.log(err);
        alert("Что-то пошло не так... Повторите попытку...");
      });
  }

  _toggleLike(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  _openPopupImage = (event) => {
    const url = event.target.style.backgroundImage.slice(5, -2);
    this._createPopupImage(url);
  };

  _confirmDelete = (event) => {
    event.stopPropagation();
    if (confirm("Вы действительно хотите удалить эту карточку?")) {
      this.deleteUserCard(this._card._id);
    }
  };

  deleteUserCard = (id) => {
    this._instanceApi
      .deleteCard(id)
      .then(() => {
        this.remove();
      })
      .catch((err) => {
        console.log(err);
        alert("Что-то пошло не так... Повторите попытку...");
      });
  };

  remove = () => {
    this._removeEventListeners();
    this.cardElement.remove();
  };

  _removeEventListeners() {
    this.cardElement
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this._isLiked); // Можно лучше: this._isLiked +++
    this.cardElement
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this._confirmDelete);
    this.cardElement
      .querySelector(".place-card__image")
      .removeEventListener("click", this._openPopupImage);
  }
}
