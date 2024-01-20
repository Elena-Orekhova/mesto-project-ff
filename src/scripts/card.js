import { addLikeCard, removeLikeCard, fetchCardDelete } from "./api";
import { openModal, closeModal } from "./modal";

// заполнение карточки
const createCard = (card, userId, openImagePopup) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardTitleElement.textContent = card.name;
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;

  const likes = card.likes;

  // Функция, проверяющая, есть ли ваш идентификатор в массиве лайков карточки
  const isCurrentUserLiked = likes.some((like) => like._id === userId);
  if (isCurrentUserLiked) {
    updateCardView(cardElement, isCurrentUserLiked, likes.length);
  }

  deleteButton.addEventListener("click", () =>
    removeCard(card._id, cardElement)
  );

  cardLikeButton.addEventListener("click", () => {
    toggleLikeCard(card._id, cardElement);
    updateCardView(
      cardElement,
      !cardLikeButton.classList.contains("card__like-button_is-active"),
      card.likes.length
    );
  });

  cardImage.addEventListener("click", () => openImagePopup(card));
  return cardElement;
};

// удаление карточки
const removeCard = (cardId, cardElement) => {
  const popupDeleteCard = document.querySelector(".popup_type_card-delete");
  const popupDeleteCardElement =
    popupDeleteCard.querySelector(".popup__button");

  openModal(popupDeleteCard);
  popupDeleteCardElement.addEventListener("click", () => {
    fetchCardDelete(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(popupDeleteCard);
      })
      .catch((error) => {
        console.error("Произошла ошибка при удалении карточки:", err);
        throw error;
      });
  });
};

// поставить/снять лайк
const toggleLikeCard = (cardId, cardElement) => {
  const isLiked = cardElement
    .querySelector(".card__like-button")
    .classList.contains("card__like-button_is-active");
  if (isLiked) {
    removeLikeCard(cardId)
      .then((updatedCard) => {
        updateCardView(cardElement, false, updatedCard.likes.length);
      })
      .catch((error) => {
        console.error("Произошла ошибка при снятии лайка:", error);
      });
  } else {
    addLikeCard(cardId)
      .then((updatedCard) => {
        updateCardView(cardElement, true, updatedCard.likes.length);
      })
      .catch((error) => {
        console.error("Произошла ошибка при постановке лайка:", error);
      });
  }
};

// обновление визуального представления карточки после изменения состояния лайка
const updateCardView = (cardElement, isLiked, likesCount) => {
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(
    ".card__like-button_counter"
  );

  cardLikeButton.classList.toggle("card__like-button_is-active", isLiked);
  cardLikeCounter.textContent = likesCount;
};

export { createCard };
