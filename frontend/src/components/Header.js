import React, { useState } from "react";
import { Routes, Link, Route } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email, handleLogout }) {
  return (
    <div>
      <header className="header">
        <img src={logo} alt="Место-Россия" className="header__logo" />
        <div className="header__auth">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              }
            ></Route>
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              }
            ></Route>
            {/* <a className="header__link ">Зарегистрироваться</a> */}
            <Route
              exact
              path="/"
              element={
                <>
                  <span className="header__link ">{email}</span>
                  <button onClick={handleLogout} className="header__button">
                    Выйти
                  </button>
                </>
              }
            ></Route>
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default Header;
