import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

library.add(fas);
library.add(fab);
library.add(far);

function StepFour({
  setshowstepOne,
  setshowStepTwo,
  setshowStepThree,
  setshowStepFour,
  setshowStepFive,
  setshowsignupPage,
}) {
  let focus1 = useRef(null);

  const handleFocusing1 = () => {
    focus1.current.focus();
  };

  let focus2 = useRef(null);

  const handleFocusing2 = () => {
    focus2.current.focus();
  };

  const [showEye1, setShowEye1] = useState(true);
  const [showEye2, setShowEye2] = useState(true);
  const [showCanceledEye1, setShowCanceledEye1] = useState(false);
  const [showCanceledEye2, setShowCanceledEye2] = useState(false);
  const [passwordBox1, setPasswordBox1] = useState("password");
  const [passwordBox2, setPasswordBox2] = useState("password");
  return (
    <div>
      <div className="flex items-center ">
        <Link
          onClick={(e) => {
            e.preventDefault();
            setshowstepOne(false);
            setshowStepTwo(false);
            setshowStepThree(true);
            setshowStepFour(false);
            setshowStepFive(false);
            setshowsignupPage(false);
          }}
          to="/Home/Explore"
          className="ex flex justify-center items-center cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </Link>
        <p className="ml-8 font-bold text-lg">Step 4 of 5</p>
      </div>
      <div className="signup-box-def-spacing">
        <div className="flex gap-5 items-center mb-10 mt-8">
          <p className="text-3xl ">Create a Password</p>
        </div>
        <div className="relative mb-10">
          <input
            type={passwordBox1}
            className=" p-5 bg-black enter-password-login-input  flex justify-center items-center rounded-md w-full"
            placeholder=" "
            ref={focus1}
          />
          <label
            onClick={handleFocusing1}
            htmlFor="email"
            className="absolute top-4 left-2 phemus-label2"
          >
            Password
          </label>
          {showEye1 && (
            <label
              onClick={() => {
                setShowEye1(false);
                setShowCanceledEye1(true);
                setPasswordBox1("text");
              }}
              htmlFor="password"
              className="absolute right-3 bottom-2 P-5 bg-black cursor-pointer"
            >
              
              <FontAwesomeIcon icon="fa-regular fa-eye-slash" />
            </label>
          )}
          {showCanceledEye1 && (
            <label
              onClick={() => {
                setShowEye1(true);
                setShowCanceledEye1(false);
                setPasswordBox1("password");
              }}
              htmlFor="password"
              className="absolute right-3 bottom-2 cursor-pointer"
            >
              <FontAwesomeIcon icon="fa-regular fa-eye" />
            </label>
          )}
        </div>
        <div className="relative ">
          <input
            type={passwordBox2}
            className=" p-5 bg-black enter-password-login-input  flex justify-center items-center rounded-md w-full"
            placeholder=" "
            ref={focus2}
          />
          <label
            onClick={handleFocusing2}
            htmlFor="email"
            className="absolute top-4 left-2 phemus-label2"
          >
            Confirm Password
          </label>
          {showEye2 && (
            <label
              onClick={() => {
                setShowEye2(false);
                setShowCanceledEye2(true);
                setPasswordBox2("text");
              }}
              htmlFor="password"
              className="absolute right-3 bottom-2 P-5 bg-black cursor-pointer"
            >
              <FontAwesomeIcon icon="fa-regular fa-eye-slash" />
            </label>
          )}
          {showCanceledEye2 && (
            <label
              onClick={() => {
                setShowEye2(true);
                setShowCanceledEye2(false);
                setPasswordBox2("password");
              }}
              htmlFor="password"
              className="absolute right-3 bottom-2 cursor-pointer"
            >
              
              <FontAwesomeIcon icon="fa-regular fa-eye" />
            </label>
          )}
        </div>

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
          Next
        </button>
      </div>
    </div>
  );
}

export default StepFour;
