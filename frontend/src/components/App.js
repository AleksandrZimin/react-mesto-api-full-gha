import React from 'react';
import { useState, useEffect } from "react";
import { Routes, Route, redirect, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Api from "../utils/Api";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";

import * as Auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    successOk: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    _id: "",
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([Api.getCard(), Api.getUserInfo()])
        .then(([cards, userInfomation]) => {
          const { name, about, avatar, _id } = userInfomation;
          setCurrentUser({
            userName: name,
            userDescription: about,
            userAvatar: avatar,
            _id,
          });
          setCards(cards.reverse());
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleInfoTooltip(result) {
    setInfoTooltip({ ...isInfoTooltip, isOpen: true, successful: result });
  }

  function handleSignup(password, email) {
    Auth.register(password, email)
      .then((res) => {
        setIsSuccess(true);

        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsTooltipOpen(true);
      });
  }

  function handleSignin(password, email) {
    Auth.login(password, email)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  const updateUser = (userData) => {
    Api.editProfile(userData)
      .then((newUserData) => {
        setCurrentUser({
          ...currentUser,
          userName: newUserData.name,
          userDescription: newUserData.about,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard([]);
    setIsTooltipOpen(false);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => {
      return currentUser._id === user._id;
    });
    Api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleDeleteCard = (card) => {
    Api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    setCurrentUser({})
  };

  const onUpdateAvatar = (avatarData) => {
    Api.updateAvatar(avatarData)
      .then((newUserData) => {
        setCurrentUser({
         ...currentUser,
          userAvatar: newUserData.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const onAddPlace = (cardData) => {
    Api.addNewCard(cardData)
      .then((newCardData) => {
        setCards([newCardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header email={email} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                handleCardClick={handleCardClick}
                cards={cards}
                handleCardLike={handleCardLike}
                handleDeleteCard={handleDeleteCard}
              />
            }
          ></Route>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleSignup} />}
          ></Route>
          <Route
            path="/sign-in"
            element={<Login onLogin={handleSignin} />}
          ></Route>
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          updateUser={updateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={onAddPlace}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
