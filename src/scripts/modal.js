//открытие МО 
const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (event) => {
    closeOnEsc(event, popup)
  });
};

//закрытие МО
const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeOnEsc);

  // очистить форму, если есть
  const popapForm = popup.querySelector('.popup__form');
  if (popapForm) {
    popapForm.reset();
  }
};

//закрыть МО на х
document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  
  button.addEventListener('click', () => closeModal(buttonsPopup));
});

//закрыть МО на esc
const closeOnEsc = (event, popup) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeModal(popup);
  }
};

const closeOnOverlay = (event) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  
  if (openedPopup && event.target.classList.contains('popup_is-opened')) {
    closeModal(openedPopup);
  }
};

export { openModal, closeModal, closeOnOverlay };
