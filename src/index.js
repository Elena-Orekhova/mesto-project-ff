import './pages/index.css';
import { createCard } from './scripts/card';
import { initialCards } from './scripts/cards';
import { closeModal, openModal, closeOnOverlay } from './scripts/modal';

//глобальные переменные
const cardsContainer = document.querySelector('.places__list');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const addButtonProfile = document.querySelector('.profile__add-button');
const nameInput = document.forms['edit-profile']['name'];
const descriptionInput = document.forms['edit-profile']['description'];
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = popupEditProfile.querySelector('.popup__form');

// при загрузке страницы добавляем класс, для плавного открытия и закрытия МО
document.addEventListener('DOMContentLoaded', function () {
  const popupElements = document.querySelectorAll('.popup');
  
  popupElements.forEach(function(popupElement) {
    popupElement.classList.add('popup_is-animated');
    popupElement.addEventListener('mousedown', closeOnOverlay);
  });
});

// Добавление новой карточки
const formNewCardElement = document.querySelector('.popup__form[name="new-place"]');

formEditProfile.addEventListener('submit', handleEditProfile); 
formNewCardElement.addEventListener('submit', handleNewCardSubmit);

const placeNameInput = formNewCardElement.querySelector('.popup__input_type_card-name');
const linkInput = formNewCardElement.querySelector('.popup__input_type_url');

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({name: placeNameInput.value, link: linkInput.value}, openImagePopup);

  closeModal(popupNewCard);
 
  cardsContainer.prepend(newCard);
}

// открыть попап "редактировать" 
const editButtonProfile = document.querySelector('.profile__edit-button');

editButtonProfile.addEventListener ('click', () => {
  fillFormProfile();
  openModal(popupEditProfile);
});

//Редактирование имени и информации о себе
function fillFormProfile() {
  const profileName = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  nameInput.value = profileName;
  descriptionInput.value = profileDescription;
}

//cохранить изменения в профиле
function handleEditProfile(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;

  closeModal(popupEditProfile);
}

// открыть попап "+"
addButtonProfile.addEventListener ('click', () => openModal(popupNewCard));

// открыть попап "открыть картинку"
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

function openImagePopup(link, caption) {
  imagePopupImage.src = link;
  imagePopupImage.alt = caption;
  imagePopupCaption.textContent = caption;
  openModal(imagePopup);
}

// вывод элемента карточки 
initialCards.forEach(function (item) {
  const card = createCard(item, openImagePopup);

  cardsContainer.append(card);
});