import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { colRef } from "../../../config/firebase";
import { getDocs } from "firebase/firestore";

/* Get all user mail */

const StepThree = ({
  setshowstepOne,
  setshowStepTwo,
  setshowStepThree,
  setshowStepFour,
  setshowStepFive,
  setshowsignupPage,
  stepOneDetails,
}) => {
  const [mailError, setMailError] = useState(true);
  const [checkmail, setCheckMail] = useState(true);
  function handleEmails(mails){
    for(let i = 0; i < mails.length; i++){
        const mail = mails[i];
        console.log(mail.email);
        if(mail.email !== stepOneDetails.email){
            setCheckMail(false);
            setMailError(false)
        }else{
            console.log("mail exists");
            setCheckMail(false)
            setMailError(true)
            return; // exit the function
        }
    }
}

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let usermail = [];
        snapshot.docs.forEach((doc) => {
          usermail.push({ ...doc.data(), id: doc.id });
        });
        console.log(usermail);
        handleEmails(usermail)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  let focus = useRef(null);
  const handleFocusing = () => {
    focus.current.focus();
  };
  function getdateFormat() {
    const dateStr = stepOneDetails.DOB;
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }


  const formattedDate = getdateFormat();

  getdateFormat();
  return (
    <div>
      {!checkmail && (
        <div>
          <div className="flex items-center ">
            <Link
              onClick={(e) => {
                e.preventDefault();
                setshowstepOne(false);
                setshowStepTwo(true);
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
            <p className="ml-8 font-bold text-lg">Step 3 of 5</p>
          </div>
          <div className="signup-box-def-spacing">
            <p className="text-3xl font-bold mt-1 mb-1">Create your account</p>

            <div className="w-full step-3-boarder p-2 mb-4 overflow-hidden relative">
              <p className="text-sm" style={{ color: "rgb(113,118,123)" }}>
                Name
              </p>
              <div
                className="flex justify-between"
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
                <p className="font-semibold">{stepOneDetails.name}</p>
                <div
                  className="absolute right-2"
                  style={{ color: "rgb(0,186,124)" }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                </div>
              </div>
            </div>

            <div className="w-full step-3-boarder p-2 mb-1 overflow-hidden relative">
              <p className="text-sm" style={{ color: "rgb(113,118,123)" }}>
                Email
              </p>
              <div
                className="flex justify-between"
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
                <p className="font-semibold">{stepOneDetails.email}</p>
                {!mailError && (
                  <div
                    className="absolute right-2"
                    style={{ color: "rgb(0,186,124)" }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                  </div>
                )}
                {mailError && (
                  <div className="absolute right-2 text-red-600">
                    <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              {mailError && (
                <p className="b text-red-600  text-xs">Email already in use</p>
              )}
            </div>

            <div className="w-full step-3-boarder p-2 mb-4 overflow-hidden relative">
              <p className="text-sm" style={{ color: "rgb(113,118,123)" }}>
                Date of birth
              </p>
              <div
                className="flex justify-between"
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
                <p className="font-semibold">{formattedDate}</p>
                <div
                  className="absolute right-2"
                  style={{ color: "rgb(0,186,124)" }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                </div>
              </div>
            </div>
            <p className="text-sm " style={{ color: "rgb(113,118,123)" }}>
              By signing up, you agree to the{" "}
              <a href="" className="signup-link">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="" className="signup-link">
                Privacy Policy
              </a>
              , including{" "}
              <a href="" className="signup-link">
                Cookie Use
              </a>
              . Tweeter may use your contact information, including your email
              address and phone number for purposes outlined in our Privacy
              Policy, like keeping your account secure and personalizing our
              services, including ads.{" "}
              <a href="" className="signup-link">
                Learn more
              </a>
              . Others will be able to find you by email or phone number, when
              provided, unless you choose otherwise{" "}
              <a href="" className="signup-link">
                here
              </a>
              .
            </p>

            <div
              onClick={(e) => {
                if (!mailError) {
                  e.preventDefault();
                  setshowstepOne(false);
                  setshowStepTwo(false);
                  setshowStepThree(false);
                  setshowStepFour(true);
                  setshowStepFive(false);
                  setshowsignupPage(false);
                }
              }}
              className="flex justify-center items-center mt-4 py-3 rounded-full cursor-pointer step-three-signup"
            >
              Sign up
            </div>
          </div>
        </div>
      )}
      {checkmail && (
        <div className="flex justify-center items-center mt-40">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default StepThree;
