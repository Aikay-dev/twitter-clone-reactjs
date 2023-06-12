import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "./Home/HomeRight";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mobileNavLeftState } from "../store";

library.add(fas);
library.add(fab);
library.add(far);

function TweeterBluePage() {
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="flex flex-col px-5 pt-5 notificationheaderBorder">
          <div className="flex justify-between items-center">
            <div
              className="notificationUserImage flex items-center"
              onClick={() => {
                dispatch(mobileNavLeftState(true));
                document.body.classList.add("overlay-open");
                console.log(mobNavleft);
              }}
            >
              <img
                src="https://picsum.photos/200/300"
                alt="user profile image"
                className=" rounded-full w-8 h-8 max-h-8"
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="t text-xl font-bold">Tweeter Dev</p>
              <Link
                to="/Home/Settings/"
                className="p-1 rounded-full notificationSettingsButton flex justify-center items-center cursor-pointer"
              >
                <SettingsTwoToneIcon fontSize="small" />
              </Link>
            </div>
          </div>
          <div className="w-14 pb-3 flex justify-center items-center mt-8 notificationHeaderAll">
            <p className="fo font-semibold text-sm">All</p>
          </div>
        </header>
        <section className=" overflow-y-scroll h-screen notificationmainsection">
          
        </section>
      </section>

      <HomeRight />
    </>
  )
}

export default TweeterBluePage