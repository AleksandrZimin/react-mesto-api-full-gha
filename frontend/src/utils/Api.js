class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
    }).then((res) => this._checkResponse(res));
  }

  getCard() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
    }).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  editProfile(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(userData),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(card),
    }).then((res) => this._checkResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
    }).then((res) => this._checkResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId);
    }
    return this.addLike(cardId);
  }

  updateAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      }
    }).then((res) => this._checkResponse(res));
  }
}

export default new Api("http://localhost:3000");