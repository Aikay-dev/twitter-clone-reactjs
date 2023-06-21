import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "./Home/HomeRight";
import { useSelector, useDispatch } from "react-redux";
import TweetStream from "./Home/dataStream/TweetStream";

library.add(fas);
library.add(fab);
library.add(far);

function ProfilePage() {
  const [profileTweetsTab, setprofileTweetsTab] = useState(true);
  const [profileLikesTab, setprofileLikesTab] = useState(false);
  const [profileBlur, setprofileBlur] = useState(false)
  const dispatch = useDispatch();
  const mobNavleft = useSelector((state) => state.mobNavleft.value);

  const currentUser = useSelector((state) => state.currUsr.value);
  console.log(currentUser)
  console.log("first")
  let focusName = useRef(null);
  let focusBio = useRef(null);
  let focusLocation = useRef(null);
  let focusWebsite = useRef(null);

  const handleFocusingName = () => {
    focusName.current.focus();
  };
  const handleFocusingBio = () => {
    focusBio.current.focus();
  };
  const handleFocusingLocation = () => {
    focusLocation.current.focus();
  };
  const handleFocusingWebsite = () => {
    focusWebsite.current.focus();
  };

  return (
    <>
      {profileBlur && <div onClick={(e) => {
        e.stopPropagation
        setprofileBlur(false)
      }} className=" flex justify-center items-center h-full w-full homepage-auth-overlay fixed z-50">
        <div onClick={(e) => {
            e.stopPropagation()
        }} className=" bg-black inputprofiledetailbox">
          <div className="flex justify-between p-3">
            <div className="flex gap-10 pl-2 items-center">
              <button onClick={() => {
                setprofileBlur(false)
              }} className="text-xl cursor-pointer p-1 rounded-full px-2 flex profileEx">
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </button>
              <p className="font-semibold text-xl">Edit profile</p>
            </div>
            <button className="bg-white text-black saveprofilebuttton rounded-full px-4 py-1 font-semibold">
              Save
            </button>
          </div>
          <div className=" overflow-y-scroll">
            <div className="px-3">
              <img
                src={currentUser.profile_picture
                }
                alt="user profile image"
                className="rounded-full h-24 w-24 mt-10"
              />
            </div>
            <div className="sign-in-box px-3 flex pt-5 flex-col items-center justify-center ">
              <div className="relative w-full">
                <input
                  type="text"
                  className=" namefillboxprofile bg-black  flex justify-center items-center rounded-md"
                  placeholder=" "
                  ref={focusName}
                />
                <label
                  onClick={handleFocusingName}
                  htmlFor="Name"
                  className="absolute top-4 left-2 phemus-label"
                >
                  Name
                </label>
              </div>
            </div>
            <div className="sign-in-box px-3 flex pt-5 flex-col items-center justify-center ">
              <div className="relative w-full">
                <input
                  type="text"
                  className=" namefillboxprofile biofillboxprofile bg-black  flex justify-center items-center rounded-md"
                  placeholder=" "
                  ref={focusBio}
                />
                <label
                  onClick={handleFocusingBio}
                  htmlFor="text"
                  className="absolute top-4 left-2 phemus-label"
                >
                  Bio
                </label>
              </div>
            </div>
            <div className="sign-in-box px-3 flex pt-5 flex-col items-center justify-center ">
              <div className="relative w-full">
                <input
                  type="text"
                  className=" namefillboxprofile bg-black  flex justify-center items-center rounded-md"
                  placeholder=" "
                  ref={focusLocation}
                />
                <label
                  onClick={handleFocusingLocation}
                  htmlFor="email"
                  className="absolute top-4 left-2 phemus-label"
                >
                  Location
                </label>
              </div>
            </div>
            <div className="sign-in-box px-3 flex pt-5 flex-col items-center justify-center ">
              <div className="relative w-full">
                <input
                  type="text"
                  className=" namefillboxprofile bg-black  flex justify-center items-center rounded-md"
                  placeholder=" "
                  ref={focusWebsite}
                />
                <label
                  onClick={handleFocusingWebsite}
                  htmlFor="email"
                  className="absolute top-4 left-2 phemus-label"
                >
                  Website
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>}
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
            <p className=" text-xl font-semibold">{currentUser.displayName}</p>
            <p className="text-sm homelabelcolor">118 Tweets</p>
          </div>
        </header>
        <section className=" overflow-y-scroll h-full profilepagemainsection">
          <div className=" h-48 w-full  profilebacdropimage">
            
          </div>
          <div className="flex flex-col  relative">
            <div className="p-1 bg-black absolute rounded-full flex justify-center items-center profileimageinproflepage">
              <img
                src={currentUser?currentUser.profile_picture
                  :"https://picsum.photos/200/300"}
                alt="profile pic"
                className="rounded-full profileimageinproflepageimage relative h-32 w-32"
              />
            </div>
            <div className=" flex flex-row-reverse pt-3 pb-4  pr-5">
              <button onClick={() => {
                setprofileBlur(true)
              }} className=" font-semibold px-4 py-1 bg-black rounded-full profileMainEditButton">
                Edit Profile
              </button>
            </div>
            <div className="pl-4 pt-10">
              <p className=" font-black text-xl">{currentUser.displayName}</p>
              <p className="text-sm homelabelcolor">{currentUser.username}</p>
            </div>
            <div className="pl-4 pt-4 flex flex-col gap-2">
              <p>{currentUser.bioData}</p>
              <div className="homelabelcolor flex gap-2">
                {" "}
                <p>
                  <FontAwesomeIcon icon="fa-regular fa-calendar-days" />{" "}
                </p>
                {currentUser.timeJoined}
              </div>
              <div className="flex gap-4">
                <div>
                  <span className=" font-semibold">{currentUser.followingNumber.length === 1
                ? 0
                : [currentUser.followingNumber.length]} </span>
                  <span className="homelabelcolor">following</span>
                </div>
                <div>
                  <span className=" font-semibold">{currentUser.followersNumber.length === 1
                ? 0
                : [currentUser.followersNumber.length]} </span>
                  <span className="homelabelcolor">followers</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between profilepagetabholder mt-3">
            <div
              onClick={() => {
                setprofileTweetsTab(true);
                setprofileLikesTab(false);
              }}
              className="h-16 w-full flex items-center justify-center cursor-pointer profilepageTweetsbigTab"
            >
              <div
                style={
                  profileTweetsTab
                    ? { borderBottom: "3px solid var(--blueText)" }
                    : {}
                }
                className=" h-full flex justify-center items-center profilepageTweetsTab"
              >
                Tweets
              </div>
            </div>
            <div
              onClick={() => {
                setprofileTweetsTab(false);
                setprofileLikesTab(true);
              }}
              className="h-16 w-full flex items-center justify-center cursor-pointer profilepageLikesbigTab"
            >
              <div
                style={
                  profileLikesTab
                    ? { borderBottom: "3px solid var(--blueText)" }
                    : {}
                }
                className="h-full flex justify-center items-center profilepageLikesTab"
              >
                Likes
              </div>
            </div>
          </div>
          <section className=" h-96 w-full">
            {profileTweetsTab && <TweetStream />}
          </section>
        </section>
      </section>

      <HomeRight />
    </>
  );
}

export default ProfilePage;
