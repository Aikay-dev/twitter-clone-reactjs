import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";

library.add(fas);
library.add(fab);
library.add(far);

const StepFive = ({
  setshowstepOne,
  setshowStepTwo,
  setshowStepThree,
  setshowStepFour,
  setshowStepFive,
  setshowsignupPage,
  setshowSignUpCard,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center ">
        <Link
          onClick={(e) => {
            e.preventDefault();
            setshowstepOne(false);
            setshowStepTwo(false);
            setshowStepThree(false);
            setshowStepFour(true);
            setshowStepFive(false);
            setshowsignupPage(false);
          }}
          to="/Home/Explore"
          className="ex flex justify-center items-center cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </Link>
        <p className="ml-8 font-bold text-lg">Step 5 of 5</p>
      </div>
      <div className="signup-box-def-spacing">
        <div className="flex gap-5 items-center mb-10 mt-8">
          <p className="text-3xl ">Account created</p>
          <div className="text-3xl " style={{ color: "rgb(0,186,124)" }}>
            <FontAwesomeIcon icon="fa-solid fa-circle-check" />
          </div>
        </div>
        <p className="text-3xl mb-5">Welcome to Tweeter 🎊</p>
        <p>
          Tweeter is a dynamic platform that was developed by the talented
          software developer,{" "}
          <a className="signup-link" href="https://github.com/GeneralAike">
            👨‍💻 Aikay
          </a>
          , as a side project. It is a spinoff of Twitter, but it is based on
          the React framework, which provides a seamless user experience. With
          its user-friendly interface and impressive functionality, Tweeter is a
          great alternative to Twitter. Whether you want to share your thoughts,
          connect with friends or stay up-to-date on the latest trends, Tweeter
          has got you covered.
        </p>
        <p className="my-3">Have fun and enjoy your stay.</p>
        <Link
          onClick={() => {
            dispatch(blurChangeState({ display: "none" }));
            setshowSignUpCard(false);
          }}
          to="/Home"
          className="mt-10 step2-next w-full py-3 flex items-center rounded-full justify-center font-bold text-black"
        >
          Next
        </Link>
      </div>
    </div>
  );
};
export default StepFive;
