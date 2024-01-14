// заполнение карточки 
const createCard = (card, openImagePopup) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const ImageElement = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = card.name;
  ImageElement.src = card.link;
  ImageElement.alt = card.name;
 
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);

  // поставить лайк карточке
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeCards);

  //Обработчик для открытия попапа с изображением
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.addEventListener('click', () => openImagePopup(card.link, card.name));

  return cardElement;
};

// удаление карточки
const removeCard = (evt) => {
  const cardItem = evt.target.closest('.places__item');

  cardItem.remove();
};

// лайк
const likeCards = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active'); 
};

export { createCard };

