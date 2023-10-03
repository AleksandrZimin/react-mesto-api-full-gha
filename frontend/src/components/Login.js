import React from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin(password, email);
  }

  return (
    <div className="login">
      <h2 className="login__h2">Вход</h2>
      <form
        className="login__form"
        name="login__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="login__input"
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
          className="login__input"
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
        <button type="submit" className="login__btn">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
