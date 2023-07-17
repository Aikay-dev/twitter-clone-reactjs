import { useRef, useState, useEffect } from "react";
import Datepicker from "tailwind-datepicker-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GoogleUsername = ({
  setshowstepOne,
  setshowStepTwo,
  setshowStepThree,
  setshowStepFour,
  setshowStepFive,
  setshowsignupPage,
  stepOneDetails,
  setStepOneDetails,
  currentLoggedUser,
  setgoogleUsernameStep,
  setgoogleAuthLastStep,
}) => {
  useEffect(() => {
    console.log(stepOneDetails);
    setStepOneDetails({ ...stepOneDetails, email: currentLoggedUser.email });
  }, [currentLoggedUser]);

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
      stepOneDetails.name.length > 15 ||
      stepOneDetails.name.length < 3 ||
      stepOneButton.email === "" ||
      emailRegex.test(stepOneDetails.email) === false
    ) {
      setstepOneButton({ backgroundColor: "rgb(120,122,122)" });
      setNextStagePass(false);
    } else {
      setstepOneButton({ backgroundColor: "rgb(255, 255, 255)" });
      setNextStagePass(true);
    }
  }

  const handlename = (e) => {
    let currentInfo = stepOneDetails;
    currentInfo.name = e;
    setStepOneDetails(currentInfo);
    console.log(stepOneDetails);
    checkCompletion();
  };

  const handlemail = (e) => {
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
      ></div>
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
            if (stepOneDetails.name === "") {
              if (!emailRegex.test(stepOneDetails.email)) {
                setRedMail(true);
              }
              setRedName(true);
            } else if (!emailRegex.test(stepOneDetails.email)) {
              setRedMail(true);
            } else {
              if (nextStagePass) {
                setshowstepOne(false);
                setshowStepTwo(false);
                setshowStepThree(false);
                setshowStepFour(false);
                setshowStepFive(false);
                setshowsignupPage(false);
                setgoogleUsernameStep(false);
                setgoogleAuthLastStep(true)
              } else {
                setRedMail(true);
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

export default GoogleUsername;
