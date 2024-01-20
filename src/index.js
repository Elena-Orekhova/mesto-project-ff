import "./pages/index.css";
import { createCard } from "./scripts/card";
import { closeModal, openModal, closeOnOverlay } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import {  addLikeCard,
  fetchsaveAvatar,
  fetchsaveProfile,
  fetchAddNewCard,
  userPromise,
  cardsPromise,
} from "./scripts/api";

//глобальные переменные
const cardsContainer = document.querySelector(".places__list");
const profileAvatarElement = document.querySelector(".profile__image");
const profileNameElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const popupNewCard = document.querySelector(".popup_type_new-card");
const addButtonProfile = document.querySelector(".profile__add-button");
const nameInput = document.forms["edit-profile"]["name"];
const descriptionInput = document.forms["edit-profile"]["description"];
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const popupAvatarProfile = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar = popupAvatarProfile.querySelector(".popup__form");
const avatarInput = document.forms["edit-profile-avatar"]["link"];

// при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const popupElements = document.querySelectorAll(".popup");

  popupElements.forEach(function (popupElement) {
    popupElement.classList.add("popup_is-animated");
    popupElement.addEventListener("mousedown", closeOnOverlay);
    enableValidation(validationConfig);
  });
});

// Загрузка данных пользователя и карточек
Promise.all([userPromise(), cardsPromise()])
  .then(([userData, cardsData]) => {
    // данные пользователя
    profileAvatarElement.style.backgroundImage = `url('${userData.avatar}')`;
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;

    // Отображение карточек
    cardsData.forEach((card) => {
      const cardElement = createCard(card, userData._id, openImagePopup);

      // Проверка, является ли текущий пользователь владельцем карточки
      if (card.owner._id !== userData._id) {
        const deleteButtonElement = cardElement.querySelector(
          ".card__delete-button"
        );
        deleteButtonElement.style.backgroundImage = "none";
      }
      cardsContainer.append(cardElement);
    });
  })
  .catch((error) => {
    console.log("Ошибка при загрузке данных:", error);
  });

// открыть попап редактировать аватар
profileAvatarElement.addEventListener("click", function () {
  fillFormAvatar();
  clearValidation(popupAvatarProfile, validationConfig);
  openModal(popupAvatarProfile);
});

// Редактирование аватара
function fillFormAvatar() {
  const profileAvatar = profileAvatarElement.textContent;

  avatarInput.value = profileAvatar;
}

//cохранить изменения в аватаре
function handleEditAvatar(evt) {
  evt.preventDefault();

  const newAvatar = avatarInput.value;

  profileAvatarElement.src = newAvatar;
  preservationButton(popupAvatarProfile);

  // сохранение на сервере аватара
  fetchsaveAvatar(newAvatar)
    .then((updatedUser) => {
      sucsesSave(popupAvatarProfile);
      profileAvatarElement.style.backgroundImage = `url('${updatedUser.avatar}')`;
    })
    .catch((error) => {
      console.error("Произошла ошибка при сохранении данных:", error);
    });
}

// открыть попап редактировать профиль
const editButtonProfile = document.querySelector(".profile__edit-button");

editButtonProfile.addEventListener("click", function () {
  fillFormProfile();
  clearValidation(popupEditProfile, validationConfig);
  openModal(popupEditProfile);
});

// Редактирование профиля
function fillFormProfile() {
  const profileName = profileNameElement.textContent;
  const profileDescription = profileDescriptionElement.textContent;

  nameInput.value = profileName;
  descriptionInput.value = profileDescription;
}

//cохранить изменения в профиле
function handleEditProfile(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  profileNameElement.textContent = newName;
  profileDescriptionElement.textContent = newDescription;
  preservationButton(popupEditProfile);

  // сохранение на сервере отредактированного профиля
  fetchsaveProfile(newName, newDescription)
    .then(() => {
      sucsesSave(popupEditProfile);
    })
    .catch((error) => {
      console.error("Произошла ошибка при сохранении данных:", error);
    });
}

// открыть попап "+"
addButtonProfile.addEventListener("click", function () {
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
  formNewCardElement.reset();
});

// Добавление новой карточки
const formNewCardElement = document.querySelector(
  '.popup__form[name="new-place"]'
);

formEditProfile.addEventListener("submit", handleEditProfile);
formEditAvatar.addEventListener("submit", handleEditAvatar);
formNewCardElement.addEventListener("submit", handleNewCardSubmit);

const placeNameInput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = formNewCardElement.querySelector(".popup__input_type_url");

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const newCard = placeNameInput.value;
  const newLink = linkInput.value;

  preservationButton(popupNewCard);

  //Добавление новой карточки на сервер
  fetchAddNewCard(newCard, newLink)
    .then((newCardData) => {
      const cardElement = createCard(newCardData, addLikeCard, openImagePopup);
      sucsesSave(popupNewCard);
      cardsContainer.prepend(cardElement);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
}

// открыть попап "открыть картинку"
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

function openImagePopup(card) {
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.caption;
  imagePopupCaption.textContent = card.caption;
  openModal(imagePopup);
}

//поведение кнопок при сохранении данных
//сохранение...
const preservationButton = (popup) => {
  const popupButton = popup.querySelector(".popup__button");
  popupButton.textContent = "Сохранение...";
};

//сохранить
const saveButton = (popup) => {
  const popupButton = popup.querySelector(".popup__button");
  popupButton.textContent = "Сохранить";
};

//процесс сохранения
const sucsesSave = (popup) => {
  closeModal(popup);
  saveButton(popup);
};

// валидация формы
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
