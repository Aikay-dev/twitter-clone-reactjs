import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Datepicker from "tailwind-datepicker-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const StepOne = ({
  setshowstepOne,
  setshowStepTwo,
  setshowStepThree,
  setshowStepFour,
  setshowStepFive,
  setshowsignupPage,
  stepOneDetails,
  setStepOneDetails,
  toast,
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
  const [stepOneButton, setstepOneButton] = useState({
    backgroundColor: "rgb(120,122,122)",
  });
  const [show, setShow] = useState(false);
  const [redmail, setRedMail] = useState(false);
  const [redName, setRedName] = useState(false);
  const [nextStagePass, setNextStagePass] = useState(false);
  const handleClose = (state) => {
    setShow(state);
  };

  let focus1 = useRef(null);

  const handleFocusing1 = () => {
    focus1.current.focus();
  };

  let focus2 = useRef(null);

  function checkCompletion() {
    if (
      stepOneDetails.DOB === "" ||
      stepOneDetails.name.length === "" ||
      stepOneDetails.email === "" ||
      stepOneDetails.name.length < 3 ||
      stepOneDetails.name.length > 20 ||
      emailRegex.test(stepOneDetails.email) === false
    ) {
      setstepOneButton({ backgroundColor: "rgb(120,122,122)" });
      setNextStagePass(false);
    } else {
      setstepOneButton({ backgroundColor: "rgb(255, 255, 255)" });
      setNextStagePass(true);
    }
  }

  const handleFocusing2 = () => {
    focus2.current.focus();
  };

  const handlename = (e) => {
    let currentInfo = stepOneDetails;
    currentInfo.name = e;
    setStepOneDetails(currentInfo);
    console.log(stepOneDetails);
    if (stepOneDetails.name.length < 3 || stepOneDetails.name.length > 20) {
      setRedName(true);
      checkCompletion();
    } else {
      setRedName(false);
      checkCompletion();
    }
  };

  const handlemail = (e) => {
    if (emailRegex.test(e) === true) {
      setRedMail(false);
      checkCompletion();
    } else {
      setRedMail(true);
      checkCompletion();
    }

    let currentInfo = stepOneDetails;
    currentInfo.email = e;
    setStepOneDetails(currentInfo);
    console.log(stepOneDetails);
    checkCompletion();
  };

  const handledob = (e) => {
    let currentInfo = stepOneDetails;
    currentInfo.DOB = e;
    setStepOneDetails(currentInfo);
    console.log(stepOneDetails);
    checkCompletion();
  };

  return (
    <div>
      <div className="flex items-center ">
        <Link
          onClick={(e) => {
            e.preventDefault();
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
      <div
        className="relative login-password-input-holder mb-6"
        style={redName ? { border: "2px solid red", borderRadius: "5px" } : {}}
      >
        <input
          type="text"
          className=" p-5 bg-black enter-password-login-input  flex justify-center items-center rounded-md w-full"
          placeholder=" "
          ref={focus1}
          onChange={(e) => {
            handlename(e.target.value);
          }}
        />
        <label
          onClick={handleFocusing1}
          htmlFor="email"
          className="absolute top-4 left-2 phemus-label2"
        >
          Name
        </label>
      </div>
      <div
        className="relative login-password-input-holder"
        style={redmail ? { border: "2px solid red", borderRadius: "5px" } : {}}
      >
        <input
          type="email"
          className=" p-5 bg-black enter-password-login-input  flex justify-center items-center rounded-md w-full"
          placeholder=" "
          ref={focus2}
          onChange={(e) => {
            handlemail(e.target.value);
          }}
        />
        <label
          onClick={handleFocusing2}
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
          onChange={(e) => {
            handledob(e);
          }}
          show={show}
          setShow={handleClose}
        />
      </div>
      <div className="step-one-next">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (
              stepOneDetails.name.length < 3 ||
              stepOneDetails.name.length > 20
            ) {
              toast.error("Name Should be between 3 and 20 characters");
              setRedName(true);
            } else if (!emailRegex.test(stepOneDetails.email)) {
              setRedMail(true);
              toast.error("email format error");
              console.log(stepOneDetails.name.length);
            } else {
              if (nextStagePass) {
                setshowstepOne(false);
                setshowStepTwo(true);
                setshowStepThree(false);
                setshowStepFour(false);
                setshowStepFive(false);
                setshowsignupPage(false);
              } else {
                toast.error("Pick a birth date");
              }
            }
          }}
          style={stepOneButton}
          className="w-full step-one-next-button rounded-full text-black font-bold py-3 mt-10 flex justify-center items-center"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
