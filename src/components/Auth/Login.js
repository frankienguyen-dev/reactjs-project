import { useState } from "react";
import "./Login.scss";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSubmit = () => {
    alert("me");
  };

  return (
    <div className="login-container">
      <div className="header-login">Don't have an account yet?</div>

      <div className="title-login col-4 mx-auto ">Frankie Nguyen</div>

      <div className="welcome-login col-4 mx-auto">Hello, who's this?</div>

      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type="password"
            className="form-control"
          />
        </div>

        <span className="forgot-password">Forgot password?</span>

        <div>
          <button onClick={() => handleClickSubmit()} className="btn-submit">
            Login to Frankie Nguyen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
