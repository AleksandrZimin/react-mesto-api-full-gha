import React from 'react';
function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_opacity ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <img src={card.link} alt={card.name} className="popup__item" />
        <h2 className="popup__subtitle">{card.name}</h2>
        <button
          type="button"
          className="button popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
