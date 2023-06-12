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
  const dispatch = useDispatch();
  const mobNavleft = useSelector((state) => state.mobNavleft.value);
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
          <div className="flex justify-between mt-3 overflow-x-scroll devpagetabholder">
            <div className="minwidthprofiletab whitespace-nowrap h-16 w-full flex items-center justify-center cursor-pointer profilepageTweetsbigTab">
              <div className=" h-full flex justify-center items-center profilepageTweetsTab">
                About Dev
              </div>
            </div>
            <div className="minwidthprofiletab whitespace-nowrap h-16 w-full flex items-center justify-center cursor-pointer profilepageLikesbigTab">
              <div className="h-full flex justify-center items-center profilepageLikesTab">
                Services
              </div>
            </div>
            <div className=" minwidthprofiletab h-16 w-full flex items-center justify-center cursor-pointer profilepageLikesbigTab">
              <div className=" whitespace-nowrap h-full flex justify-center items-center profilepageLikesTab">
                Blog
              </div>
            </div>
            <div className="minwidthprofiletab h-16 w-full flex items-center justify-center cursor-pointer profilepageLikesbigTab">
              <div className=" whitespace-nowrap h-full flex justify-center items-center profilepageLikesTab">
                Contact me
              </div>
            </div>
            
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