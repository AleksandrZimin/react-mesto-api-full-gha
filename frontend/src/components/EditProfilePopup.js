import React from 'react';
import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, updateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.userName);
      setAbout(currentUser.userDescription);
    }
  }, [currentUser, isOpen]);

  const updateName = (e) => {
    setName(e.target.value);
  };
  const updateAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ name, about });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="form__input form__input_place_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={updateName}
        value={name}
      />
      <span id="name-error" className="popup-error"></span>
      <input
        type="text"
        name="job"
        className="form__input form__input_place_job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={updateAbout}
        value={about}
      />
      <span id="job-error" className="popup-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
