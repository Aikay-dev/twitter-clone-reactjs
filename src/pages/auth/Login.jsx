import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import googleIcon from "../../assets/google_icon.svg";
import AuthLoginButton from "../../components/Auth-LoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { blurChangeState } from "../../store";
import { useDispatch } from "react-redux";
import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";

library.add(fas);
library.add(fab);
library.add(far);

const Login = () => {
  const [renderEmail, setrenderEmail] = useState(true);
  const [renderPassword, setrenderPassword] = useState(false);
  return (
    <>
      <form
        action=""
        className="auth-form bg-black md:mx-auto md:w-authxlw md:h-authxlh p-2 md:rounded-2xl relative h-screen w-full"
      >
        <div className="top-of-auth flex">
          <Link
            onClick={() => {
              dispatch(blurChangeState({ display: "none" }));
            }}
            to="/Home/Explore"
            className="ex flex justify-center items-center cursor-pointer rounded-full"
          >
            <FontAwesomeIcon icon="fas fa-xmark " />
          </Link>
          <div className="bird absolute right-1/2 text-3xl">
            <FontAwesomeIcon icon="fab fa-twitter" />
          </div>
        </div>
        {renderEmail && <LoginEmail setrenderEmail = {setrenderEmail} setrenderPassword = {setrenderPassword} />}
        {renderPassword && <LoginPassword/>}
      </form>
    </>
  );
};

export default Login;
