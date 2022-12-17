import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { postLogin, postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClickSubmit = async () => {
    // validate
    if (!password) {
      toast.error("Invalid password :((");
      return;
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email :((");
      return;
    }

    // call api
    let response = await postRegister(email, password, username);

    if (response && response.EC === 0) {
      toast.success(response.EM);
      navigate("/login");
    }

    if (response && response.EC !== 0) {
      toast.error(response.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header-login">
        <span>Do have an account yet?</span>
        <button onClick={() => handleClickLogin()}>Log in</button>
      </div>

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

        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type={isShowPassword ? "text" : "password"}
            className="form-control"
          />

          {isShowPassword ? (
            <span
              onClick={() => setIsShowPassword(false)}
              className="icons-eye"
            >
              <AiFillEyeInvisible />
            </span>
          ) : (
            <span onClick={() => setIsShowPassword(true)} className="icons-eye">
              <AiFillEye />
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            type="text"
            className="form-control"
          />
        </div>

        {/* <span className="forgot-password">Forgot password?</span> */}

        <div>
          <button onClick={() => handleClickSubmit()} className="btn-submit">
            Register Frankie Nguyen
          </button>
        </div>

        <div onClick={() => handleGoBack()} className="goback">
          <span>Go back Homepage</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
