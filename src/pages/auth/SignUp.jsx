import React, { useState, useEffect } from "react";
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
import StepOne from "./createAccount/StepOne";
import StepTwo from "./createAccount/StepTwo";
import StepFive from "./createAccount/StepFive";
import StepFour from "./createAccount/StepFour";
import StepThree from "./createAccount/StepThree";
import { signUpWithGoogle } from "../../config/firebase";
import GoogleUsername from "./createAccount/GoogleUsername";
import { colRef } from "../../config/firebase";
import { getDocs } from "firebase/firestore";
import { auth, Provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import GoogleAuthLastStep from "./createAccount/GoogleAuthLastStep";

library.add(fas);
library.add(fab);
library.add(far);

const SignUp = ({ setshowSignUpCard }) => {
  const [showsignupPage, setshowsignupPage] = useState(true);
  const [showstepOne, setshowstepOne] = useState(false);
  const [showStepTwo, setshowStepTwo] = useState(false);
  const [showStepThree, setshowStepThree] = useState(false);
  const [showStepFour, setshowStepFour] = useState(false);
  const [showStepFive, setshowStepFive] = useState(false);
  const [googleUsernameStep, setgoogleUsernameStep] = useState(false);
  const [usersEmail, setUsersEmail] = useState([]);
  const [currentLoggedUser, setcurrentLoggedUser] = useState([]);
  const [googleAuthLastStep, setgoogleAuthLastStep] = useState(false);

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let usersMail = [];
        snapshot.docs.forEach((doc) => {
          usersMail.push({ ...doc.data(), id: doc.id });
        });
        setUsersEmail(usersMail);
        console.log("first");
        console.log("logged in", auth.currentUser);
        setcurrentLoggedUser(auth.currentUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    console.log(usersEmail);
    console.log("logged in", auth.currentUser);
  }, [usersEmail]);

  const dispatch = useDispatch();

  const [stepOneDetails, setStepOneDetails] = useState({
    name: "",
    email: "",
    DOB: "",
    password: "",
  });

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

  /* Manage states based on height */
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [signupScrollState, setsignupScrollState] = useState("");

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowHeight > 450) {
      setsignupScrollState(
        "auth-form bg-black md:mx-auto md:w-authxlw md:h-authxlh p-2 md:rounded-2xl relative h-screen w-full"
      );
    } else {
      setsignupScrollState(
        "auth-form overflow-y-scroll bg-black md:mx-auto md:w-authxlw md:h-authxlh p-2 md:rounded-2xl relative h-screen w-full"
      );
    }
  }, [windowHeight]);

  /* Manage states based on height */

  const join_create_account = "Create account";

  function googleSignIn() {
    signInWithPopup(auth, Provider)
      .then((result) => {
        console.log(result.user.email);
        console.log("users list:" + usersEmail);
        if (usersEmail.length < 1) {
          addDoc(colRef, {
            email: result.user.email,
          });
          setgoogleUsernameStep(true);
          setshowstepOne(false);
          setshowStepTwo(false);
          setshowStepThree(false);
          setshowStepFour(false);
          setshowStepFive(false);
          setshowsignupPage(false);
          setcurrentLoggedUser(auth.currentUser);
        } else {
          for (let i = 0; i < usersEmail.length; i++) {
            if (usersEmail[i].email === result.user.email) {
              console.log("email used already");
            } else {
              setgoogleUsernameStep(true);
              setshowstepOne(false);
              setshowStepTwo(false);
              setshowStepThree(false);
              setshowStepFour(false);
              setshowStepFive(false);
              setshowsignupPage(false);
              setcurrentLoggedUser(auth.currentUser);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(usersEmail.length);

  return (
    <>
      <form action="" className={signupScrollState}>
        {showsignupPage && (
          <>
            <div className="top-of-auth flex">
              <Link
                onClick={() => {
                  dispatch(blurChangeState({ display: "none" }));
                  setshowSignUpCard(false);
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
              <div
                onClick={(e) => {
                  e.preventDefault();
                  googleSignIn();
                }}
              >
                <AuthLoginButton
                  logo={googleSignButton}
                  classes={"rounded-full google-butt-login"}
                />
              </div>
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
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setshowstepOne(true);
                  setshowStepTwo(false);
                  setshowStepThree(false);
                  setshowStepFour(false);
                  setshowStepFive(false);
                  setshowsignupPage(false);
                }}
              >
                <AuthLoginButton
                  logo={join_create_account}
                  classes={"rounded-full google-butt-login"}
                />
              </div>
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
          </>
        )}
        {showstepOne && (
          <StepOne
            setshowstepOne={setshowstepOne}
            setshowStepTwo={setshowStepTwo}
            setshowStepThree={setshowStepThree}
            setshowStepFour={setshowStepFour}
            setshowStepFive={setshowStepFive}
            setshowsignupPage={setshowsignupPage}
            stepOneDetails={stepOneDetails}
            setStepOneDetails={setStepOneDetails}
          />
        )}
        {showStepTwo && (
          <StepTwo
            setshowstepOne={setshowstepOne}
            setshowStepTwo={setshowStepTwo}
            setshowStepThree={setshowStepThree}
            setshowStepFour={setshowStepFour}
            setshowStepFive={setshowStepFive}
            setshowsignupPage={setshowsignupPage}
          />
        )}
        {showStepThree && (
          <StepThree
            setshowstepOne={setshowstepOne}
            setshowStepTwo={setshowStepTwo}
            setshowStepThree={setshowStepThree}
            setshowStepFour={setshowStepFour}
            setshowStepFive={setshowStepFive}
            setshowsignupPage={setshowsignupPage}
            stepOneDetails={stepOneDetails}
            setStepOneDetails={setStepOneDetails}
          />
        )}
        {showStepFour && (
          <StepFour
            setshowstepOne={setshowstepOne}
            setshowStepTwo={setshowStepTwo}
            setshowStepThree={setshowStepThree}
            setshowStepFour={setshowStepFour}
            setshowStepFive={setshowStepFive}
            setshowsignupPage={setshowsignupPage}
            stepOneDetails={stepOneDetails}
            setStepOneDetails={setStepOneDetails}
          />
        )}
        {showStepFive && (
          <StepFive
            setshowstepOne={setshowstepOne}
            setshowStepTwo={setshowStepTwo}
            setshowStepThree={setshowStepThree}
            setshowStepFour={setshowStepFour}
            setshowStepFive={setshowStepFive}
            setshowsignupPage={setshowsignupPage}
            setshowSignUpCard={setshowSignUpCard}
          />
        )}
        {googleUsernameStep && (
          <GoogleUsername
            setshowstepOne={setshowstepOne}
            setshowStepTwo={setshowStepTwo}
            setshowStepThree={setshowStepThree}
            setshowStepFour={setshowStepFour}
            setshowStepFive={setshowStepFive}
            setshowsignupPage={setshowsignupPage}
            setshowSignUpCard={setshowSignUpCard}
            stepOneDetails={stepOneDetails}
            setStepOneDetails={setStepOneDetails}
            currentLoggedUser={currentLoggedUser}
            setgoogleUsernameStep={setgoogleUsernameStep}
            googleAuthLastStep={googleAuthLastStep}
            setgoogleAuthLastStep={setgoogleAuthLastStep}
          />
        )}
        {googleAuthLastStep && (
          <GoogleAuthLastStep
            setshowstepOne={setshowstepOne}
            setshowStepTwo={setshowStepTwo}
            setshowStepThree={setshowStepThree}
            setshowStepFour={setshowStepFour}
            setshowStepFive={setshowStepFive}
            setshowsignupPage={setshowsignupPage}
            setshowSignUpCard={setshowSignUpCard}
            stepOneDetails = {stepOneDetails}
          />
        )}
      </form>
    </>
  );
};

export default SignUp;
