import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //---ОБРАБОТЧИКИ---
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="register">
      <h2 className="register__h2">Регистрация</h2>
      <form
        className="register__form"
        name="form-register"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="register__input"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          id="loggin-input"
          type="email"
          name="email"
          minLength="2"
          maxLength="40"
          required
        ></input>
        <input
          className="register__input"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
          id="password-input"
          type="password"
          name="password"
          minLength="4"
          maxLength="10"
          required
        ></input>
        <button type="submit" className="register__btn">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="register__link">
        Уже зарегестрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
