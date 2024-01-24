import "./pages/index.css";
import { createCard, removeCard, toggleLikeCard } from "./scripts/card";
import { closeModal, openModal, closeOnOverlay } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  fetchSaveAvatar,
  fetchSaveProfile,
  fetchAddNewCard,
  fetchUserInfo,
  fetchCardsInfo,
  fetchCardDelete,
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
const editButtonProfile = document.querySelector(".profile__edit-button");
const formNewCardElement = document.querySelector(
  '.popup__form[name="new-place"]'
);
const placeNameInput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = formNewCardElement.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const popupDeleteCard = document.querySelector(".popup_type_card-delete");
const popupDeleteSubmitButton = popupDeleteCard.querySelector(".popup__button");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Загрузка данных пользователя и карточек
Promise.all([fetchUserInfo(), fetchCardsInfo()])
  .then(([userData, cardsData]) => {
    // данные пользователя
    profileAvatarElement.style.backgroundImage = `url('${userData.avatar}')`;
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;

    // Отображение карточек
    cardsData.forEach((card) => {
      const cardElement = createCard(
        card,
        userData._id,
        openImagePopup,
        openDeleteConfirmationPopup,
        toggleLikeCard
      );
      cardsContainer.append(cardElement);
    });
  })
  .catch((error) => {
    console.log("Ошибка при загрузке данных:", error);
  });

//cохранить изменения в аватаре
function handleEditAvatar(evt) {
  evt.preventDefault();

  const newAvatar = avatarInput.value;

  setLoadingButtonText(popupAvatarProfile);

  // сохранение на сервере аватара
  fetchSaveAvatar(newAvatar)
    .then((updatedUser) => {
      closeModal(popupAvatarProfile);
      profileAvatarElement.style.backgroundImage = `url('${updatedUser.avatar}')`;
      formEditAvatar.reset();
      clearValidation(popupAvatarProfile, validationConfig);
    })
    .catch((error) => {
      console.error("Произошла ошибка при сохранении данных:", error);
    })
    .finally(() => {
      setDefaultButtonText(popupAvatarProfile);
    });
}

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

  setLoadingButtonText(popupEditProfile);

  // сохранение на сервере отредактированного профиля
  fetchSaveProfile(newName, newDescription)
    .then(() => {
      handleSuccessSave(popupEditProfile);
    })
    .then(() => {
      profileNameElement.textContent = newName;
      profileDescriptionElement.textContent = newDescription;
    })
    .catch((error) => {
      console.error("Произошла ошибка при сохранении данных:", error);
    });
}

// Добавление новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const newCard = placeNameInput.value;
  const newLink = linkInput.value;

  setLoadingButtonText(popupNewCard);

  //Добавление новой карточки на сервер
  fetchAddNewCard(newCard, newLink)
    .then((newCardData) => {
      const cardElement = createCard(
        newCardData,
        newCardData.owner._id,
        openImagePopup,
        openDeleteConfirmationPopup,
        toggleLikeCard
      );
      closeModal(popupNewCard);
      cardsContainer.prepend(cardElement);
      clearValidation(popupNewCard, validationConfig);
      formNewCardElement.reset();
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      setDefaultButtonText(popupNewCard);
    });
}

// Функция для обработки сабмита попапа подтверждения
let cardForDelete = {};
const handleDeleteConfirmation = () => {
  if (cardForDelete.id) {
    fetchCardDelete(cardForDelete.id)
      .then(() => {
        removeCard(cardForDelete.element);
        closeModal(popupDeleteCard);
      })
      .catch((error) => {
        console.error("Произошла ошибка при удалении карточки:", error);
      });
  }
};

// Функция для открытия попапа подтверждения удаления
const openDeleteConfirmationPopup = (cardId, cardElement) => {
  cardForDelete = { id: cardId, element: cardElement };
  openModal(popupDeleteCard);
};

// Устанавливаем обработчик сабмита попапа подтверждения
popupDeleteSubmitButton.addEventListener("click", handleDeleteConfirmation);

// открыть попап "открыть картинку"
function openImagePopup(card) {
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.name;
  imagePopupCaption.textContent = card.name;
  openModal(imagePopup);
}

//поведение кнопок при сохранении данных
//сохранение...
const setLoadingButtonText = (popup) => {
  const popupButton = popup.querySelector(".popup__button");
  popupButton.textContent = "Сохранение...";
};

//сохранить
const setDefaultButtonText = (popup) => {
  const popupButton = popup.querySelector(".popup__button");
  popupButton.textContent = "Сохранить";
};

//процесс сохранения
const handleSuccessSave = (popup) => {
  closeModal(popup);
  setDefaultButtonText(popup);
};

//закрыть МО на х
document.querySelectorAll(".popup__close").forEach((button) => {
  const buttonsPopup = button.closest(".popup");

  button.addEventListener("click", () => closeModal(buttonsPopup));
});

// при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const popupElements = document.querySelectorAll(".popup");
  enableValidation(validationConfig);
  popupElements.forEach(function (popupElement) {
    popupElement.classList.add("popup_is-animated");
    popupElement.addEventListener("mousedown", closeOnOverlay);
  });
});

// открыть попап редактировать аватар
profileAvatarElement.addEventListener("click", function () {
  openModal(popupAvatarProfile);
});

// открыть попап редактировать профиль
editButtonProfile.addEventListener("click", function () {
  fillFormProfile();
  clearValidation(popupEditProfile, validationConfig);
  openModal(popupEditProfile);
});

// открыть попап "+"
addButtonProfile.addEventListener("click", function () {
  openModal(popupNewCard);
});

// обработчики сохранения форм
formEditProfile.addEventListener("submit", handleEditProfile);
formEditAvatar.addEventListener("submit", handleEditAvatar);
formNewCardElement.addEventListener("submit", handleNewCardSubmit);
