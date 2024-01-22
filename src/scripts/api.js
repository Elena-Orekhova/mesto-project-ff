const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "b1f56ce2-7e74-4c10-9809-cd41210d7813",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка данных пользователя
const fetchUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// Загрузка карточек
const fetchCardsInfo = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// сохранение на сервере аватара
const fetchSaveAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

// сохранение на сервере отредактированного профиля
const fetchSaveProfile = (newName, newDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

//Добавление новой карточки на сервер
const fetchAddNewCard = (newCard, newLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCard,
      link: newLink,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

// удаление карточки с сервера
const fetchCardDelete = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// добавление лайка на сервер
const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// снятие лайка в сервере
const removeLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

export {
  addLikeCard,
  removeLikeCard,
  fetchSaveAvatar,
  fetchSaveProfile,
  fetchAddNewCard,
  fetchUserInfo,
  fetchCardsInfo,
  fetchCardDelete,
};
