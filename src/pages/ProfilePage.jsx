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
import { realTimeDatabase } from "../config/firebase";
import { ref } from "firebase/database";
import { ref as strgRef } from "firebase/storage";
import { update } from "firebase/database";
import { storage } from "../config/firebase";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../pages/auth/components/Loader";
import UserTweets from "../database/UserTweets";

library.add(fas);
library.add(fab);
library.add(far);

function ProfilePage() {
  const currentUser = useSelector((state) => state.currUsr.value);
  console.log(currentUser);

  const [userProfileDetails, setuserProfileDetails] = useState({
    ...currentUser,
  });
  console.log(userProfileDetails.bioData);
  const [profileTweetsTab, setprofileTweetsTab] = useState(true);
  const [profileLikesTab, setprofileLikesTab] = useState(false);
  const [profileBlur, setprofileBlur] = useState(false);
  const dispatch = useDispatch();
  const mobNavleft = useSelector((state) => state.mobNavleft.value);
  const [prflImgLoader, setprflImgLoader] = useState(false);
  const [updatedPrfPic, setupdatedPrfPic] = useState(null);

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

  const updateNode = (path, newData) => {
    const dbRef = ref(realTimeDatabase, path);
    update(dbRef, newData)
      .then(() => {
        console.log("Data updated successfully");
        setprofileBlur(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  function handleProfileImg(e) {
    setprflImgLoader(true);
    console.log(e);
    const fileName = Date.now() + "_" + e.name;
    const profilePics = strgRef(storage, `profilePics/${fileName}`);
    uploadBytes(profilePics, e)
      .then((snapshot) => {
        console.log("Upload complete");

        // Get the download URL of the uploaded file
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setuserProfileDetails({
            ...userProfileDetails,
            profile_picture: downloadURL,
          });
          setupdatedPrfPic(downloadURL);
          setprflImgLoader(false);

          console.log("File available at: " + downloadURL);
          // Perform further actions with the download URL as needed
        });
      })
      .catch((error) => {
        console.log("Upload error: " + error.message);
      });
  }

  return (
    <>
      {profileBlur && (
        <div
          onClick={(e) => {
            e.stopPropagation;
            setprofileBlur(false);
          }}
          className=" overflow-y-scroll h-full flex justify-center items-center w-full homepage-auth-overlay fixed z-50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className=" bg-black inputprofiledetailbox h-full overflow-y-scroll"
          >
            <div className="flex justify-between p-3">
              <div className="flex gap-10 pl-2 items-center">
                <button
                  onClick={() => {
                    setprofileBlur(false);
                  }}
                  className="text-xl cursor-pointer p-1 rounded-full px-2 flex profileEx"
                >
                  <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </button>
                <p className="font-semibold text-xl">Edit profile</p>
              </div>
              <button
                onClick={() => {
                  updateNode("users/" + currentUser.userId, userProfileDetails);
                }}
                className="bg-white text-black saveprofilebuttton rounded-full px-4 py-1 font-semibold"
              >
                Save
              </button>
            </div>
            <div className=" ">
              <div className="px-3 relative ">
                {prflImgLoader && (
                  <div className="absolute profileImgLoader">
                    <Loader />
                  </div>
                )}
                <input
                  onChange={(e) => {
                    handleProfileImg(e.target.files[0]);
                  }}
                  multiple={false}
                  className="hidden"
                  type="file"
                  id="fileInput"
                  accept="image/*"
                />
                <label
                  htmlFor="fileInput"
                  className=" cursor-pointer absolute profileImagesChangeButton text-6xl "
                >
                  <FontAwesomeIcon icon="fa-solid fa-camera" />
                </label>
                <img
                  src={
                    updatedPrfPic === null
                      ? currentUser.profile_picture
                      : updatedPrfPic
                  }
                  alt="user profile image"
                  className="rounded-full h-24 w-24 mt-10"
                />
              </div>
              <div className="sign-in-box px-3 flex pt-5 flex-col items-center justify-center ">
                <div className="relative w-full">
                  <input
                    value={userProfileDetails.displayName}
                    type="text"
                    className=" namefillboxprofile bg-black  flex justify-center items-center rounded-md"
                    placeholder=" "
                    ref={focusName}
                    onChange={(event) => {
                      const input = event.target.value;
                      if (input.length >= 3 && input.length <= 10) {
                        setuserProfileDetails({
                          ...userProfileDetails,
                          displayName: input,
                        });
                        console.log(userProfileDetails);
                      }
                    }}
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
                    value={userProfileDetails.bioData}
                    type="text"
                    className=" namefillboxprofile biofillboxprofile bg-black  flex justify-center items-center rounded-md"
                    placeholder=" "
                    ref={focusBio}
                    onChange={(event) => {
                      const input = event.target.value;
                      if (input.length <= 100) {
                        setuserProfileDetails({
                          ...userProfileDetails,
                          bioData: input,
                        });
                      }
                    }}
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
                    value={userProfileDetails.locationData}
                    type="text"
                    className=" namefillboxprofile bg-black  flex justify-center items-center rounded-md"
                    placeholder=" "
                    ref={focusLocation}
                    onChange={(event) => {
                      setuserProfileDetails({
                        ...userProfileDetails,
                        locatonData: event.target.value,
                      });
                    }}
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
                    value={userProfileDetails.websiteData}
                    type="text"
                    className=" namefillboxprofile bg-black  flex justify-center items-center rounded-md"
                    placeholder=" "
                    ref={focusWebsite}
                    onChange={(event) => {
                      setuserProfileDetails({
                        ...userProfileDetails,
                        websiteData: event.target.value,
                      });
                    }}
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
        </div>
      )}
      <section className="homepage-center h-full relative overflow-hidden">
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
        <section className=" overflow-y-scroll pb-20 h-full profilepagemainsection">
          <div className=" h-48 w-full  profilebacdropimage"></div>
          <div className="flex flex-col  relative">
            <div className="p-1 bg-black absolute rounded-full flex justify-center items-center profileimageinproflepage">
              <img
                src={
                  currentUser
                    ? currentUser.profile_picture
                    : "https://picsum.photos/200/300"
                }
                alt="profile pic"
                className="rounded-full profileimageinproflepageimage relative h-32 w-32"
              />
            </div>
            <div className=" flex flex-row-reverse pt-3 pb-4  pr-5">
              <button
                onClick={() => {
                  setprofileBlur(true);
                }}
                className=" font-semibold px-4 py-1 bg-black rounded-full profileMainEditButton"
              >
                Edit Profile
              </button>
            </div>
            <div className="pl-4">
              <p className=" font-black text-xl">{currentUser.displayName}</p>
              <p className="text-sm homelabelcolor">{currentUser.username}</p>
            </div>

            <div className="px-4 pt-4 flex flex-col gap-2">
              {currentUser.bioData.length === 0 ? (
                ""
              ) : (
                <p className=" bioinprofile whitespace-pre-wrap">
                  {currentUser.bioData}
                </p>
              )}
              <div className=" flex-wrap gap-3 h-15">
                <div className="flex gap-3">
                  <div className="homelabelcolor flex gap-2">
                    {" "}
                    <p>
                      <FontAwesomeIcon icon="fa-regular fa-calendar-days" />{" "}
                    </p>
                    {currentUser.timeJoined}
                  </div>
                  {currentUser.locatonData.length === 0 ? (
                    ""
                  ) : (
                    <div className="homelabelcolor flex gap-2">
                      {" "}
                      <p>
                        <FontAwesomeIcon icon="fa-solid fa-location-dot" />{" "}
                      </p>
                      {currentUser.locatonData}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  {currentUser.websiteData.length === 0 ? (
                    ""
                  ) : (
                    <div className="homelabelcolor flex gap-2">
                      {" "}
                      <p>
                        <FontAwesomeIcon icon="fa-solid fa-link" />{" "}
                      </p>
                      <a href={currentUser.websiteData}>
                        <p className="signup-link">{currentUser.websiteData}</p>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className=" font-semibold">
                    {currentUser.followingNumber.length === 1
                      ? 0
                      : [currentUser.followingNumber.length]}{" "}
                  </span>
                  <span className="homelabelcolor">following</span>
                </div>
                <div>
                  <span className=" font-semibold">
                    {currentUser.followersNumber.length === 1
                      ? 0
                      : [currentUser.followersNumber.length]}{" "}
                  </span>
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
            {profileTweetsTab && <UserTweets />}
            <div className="h-32 flex justify-center items-center">
              <button onClick={() => {
                location.reload(true)
              }} className="flex bg-blue-500 rounded-full w-20 justify-center items-center">refresh</button>
            </div>
          </section>
        </section>
      </section>

      <HomeRight />
    </>
  );
}

export default ProfilePage;
