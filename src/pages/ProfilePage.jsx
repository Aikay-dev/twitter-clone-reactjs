import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "./Home/HomeRight";
import { useSelector, useDispatch } from "react-redux";
import { realTimeDatabase } from "../config/firebase";
import { ref, onValue } from "firebase/database";
import { ref as strgRef } from "firebase/storage";
import { update } from "firebase/database";
import { storage } from "../config/firebase";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../pages/auth/components/Loader";
import UserTweets from "../database/UserTweets";
import { BsFillPatchCheckFill } from "react-icons/bs";
import LikedTweets from "../database/LikedTweets";

library.add(fas);
library.add(fab);
library.add(far);

function ProfilePage() {
  const currentUser = useSelector((state) => state.currUsr.value);

  const [userProfileDetails, setuserProfileDetails] = useState({
    ...currentUser,
  });
  console.log(userProfileDetails.bioData);
  const [profileTweetsTab, setprofileTweetsTab] = useState(true);
  const [profileLikesTab, setprofileLikesTab] = useState(false);
  const [profileBlur, setprofileBlur] = useState(false);
  const [prflImgLoader, setprflImgLoader] = useState(false);
  const [updatedPrfPic, setupdatedPrfPic] = useState(null);
  const [profileDetails, setprofileDetails] = useState({});
  const [profileDetailsOwner, setprofileDetailsOwner] = useState({});
  const [gottenProfile, setgottenProfile] = useState(false);
  const [followState, setfollowState] = useState("");
  const [followStyle, setfollowStyle] = useState({});
  useEffect(() => {
    const currentDir = window.location.pathname;
    const extractedText = currentDir.split("/").filter(Boolean).pop();
    console.log(extractedText);
    setprofileDetailsOwner(decodeURIComponent(extractedText));
  }, []);

  useEffect(() => {
    return () => {
      // Code to run when the component unmounts or when the URL changes again
      console.log("Component unmounted or URL changed again");
    };
  }, [window.location.pathname]);

  useEffect(() => {
    if (profileDetailsOwner.length > 0) {
      let ownersRef = ref(realTimeDatabase, "/users");
      onValue(ownersRef, (snapshot) => {
        const users = snapshot.val();
        console.log(users);

        for (const key in users) {
          if (users.hasOwnProperty(key)) {
            const user = users[key];
            if (user.username === profileDetailsOwner) {
              console.log(user);
              setprofileDetails(user);
              setgottenProfile(true);
            }
          }
        }
      });
    }
  }, [profileDetailsOwner]);

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

  const updateProfileInfo = () => {
    if (
      userProfileDetails.displayName.length < 3 ||
      userProfileDetails.displayName.length > 15
    ) {
      console.log(userProfileDetails.displayName.length);
    } else {
      updateNode("users/" + currentUser.userId, userProfileDetails);
      setprofileBlur(false);
      console.log(userProfileDetails.displayName.length);
    }
  };

  useEffect(() => {
    for (let i = 0; i < currentUser.followingNumber.length; i++) {
      if (profileDetails.userId === currentUser.followingNumber[i]) {
        setfollowState("following");
        setfollowStyle({ backgroundColor: "var(--homeLabelColor)" });
      } else {
        setfollowState("follow");
        setfollowStyle({ backgroundColor: "white" });
      }
    }
    console.log("This is your profile details", profileDetails);
    console.log("This is your profile details", currentUser.followingNumber[0]);
  }, [profileDetails]);

  function handleFollow() {
    let followUpdate = { ...currentUser };
    let followedUpdate = { ...profileDetails };
    if (followState === "follow") {
      setfollowState("following");
      setfollowStyle({ backgroundColor: "var(--homeLabelColor)" });

      followedUpdate.followersNumber.push(currentUser.userId);
      if (followUpdate.followingNumber[0] === 0) {
        followUpdate.followingNumber = [profileDetails.userId];
      } else {
        const holder = [...followUpdate.followingNumber]
        holder.push(profileDetails.userId)
        followUpdate.followingNumber = holder
      }

      if (followedUpdate.followersNumber[0] === 0) {
        followedUpdate.followersNumber = [currentUser.userId];
      } else {
        followedUpdate.followersNumber.push(currentUser.userId);
      }

      updateNode("users/" + currentUser.userId, followUpdate);
      updateNode("users/" + profileDetails.userId, followedUpdate);
    } else {
      setfollowState("follow");
      setfollowStyle({ backgroundColor: "white" });
      // Remove the profileDetails.userId from followUpdate.followingNumber if necessary
      const index = followUpdate.followingNumber.indexOf(profileDetails.userId);
      if (index !== -1) {
        if (followUpdate.followingNumber.length === 1) {
          followUpdate.followingNumber = [0];
        } else {
          const holder = [...followUpdate.followingNumber]
          holder.splice(index, 1)
          followUpdate.followingNumber = holder
        }
      }
      updateNode("users/" + currentUser.userId, followUpdate);
      const index2 = followedUpdate.followersNumber.indexOf(currentUser.userId);
      if (index2 !== -1) {
        if (followedUpdate.followersNumber.length === 1) {
          followedUpdate.followersNumber = [0];
        } else {
          followedUpdate.followersNumber.splice(index, 1);
        }
      } else {
        console.log("e no dey");
      }
      updateNode("users/" + profileDetails.userId, followedUpdate);
    }
    // Update the currentUser object with the updated followUpdate
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
                onClick={updateProfileInfo}
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
                      setuserProfileDetails({
                        ...userProfileDetails,
                        displayName: input,
                      });
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
      {gottenProfile && (
        <section className="homepage-center h-full relative overflow-hidden">
          <header className="flex pt-1 pb-1 z-10 w-full bg-black profilePageHeader">
            <div
              className="personalization-and-data-head-nav-arrow-holder flex items-center justify-center cursor-pointer rounded-full h-8 w-8 ml-2 mt-2 mr-8"
              onClick={() => window.history.back()}
            >
              <span className="text-base">
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
              </span>
            </div>
            <div>
              <p className=" text-xl font-semibold flex items-center gap-1">
                <span>{profileDetails.displayName}</span>
                {profileDetails.badgedUser && (
                  <span className="bluetext">
                    <BsFillPatchCheckFill />
                  </span>
                )}
              </p>
              <p className="text-sm homelabelcolor">
                <span>{Object.keys(profileDetails.userTweets).length - 1}</span>{" "}
                Tweets
              </p>
            </div>
          </header>
          <section className=" overflow-y-scroll pb-20 h-full profilepagemainsection">
            <div className=" h-48 w-full  profilebacdropimage"></div>
            <div className="flex flex-col  relative">
              <div className="p-1 bg-black absolute rounded-full flex justify-center items-center profileimageinproflepage">
                <img
                  src={
                    profileDetails
                      ? profileDetails.profile_picture
                      : "https://picsum.photos/200/300"
                  }
                  alt="profile pic"
                  className="rounded-full profileimageinproflepageimage relative h-32 w-32"
                />
              </div>
              {currentUser.username === profileDetails.username ? (
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
              ) : (
                <div className=" flex flex-row-reverse pt-3 pb-4  pr-5">
                  <button
                    style={followStyle}
                    onClick={handleFollow}
                    className=" font-semibold px-4 py-1 text-black rounded-full"
                  >
                    <span>{followState}</span>
                  </button>
                </div>
              )}

              <div className="pl-4">
                <p className=" text-xl font-black flex items-center gap-1">
                  <span>{profileDetails.displayName}</span>
                  {profileDetails.badgedUser && (
                    <span className="bluetext">
                      <BsFillPatchCheckFill />
                    </span>
                  )}
                </p>
                <p className="text-sm homelabelcolor">
                  {profileDetails.username}
                </p>
              </div>

              <div className="px-4 pt-4 flex flex-col gap-2">
                {profileDetails.bioData.length === 0 ? (
                  ""
                ) : (
                  <p className=" bioinprofile whitespace-pre-wrap">
                    {profileDetails.bioData}
                  </p>
                )}
                <div className=" flex-wrap gap-3 h-15">
                  <div className="flex gap-3">
                    <div className="homelabelcolor flex gap-2">
                      {" "}
                      <p>
                        <FontAwesomeIcon icon="fa-regular fa-calendar-days" />{" "}
                      </p>
                      {profileDetails.timeJoined}
                    </div>
                    {profileDetails.locatonData.length === 0 ? (
                      ""
                    ) : (
                      <div className="homelabelcolor flex gap-2">
                        {" "}
                        <p>
                          <FontAwesomeIcon icon="fa-solid fa-location-dot" />{" "}
                        </p>
                        {profileDetails.locatonData}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {profileDetails.websiteData.length === 0 ? (
                      ""
                    ) : (
                      <div className="homelabelcolor flex gap-2">
                        {" "}
                        <p>
                          <FontAwesomeIcon icon="fa-solid fa-link" />{" "}
                        </p>
                        <a href={profileDetails.websiteData}>
                          <p className="signup-link">
                            {profileDetails.websiteData}
                          </p>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className=" font-semibold">
                      {profileDetails.followingNumber[0] === 0
                        ? 0
                        : [profileDetails.followingNumber.length]}{" "}
                    </span>
                    <span className="homelabelcolor">following</span>
                  </div>
                  <div>
                    <span className=" font-semibold">
                      {profileDetails.followersNumber[0] === 0
                        ? 0
                        : [profileDetails.followersNumber.length]}{" "}
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
              {profileTweetsTab && (
                <UserTweets profileDetails={profileDetails} />
              )}
              {!profileTweetsTab && (
                <LikedTweets profileDetails={profileDetails} />
              )}
              <div className=" h-52"></div>
            </section>
          </section>
        </section>
      )}
      {!gottenProfile && <Loader />}
      <HomeRight />
    </>
  );
}

export default ProfilePage;
