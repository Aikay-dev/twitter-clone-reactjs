import React from "react";
import { Link } from "react-router-dom";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "./Home/HomeRight";
import { useSelector, useDispatch } from "react-redux";
import { mobileNavLeftState } from "../store";
import TweetStream from "./Home/dataStream/TweetStream";

library.add(fas);
library.add(fab);
library.add(far);

function ProfilePage() {
  const dispatch = useDispatch();
  const mobNavleft = useSelector((state) => state.mobNavleft.value);
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="flex pt-1 pb-1 profilePageHeader">
          <div
            className="personalization-and-data-head-nav-arrow-holder flex items-center justify-center cursor-pointer rounded-full h-8 w-8 ml-2 mt-2 mr-8"
            onClick={() => window.history.back()}
          >
            <span className="text-base">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </span>
          </div>
          <div>
            <p className=" text-xl font-semibold">Hail Hydra</p>
            <p className="text-sm homelabelcolor">118 Tweets</p>
          </div>
        </header>
        <section className=" overflow-y-scroll h-full profilepagemainsection">
          <div className=" h-48 w-full bg-slate-500 profilebacdropimage">
            <img src="https://picsum.photos/300/100" alt="" style={{ width: '100%', height: '100%' }}/>
          </div>
          <div className="flex flex-col relative">
            <div className="p-1 bg-black absolute rounded-full flex justify-center items-center profileimageinproflepage">
              <img
                src="https://picsum.photos/200/300"
                alt="profile pic"
                className="rounded-full profileimageinproflepageimage relative h-32 w-32"
              />
            </div>
            <div className=" flex flex-row-reverse pt-3 pb-4  pr-5">
              <button className=" font-semibold px-4 py-1 bg-black rounded-full profileMainEditButton">
                Edit Profile
              </button>
            </div>
            <div className="pl-4 pt-10">
              <p className=" font-black text-xl">Hail Hydra</p>
              <p className="text-sm homelabelcolor">@general_ik</p>
            </div>
            <div className="pl-4 pt-4 flex flex-col gap-2">
              <p>big boi</p>
              <div className="homelabelcolor flex gap-2">
                {" "}
                <p>
                  <FontAwesomeIcon icon="fa-regular fa-calendar-days" />{" "}
                </p>
                Joined April 2020
              </div>
              <div className="flex gap-4">
                <div>
                  <span className=" font-semibold">189 </span>
                  <span className="homelabelcolor">following</span>
                </div>
                <div>
                  <span className=" font-semibold">21 </span>
                  <span className="homelabelcolor">followers</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between profilepagetabholder mt-3">
            <div className="h-16 w-full flex items-center justify-center cursor-pointer profilepageTweetsbigTab">
              <div className=" h-full flex justify-center items-center profilepageTweetsTab">Tweets</div>
            </div>
            <div className="h-16 w-full flex items-center justify-center cursor-pointer profilepageLikesbigTab">
              <div className="h-full flex justify-center items-center profilepageLikesTab">Likes</div>
            </div>
          </div>
          <section className=" h-96 w-full">
          <TweetStream/>
        </section>
        </section>
        
      </section>

      <HomeRight />
    </>
  );
}

export default ProfilePage;
