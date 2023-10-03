import React from 'react';
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setUrl("");
    }
  }, [isOpen]);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name, link: url });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="card"
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        className="form__input form__input_place_title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={updateName}
      />
      <span id="title-error" className="popup-error"></span>
      <input
        type="url"
        name="url"
        className="form__input form__input_place_url"
        placeholder="Ссылка на картинку"
        required
        value={url}
        onChange={updateUrl}
      />
      <span id="url-error" className="popup-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
