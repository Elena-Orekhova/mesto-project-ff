const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "b1f56ce2-7e74-4c10-9809-cd41210d7813",
    "Content-Type": "application/json",
  },
};

// Загрузка данных пользователя
const userPromise = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
};

// Загрузка карточек
const cardsPromise = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
};

// сохранение на сервере аватара
const fetchsaveAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

// сохранение на сервере отредактированного профиля
const fetchsaveProfile = (newName, newDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
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
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

// удаление карточки с сервера
const fetchCardDelete = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

// добавление лайка на сервер
const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

// снятие лайка в сервере
const removeLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

export {
  addLikeCard,
  removeLikeCard,
  fetchsaveAvatar,
  fetchsaveProfile,
  fetchAddNewCard,
  userPromise,
  cardsPromise,
  fetchCardDelete,
};
