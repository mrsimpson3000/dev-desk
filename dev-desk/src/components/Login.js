import React from "react";

export default function Login(props) {
  const { values, onInputChange, onCheckboxChange, onSubmit, errors } = props;

  return (
    <form className="login-form" onSubmit = {onSubmit}>
      <h2>Login</h2>
      <div className="errors">
        {errors.name}
        {errors.password}
      </div>

      <div className="username">
        <label>
          <h3>Username</h3>
          <input
            value={values.name}
            onChange={onInputChange}
            name="name"
            type="text"
          ></input>
        </label>
      </div>

      <div className="password">
        <label>
          <h3>Password</h3>
          <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="text"
          ></input>
        </label>
      </div>

      <div className="submit-button">
        <label>
          <button className="login-button">Login</button>
        </label>
      </div>
    </form>
  );
}
