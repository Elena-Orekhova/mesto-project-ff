import { addLikeCard, removeLikeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

// заполнение карточки
const createCard = (
  card,
  userId,
  openImagePopup,
  openDeleteConfirmationPopup,
  toggleLikeCard
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const likes = card.likes;

  cardTitleElement.textContent = card.name;
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;

  // Проверка, есть ли ваш идентификатор в массиве лайков карточки
  const isCurrentUserLiked = likes.some((like) => like._id === userId);
  if (isCurrentUserLiked) {
    updateCardLikesView(cardElement, isCurrentUserLiked, likes.length);
  }

  // Проверка, является ли текущий пользователь владельцем карточки
  if (card.owner._id !== userId) {
    deleteButton.style.visibility = "hidden";
  } else {
    deleteButton.addEventListener("click", () =>
      openDeleteConfirmationPopup(card._id, cardElement)
    );
  }
  cardLikeButton.addEventListener("click", () => {
    toggleLikeCard(card._id, cardElement);
  });
  cardImageElement.addEventListener("click", () => openImagePopup(card));
  return cardElement;
};

// удаление карточки
const removeCard = (cardElement) => {
  cardElement.remove();
};

// поставить/снять лайк
const toggleLikeCard = (cardId, cardElement) => {
  const isLiked = cardElement
    .querySelector(".card__like-button")
    .classList.contains("card__like-button_is-active");
  if (isLiked) {
    removeLikeCard(cardId)
      .then((updatedCard) => {
        updateCardLikesView(cardElement, false, updatedCard.likes.length);
      })
      .catch((error) => {
        console.error("Произошла ошибка при снятии лайка:", error);
      });
  } else {
    addLikeCard(cardId)
      .then((updatedCard) => {
        updateCardLikesView(cardElement, true, updatedCard.likes.length);
      })
      .catch((error) => {
        console.error("Произошла ошибка при постановке лайка:", error);
      });
  }
};

// обновление визуального представления карточки после изменения состояния лайка
const updateCardLikesView = (cardElement, isLiked, likesCount) => {
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(
    ".card__like-button_counter"
  );

  cardLikeButton.classList.toggle("card__like-button_is-active", isLiked);
  cardLikeCounter.textContent = likesCount;
};

export { createCard, removeCard, toggleLikeCard };
