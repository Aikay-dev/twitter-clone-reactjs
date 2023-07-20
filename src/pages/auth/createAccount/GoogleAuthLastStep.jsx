import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { writeUserData } from "../../../config/firebase";
import generateRandomString from "../../../utility/userIdAlgo";
import SmLoader from "../components/SmLoader";
import getJoinedMonthYear from "../../../utility/dateJoined";

library.add(fas);
library.add(fab);
library.add(far);

const GoogleAuthLastStep = ({ setshowSignUpCard, stepOneDetails }) => {
  const [loader, setloader] = useState(false);
  const currentDate = new Date();
  const joinedDate = getJoinedMonthYear(currentDate);

  return (
    <div>
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
        <div
          onClick={() => {
            setloader(true);
            writeUserData(
              generateRandomString(10),
              "@" + stepOneDetails.name.replace(/\s/g, ""),
              stepOneDetails.email,
              "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
              stepOneDetails.DOB,
              stepOneDetails.name,
              joinedDate
            )
              .then(() => {
                setloader(false);
                dispatch(blurChangeState({ display: "none" }));
                setshowSignUpCard(false);
              })
              .catch((error) => {
                setloader(false);
              });
          }}
          className="mt-10 step2-next w-full py-3 flex items-center rounded-full justify-center font-bold text-black"
        >
          {!loader && "Next"}
          {loader && <SmLoader />}
        </div>
      </div>
    </div>
  );
};
export default GoogleAuthLastStep;
