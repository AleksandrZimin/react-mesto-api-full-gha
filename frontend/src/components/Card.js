import React from 'react';
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import deleteItem from "../images/delete.svg";

function Card({ item, handleCardClick, handleCardLike, handleDeleteCard }) {
  const handleClick = () => {
    handleCardClick(item);
  };

  const userData = useContext(CurrentUserContext);
  const isOwn = item.owner._id === userData._id;

  const isLiked = item.likes.some((user) => {
    return userData._id === user._id;
  });

  const handleLike = () => {
    handleCardLike(item);
  };

  const handleDelete = () => {
    handleDeleteCard(item);
  };

  return (
    <>
      <div>
        <article className="element" id="element">
          <img
            src={item.link}
            alt={item.name}
            className="element__image"
            onClick={handleClick}
          />
          <div className="element__place">
            <h2 className="element__title">{item.name}</h2>
            <div className="elements__like">
              <button
                type="button"
                className={`element__icon button ${
                  isLiked && "element__icon_active"
                }`}
                onClick={handleLike}
              ></button>
              <span className="element__number">{item.likes.length}</span>
            </div>
          </div>
          {isOwn && (
            <img
              src={deleteItem}
              alt="Удаление"
              className="element__delete"
              onClick={handleDelete}
            />
          )}
        </article>
      </div>
    </>
  );
}
export default Card;
