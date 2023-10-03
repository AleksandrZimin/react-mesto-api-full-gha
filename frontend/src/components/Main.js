import React from 'react';
import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Vector1 from "../images/Vector(1).svg";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  handleCardClick,
  buttonText,
  cards,
  handleCardLike,
  handleDeleteCard,
}) {
  const userData = useContext(CurrentUserContext);

  return (
    <>
      <div>
        <main className="main">
          <section className="profile">
            <img
              src={userData.userAvatar}
              alt="Аватарка"
              className="profile__avatar"
            />
            <button className="profile__avatar-button" onClick={onEditAvatar} />
            <div className="profile__info">
              <h1 className="profile__name">{userData.userName}</h1>
              <button
                type="button"
                className="button profile__button"
                onClick={onEditProfile}
              />
              <p className="profile__job">{userData.userDescription}</p>
            </div>
            <button
              className="profile__add-button"
              type="button"
              onClick={onAddPlace}
            >
              <img src={Vector1} alt="Плюс" className="profile__add-plus" />
            </button>
          </section>
          <section className="elements">
            {cards.map((item) => (
              <Card
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleDeleteCard={handleDeleteCard}
              />
            ))}
          </section>
        </main>
      </div>
    </>
  );
}

export default Main;
