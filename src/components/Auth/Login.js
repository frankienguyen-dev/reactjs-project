import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner11 } from "react-icons/im";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate("/");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClickSubmitLogin = async () => {
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

    // set loading data
    setIsLoadingData(true);

    // call api
    let response = await postLogin(email, password);
    console.log("check login: ", response);

    if (response && response.EC === 0) {
      dispatch(doLogin(response));
      toast.success(response.EM);
      setIsLoadingData(false);
      navigate("/");
    }

    if (response && response.EC !== 0) {
      toast.error(response.EM);
      setIsLoadingData(false);
    }
  };

  const handleClickRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="header-login">
        <span>Don't have an account yet?</span>
        <button onClick={() => handleClickRegister()}>Sign up</button>
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
          <button
            onClick={() => handleClickSubmitLogin()}
            className="btn-submit"
            disabled={isLoadingData}
          >
            {isLoadingData === true && <ImSpinner11 className="loaderIcon" />}

            <span>Login to Frankie Nguyen</span>
          </button>
        </div>

        <div onClick={() => handleGoBack()} className="goback">
          <span>Go back Homepage</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
