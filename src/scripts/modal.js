//открытие МО
const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
};

//закрытие МО
const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
};

//закрыть МО на esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    closeModal(openedPopup);
  }
}

//закрыть МО на оверлей
const closeOnOverlay = (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
};

export { openModal, closeModal, closeOnOverlay };
