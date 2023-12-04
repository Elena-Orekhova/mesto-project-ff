const container = document.querySelector('.places');
const cardsContainer = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// удаление карточки
function removeCard(evt) {
  const cardItem = evt.target.closest('.places__item');

  cardItem.remove();
};

// заполнение карточки 
function produceCard(card, delCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__delete-button').addEventListener('click', delCard);
  return cardElement;
};

// вывод элемента карточки 
initialCards.forEach(function (item) {
  const card = produceCard(item, removeCard);
  
  cardsContainer.append(card);
});