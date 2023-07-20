import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const StepTwo = ({
  setshowstepOne,
  setshowStepTwo,
  setshowStepThree,
  setshowStepFour,
  setshowStepFive,
  setshowsignupPage,
}) => {
  const [checkboxstate, setcheckboxstate] = useState(true);
  return (
    <div>
      <div className="flex items-center ">
        <Link
          onClick={(e) => {
            e.preventDefault();
            setshowstepOne(true);
            setshowStepTwo(false);
            setshowStepThree(false);
            setshowStepFour(false);
            setshowStepFive(false);
            setshowsignupPage(false);
          }}
          to="/Home/Explore"
          className="ex flex justify-center items-center cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </Link>
        <p className="ml-8 font-bold text-lg">Step 2 of 5</p>
      </div>
      <p className="step-2-text-check-your text-3xl mt-6 mb-10 font-bold">
        Customize your experience
      </p>
      <p className="signup-box-def-spacing text-xl font-bold mb-4">
        Track where you see Twitter content across the web
      </p>
      <div className="flex signup-box-def-spacing justify-center items-start gap-5">
        <p className="text-sm mb-12">
          Tweeter uses this data to personalize your experience. This web
          browsing history will never be stored with your name, email, or phone
          number.
        </p>
        <div
          style={
            checkboxstate
              ? {
                  backgroundColor: "rgb(29, 155, 240)",
                  borderLeft: "2px solid rgb(29,155,240)",
                  borderRight: "2px solid rgb(29,155,240)",
                }
              : { border: "2px solid rgb(113,118,123)" }
          }
          onClick={() => {
            checkboxstate ? setcheckboxstate(false) : setcheckboxstate(true);
          }}
          className="personalization-and-data-person-ad-check cursor-pointer h-5 w-10 flex items-center justify-center"
        >
          {checkboxstate && <FontAwesomeIcon icon="fa-solid fa-check" />}
        </div>
      </div>
      <p className="signup-box-def-spacing signup-step-two-by-signing">
        By signing up, you agree to our{" "}
        <a href="" className="signup-link">
          Terms
        </a>
        ,{" "}
        <a href="" className="signup-link">
          Privacy Policy
        </a>
        , and{" "}
        <a href="" className="signup-link">
          Cookie Use
        </a>
        . Twitter may use your contact information, including your email address
        and phone number for purposes outlined in our Privacy Policy.{" "}
        <a href="" className="signup-link">
          Learn more
        </a>
      </p>
      <div className="signup-box-def-spacing">
        <button
          onClick={(e) => {
            e.preventDefault();
            setshowstepOne(false);
            setshowStepTwo(false);
            setshowStepThree(true);
            setshowStepFour(false);
            setshowStepFive(false);
            setshowsignupPage(false);
          }}
          className="mt-16 step2-next w-full py-3 flex items-center rounded-full justify-center font-bold text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
