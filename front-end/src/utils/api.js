class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkRes(res) {
    return (res.ok ? res.json() : Promise.reject("Error!" + res.statusText + res.status));
  }

  getCardList(token) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._checkRes(res));
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._checkRes(res));
  }

  getAppInfo(token) {
    return Promise.all([this.getUserInfo(), this.getCardList()])
  }


  addCard({ name, link }, token) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        name,
        link
      }),
    })
      .then(res => this._checkRes(res));
  }

  removeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then(res => this._checkRes(res));
  }

  cardLikeAdd(cardId, token) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: "PUT"
    })
      .then(res => this._checkRes(res));
  }

  cardLikeRemove(cardId, token) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: "DELETE"
    })
      .then(res => this._checkRes(res));
  }

  setUserInfo({ name, about }, token) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        about
      }),
    })
      .then(res => this._checkRes(res));
  }

  setUserAvatar({ avatar }, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => this._checkRes(res));
  }
}

const api = new Api({
  baseUrl: "http://localhost:3001/",
});

export default api;