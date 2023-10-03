import React from 'react';

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup ${name}-popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="form__button" type="submit">
            {buttonText}
          </button>
        </form>
        <button
          type="button"
          className="button popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
