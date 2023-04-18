import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Datepicker from "tailwind-datepicker-react";

library.add(fas);
library.add(fab);
library.add(far);

const StepOne = ({
  setshowstepOne,
  setshowStepTwo,
  setshowStepThree,
  setshowStepFour,
  setshowStepFive,
  setshowsignupPage,
}) => {
  const options = {
    title: "Date of birth",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-gray-700 dark:bg-gray-800",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      prev: () => <span className="text-sm">Previous</span>,
      next: () => <span className="text-sm">Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date("2022-01-01"),
    language: "en",
  };

  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  let focus = useRef(null);

  const handleFocusing = () => {
    focus.current.focus();
  };
  return (
    <div>
      <div className="flex items-center ">
        <Link
          onClick={(e) => {
            e.preventDefault()
            setshowstepOne(false);
            setshowStepTwo(false);
            setshowStepThree(false);
            setshowStepFour(false);
            setshowStepFive(false);
            setshowsignupPage(true);
          }}
          to="/Home/Explore"
          className="ex flex justify-center items-center cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </Link>
        <p className="ml-8 font-bold text-lg">Step 1 of 5</p>
      </div>
      <p className="step-one-text-create-account my-8 text-3xl font-bold">
        Create your account
      </p>
      <div className="relative login-password-input-holder mb-6">
        <input
          type="text"
          className=" p-5 bg-black enter-password-login-input  flex justify-center items-center rounded-md w-full"
          placeholder=" "
          ref={focus}
        />
        <label
          onClick={handleFocusing}
          htmlFor="email"
          className="absolute top-4 left-2 phemus-label2"
        >
          Name
        </label>
      </div>
      <div className="relative login-password-input-holder">
        <input
          type="text"
          className=" p-5 bg-black enter-password-login-input  flex justify-center items-center rounded-md w-full"
          placeholder=" "
          ref={focus}
        />
        <label
          onClick={handleFocusing}
          htmlFor="email"
          className="absolute top-4 left-2 phemus-label2"
        >
          Email
        </label>
      </div>
      <p className="step-one-text-dob mt-10 font-bold">Date of birth</p>
      <p className="step-one-text-dob text-sm homepage-header-label mb-4">
        This will not be shown publicly. Confirm your own age, even if this
        account is for a business, a pet, or something else.
      </p>
      <div className="step-one-age-input-holder">
        <Datepicker
          options={options}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
        />
      </div>
      <div className="step-one-next">
        <button
          onClick={(e) => {
            e.preventDefault();
            setshowstepOne(false);
            setshowStepTwo(true);
            setshowStepThree(false);
            setshowStepFour(false);
            setshowStepFive(false);
            setshowsignupPage(false);
          }}
          className="w-full step-one-next-button rounded-full text-black font-bold py-3 mt-10 flex justify-center items-center"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
