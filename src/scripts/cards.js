import { openModal } from './modal.js'

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// заполнение карточки 
const createCard = (card) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
 
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);

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

// поставить лайк карточке
const likeCards = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active'); 
  };
};

// попап "открыть картинку"
// Открытие
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

function openImagePopup(link, caption) {
  imagePopupImage.src = link;
  imagePopupImage.alt = caption;
  imagePopupCaption.textContent = caption;
  openModal(imagePopup);
}

export { initialCards, createCard, likeCards };