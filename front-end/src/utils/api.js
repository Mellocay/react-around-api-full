class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRes(res) {
    return (res.ok ? res.json() : Promise.reject("Error!" + res.statusText + res.status));
  }

  //other methods for working with the API
  getCardList() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
    .then(res => this._checkRes(res))
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers
    })
    .then(res => this._checkRes(res))
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()])
  }

  
  addCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link
      }),
    })
    .then(res => this._checkRes(res))
  }

  // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  removeCard(cardId) { 
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    })
    .then(res => this._checkRes(res))
  }

  // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  cardLikeAdd(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT"
    })
    .then(res => this._checkRes(res))
  }

  // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  cardLikeRemove(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE"
    })
    .then(res => this._checkRes(res))
  }


  // PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({name, about}) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      }),
    })
    .then(res => this._checkRes(res))
  }

  // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => this._checkRes(res))
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "6eeb54a7-daa3-4961-9f3b-d820b89ec651",
    "Content-Type": "application/json"
  }
});

export default api;