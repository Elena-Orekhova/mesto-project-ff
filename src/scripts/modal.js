//закрыть МО на esc
const closeOnEsc = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

//закрыть МО на оверлей
const closeOnOverlay = (event) => {
  if (event.target.classList.contains('popup_is-opened')) {
    closeModal(event.target);
  }
};

//закрыть МО на х
const popapContainers = document.querySelectorAll('.popup');
popapContainers.forEach(function(popapContainer) {
  popapContainer.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('popup__close')) {
      closeModal(popapContainer)
    }
  })
})

// очистить форму
function resetForm() {
  const popapForms = document.querySelectorAll('.popup__form')
  popapForms.forEach(function(popapForm) {
    popapForm.reset();
  })
}

//Редактирование имени и информации о себе
function fillFormProfile() {
  const profileName = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  const nameInput = document.forms['edit-profile']['name'];
  const descriptionInput = document.forms['edit-profile']['description'];

  nameInput.value = profileName;
  descriptionInput.value = profileDescription;
}

//cохранить изменения в профле
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

function handleFormSubmit(evt) {
  evt.preventDefault();

  const profileNameElement = document.querySelector('.profile__title');
  const profileDescriptionElement = document.querySelector('.profile__description');

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;

  closeModal(popupEdit);
}

//открытие МО 
const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEsc);
  popup.addEventListener('click', closeOnOverlay);
  fillFormProfile();
  formElement.addEventListener('submit', handleFormSubmit);
};

//закрытие МО
const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeOnEsc);
  popup.removeEventListener('click', closeOnOverlay);
  resetForm();
  formElement.removeEventListener('submit', handleFormSubmit);
};

export { openModal, closeModal };