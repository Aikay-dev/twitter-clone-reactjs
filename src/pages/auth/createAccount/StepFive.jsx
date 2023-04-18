import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

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
  return (
    <div>
      <div className="flex items-center ">
        <Link
          onClick={(e) => {
            e.preventDefault()
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
      <div className="signup-box-def-spacing relative mt-10">
        <div className="step-5-continue-profile pb-10">
          <p className="text-2xl mt-5">Continue to profile</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setshowstepOne(false);
              setshowStepTwo(false);
              setshowStepThree(false);
              setshowStepFour(false);
              setshowStepFive(true);
              setshowsignupPage(false);
            }}
            className="mt-10 step2-next w-full py-3 flex items-center rounded-full justify-center font-bold text-black"
          >
            Profile
          </button>
          <p className="px-1 bg-black absolute step-5-or">or</p>
        </div>

        <p className="text-2xl pt-5">Go to Explore</p>
        <Link
          onClick={() => {
            dispatch(blurChangeState({ display: "none" }));
            setshowSignUpCard(false);
          }}
          to="/Home/Explore"
          style={{ backgroundColor: "rgb(26,140,216)" }}
          className="mt-10 step2-next w-full py-3 flex items-center rounded-full justify-center font-bold"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};
export default StepFive;
