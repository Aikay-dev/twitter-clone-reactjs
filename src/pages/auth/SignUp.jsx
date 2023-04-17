import React from "react";
import AuthLoginButton from "../../components/Auth-LoginButton";
import googleIcon from "../../assets/google_icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { blurChangeState } from "../../store";
import { useDispatch } from "react-redux";
import Step1 from "./createAccount/step1";

library.add(fas);
library.add(fab);
library.add(far);

const SignUp = () => {
  const dispatch = useDispatch();
  const googleSignButton = (
    <div className="flex items-center justify-center">
      <img src={googleIcon} alt="" className="h-8 flex w-8" />
      Sign up with Google
    </div>
  );

  const appleSignButton = (
    <>
      <FontAwesomeIcon icon="fa-brands fa-apple" className="apple-in-login" />
      <span className="pl-1 text-black">Sign up with Apple</span>
    </>
  );

  const join_create_account = "Create account";
  return (
    <>
      <form
        action=""
        className="auth-form bg-black md:mx-auto md:w-authxlw md:h-authxlh p-2 md:rounded-2xl relative h-screen w-full"
      >
        {false && <>
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
        <div className="signup-info m-auto relative flex pb-5 mb-5 items-center justify-center flex-col gap-5">
          <p className="signup-join-twitter text-center my-7 font-black text-2xl">
            Join Tweeter today
          </p>
          <AuthLoginButton
            logo={googleSignButton}
            classes={"rounded-full google-butt-login"}
          />
          <AuthLoginButton
            logo={appleSignButton}
            classes={
              "rounded-full font-semibold flex items-center justify-center apple-butt-login"
            }
          />
          <div className="signup-or flex items-center justify-center absolute">
            or
          </div>
        </div>
        <div className="flex items-center justify-center flex-col signup-second-section m-auto gap-5">
          <AuthLoginButton
            logo={join_create_account}
            classes={"rounded-full google-butt-login"}
          />
          <p className="sign-By-signingup">
            By signing up, you agree to the{" "}
            <Link className="signup-link">Terms of Service</Link> and{" "}
            <Link className="signup-link">Privacy Policy</Link>, including{" "}
            <link rel="stylesheet" href="Cookie Use." />
          </p>
          <p className="sign-Have-an">
            Have an account already?{" "}
            <Link to="/auth/Login" className="signup-link">
              Log in
            </Link>
          </p>
        </div>
        </>}
        {true && <Step1 />}
      </form>
    </>
  );
};

export default SignUp;
