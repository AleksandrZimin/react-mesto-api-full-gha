import React from 'react';
import fail from "../images/Union (1).png";
import success from "../images/Union.png";
import "./InfoTooltip.css";

function InfoTooltip({ onClose, onOverlayClose, isOpen, isSuccess }) {
  return (
    <div
      className={`popup __infoTooltip ${isOpen ? "popup_opened" : false}`}
      onClick={onOverlayClose}
    >
      <div className="popup__container popup__position">
        <img
          className="popup__photo popup__img"
          src={isSuccess ? success : fail}
        />
        <span className="popup__text">
          {isSuccess
            ? "Вы успешно зарегестрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </span>

        <button
          type="button"
          className="button popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
