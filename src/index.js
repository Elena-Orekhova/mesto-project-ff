import './pages/index.css';
import { initialCards, createCard, likeCards } from './scripts/cards';
import { closeModal, openModal, popupEdit } from './scripts/modal';

//глобальные переменные
const cardsContainer = document.querySelector('.places__list');

// при загрузке страницы добавляем класс, для плавного открытия и закрытия МО
document.addEventListener('DOMContentLoaded', function () {
  const popupElements = document.querySelectorAll('.popup');
  popupElements.forEach(function(popupElement) {
    popupElement.classList.add('popup_is-animated');
  });
});

// вывод элемента карточки 
initialCards.forEach(function (item) {
  const card = createCard(item);

  cardsContainer.append(card);
});

// попап "редактировать"
//открыть 
const editButtonProfile = document.querySelector('.profile__edit-button');

editButtonProfile.addEventListener ('click', () => openModal(popupEdit));

// попап "+"
//открыть
const popupNewCard = document.querySelector('.popup_type_new-card');
const addButtonProfile = document.querySelector('.profile__add-button');

addButtonProfile.addEventListener ('click', () => openModal(popupNewCard));

// Добавление новой карточки
const formNewCardElement = document.querySelector('.popup__form[name="new-place"]');

formNewCardElement.addEventListener('submit', handleNewCardSubmit);

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const placeNameInput = formNewCardElement.querySelector('.popup__input_type_card-name');
  const linkInput = formNewCardElement.querySelector('.popup__input_type_url');
  const newCard = createCard({name: placeNameInput.value, link: linkInput.value});

  initialCards.unshift({
    name: placeNameInput.value,
    link: linkInput.value,
  });

  closeModal(popupNewCard);
 
  const cardsContainer = document.querySelector('.places__list');

  cardsContainer.prepend(newCard);
}

// поставить лайк карточке
cardsContainer.addEventListener('click', likeCards);

