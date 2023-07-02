import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { useSelector, useDispatch } from "react-redux";
import {
  exploreChangeState,
  settingsChangeState,
  setGoToSettingsFeat,
  checkAuthState,
  mobileNavLeftState,
} from "../store";
import { auth } from "../config/firebase";
import Home from "./Home/Home";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import LeftNav from "./Home/mobile components/LeftNav";
import BottomNav from "./Home/mobile components/BottomNav";
import { getTweetDate } from "../utility/dateJoined";
import LoaderWhite from "../components/LoaderWhite";
import { ref as strgRef } from "firebase/storage";
import { ref, update, push } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import { storage } from "../config/firebase";
import { uploadBytes, getDownloadURL } from "firebase/storage";

library.add(fas);
library.add(fab);
library.add(far);

const Root = ({ authState, setAuthState, currentUser }) => {
  const dispatch = useDispatch();
  console.log(currentUser);
  /* STATE MANAGEMENT */
  const [setNdpriv, setSetNdpriv] = useState(false);
  const [logoutspinner, setLogoutspinner] = useState(false);
  const windowWidth =
    window.innerWidth > 1040
      ? "/Home/Settings/personalization"
      : "/Home/Settings/";

  const [homeClicked, setHomeClicked] = useState(true);
  const [searchClicked, setsearchClicked] = useState(false);
  const [bellClicked, setbellClicked] = useState(false);
  const [messageClicked, setmessageClicked] = useState(false);
  const [homeTabButtonClicked, sethomeTabButtonClicked] = useState(true);
  const [notificationTabButtonClicked, setnotificationTabButtonClicked] =
    useState(false);
  const [messagesTabButtonClicked, setmessagesTabButtonClicked] =
    useState(false);
  const [bookmarkTabButtonClicked, setbookmarkTabButtonClicked] =
    useState(false);
  const [tweeterBlueTabButtonClicked, settweeterBlueTabButtonClicked] =
    useState(false);
  const [profileTabButtonClicked, setprofileTabButtonClicked] = useState(false);
  const [profileBlur, setprofileBlur] = useState(false);
  const tweetTextareaRef = useRef(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const ImageTweetInputRef = useRef(null);
  const [tweetingLoader, settweetingLoader] = useState(false);
  const [tweetData, settweetData] = useState({
    profilePic: currentUser.profile_picture,
    displayName: currentUser.displayName,
    username: currentUser.username,
    tweetText: "",
    tweetImageLink: "",
    tweetDate: getTweetDate(),
    comments: [0],
    retweets: [0],
    likes: [0],
    tweetId: Date.now(),
  });
  const [uploadComplete, setUploadComplete] = useState(false);
  const timestamp = Date.now();
  const [imageToGrabLink, setImageToGrabLink] = useState(null);
  const [showNotifAlert, setshowNotifAlert] = useState(false);
  const [scrollPositionHome, setScrollPositionHome] = useState(0);
  const [mainTweetScrollOffset, setmainTweetScrollOffset] = useState(0);
  const [tweetCache, setTweetCache] = useState([]);

  /* END STATE MANAGEMENT */
  useEffect(() => {
    // Code to run when the component mounts and when the URL changes
    console.log(window.location.pathname);
    if (
      window.location.pathname === "/Home" ||
      window.location.pathname === "/Home/"
    ) {
      setHomeClicked(true);
      setsearchClicked(false);
      setbellClicked(false);
      setmessageClicked(false);
    } else if (
      window.location.pathname === "/Home/Explore" ||
      window.location.pathname === "/Home/Explore/"
    ) {
      setHomeClicked(false);
      setsearchClicked(true);
      setbellClicked(false);
      setmessageClicked(false);
    } else if (
      window.location.pathname === "/Home/Notifications" ||
      window.location.pathname === "/Home/Notifications/"
    ) {
      setHomeClicked(false);
      setsearchClicked(false);
      setbellClicked(true);
      setmessageClicked(false);
    } else if (
      window.location.pathname === "/Home/Messages" ||
      window.location.pathname === "/Home/Messages/"
    ) {
      setHomeClicked(false);
      setsearchClicked(false);
      setbellClicked(false);
      setmessageClicked(true);
    } else {
      setHomeClicked(false);
      setsearchClicked(false);
      setbellClicked(false);
      setmessageClicked(false);
    }

    // Clean up function for when the component unmounts or when the URL changes again
    return () => {
      // Code to run when the component unmounts or when the URL changes again
      console.log("Component unmounted or URL changed again");
    };
  }, [window.location.href]);

  const ifboldexp = useSelector((state) => state.exp.value.fontWeight);
  const ifboldset = useSelector((state) => state.set.value.fontWeight);
  const ifsetfeat = useSelector((state) => state.gotosetfeat.value);

  const mobNavleft = useSelector((state) => state.mobNavleft.value);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuthState) => {
      if (userAuthState !== null) {
        console.log("New authentication state:", userAuthState.email);
        setAuthState(userAuthState.email);
        dispatch(checkAuthState(userAuthState.email));
      } else if (
        window.location.pathname === "/Home" ||
        window.location.pathname === "/Home/" ||
        window.location.pathname === "/Home/Notifications" ||
        window.location.pathname === "/Home/Notifications/" ||
        window.location.pathname === "/Home/Messages" ||
        window.location.pathname === "/Home/Messages/" ||
        window.location.pathname === "/Home/Bookmarks" ||
        window.location.pathname === "/Home/Bookmarks/" ||
        window.location.pathname === "/Home/Tweeter%20Blue" ||
        window.location.pathname === "/Home/Tweeter%20Blue/" ||
        window.location.pathname === "/Home/Profile" ||
        window.location.pathname === "/Home/Profile"
      ) {
        navigate("/Home/Explore");
      }
    });

    return () => unsubscribe();
  }, [dispatch, window.location.href]);

  useEffect(() => {
    // Code to run when the component mounts and when the URL changes
    if (
      window.location.pathname === "/Home" ||
      window.location.pathname === "/Home/"
    ) {
      sethomeTabButtonClicked(true);
      setnotificationTabButtonClicked(false);
      setmessagesTabButtonClicked(false);
      setbookmarkTabButtonClicked(false);
      settweeterBlueTabButtonClicked(false);
      setprofileTabButtonClicked(false);
      dispatch(exploreChangeState({ fontWeight: 100 }));
    } else if (
      window.location.pathname === "/Home/Notifications" ||
      window.location.pathname === "/Home/Notifications/"
    ) {
      sethomeTabButtonClicked(false);
      setnotificationTabButtonClicked(true);
      setmessagesTabButtonClicked(false);
      setbookmarkTabButtonClicked(false);
      settweeterBlueTabButtonClicked(false);
      setprofileTabButtonClicked(false);
      dispatch(exploreChangeState({ fontWeight: 100 }));
    } else if (
      window.location.pathname === "/Home/Messages" ||
      window.location.pathname === "/Home/Messages/"
    ) {
      sethomeTabButtonClicked(false);
      setnotificationTabButtonClicked(false);
      setmessagesTabButtonClicked(true);
      setbookmarkTabButtonClicked(false);
      settweeterBlueTabButtonClicked(false);
      setprofileTabButtonClicked(false);
      dispatch(exploreChangeState({ fontWeight: 100 }));
    } else if (
      window.location.pathname === "/Home/Bookmarks" ||
      window.location.pathname === "/Home/Bookmarks/"
    ) {
      sethomeTabButtonClicked(false);
      setnotificationTabButtonClicked(false);
      setmessagesTabButtonClicked(false);
      setbookmarkTabButtonClicked(true);
      settweeterBlueTabButtonClicked(false);
      setprofileTabButtonClicked(false);
      dispatch(exploreChangeState({ fontWeight: 100 }));
    } else if (
      window.location.pathname === "/Home/Tweeter%20Blue" ||
      window.location.pathname === "/Home/Tweeter%20Blue/"
    ) {
      sethomeTabButtonClicked(false);
      setnotificationTabButtonClicked(false);
      setmessagesTabButtonClicked(false);
      setbookmarkTabButtonClicked(false);
      settweeterBlueTabButtonClicked(true);
      setprofileTabButtonClicked(false);
      dispatch(exploreChangeState({ fontWeight: 100 }));
    } else if (
      window.location.pathname === "/Home/Profile" ||
      window.location.pathname === "/Home/Profile"
    ) {
      sethomeTabButtonClicked(false);
      setnotificationTabButtonClicked(false);
      setmessagesTabButtonClicked(false);
      setbookmarkTabButtonClicked(false);
      settweeterBlueTabButtonClicked(false);
      setprofileTabButtonClicked(true);
      dispatch(exploreChangeState({ fontWeight: 100 }));
    } else if (
      window.location.pathname === "/Home/Explore" ||
      window.location.pathname === "/Home/Explore"
    ) {
      dispatch(exploreChangeState({ fontWeight: "Bold" }));
      sethomeTabButtonClicked(false);
      setnotificationTabButtonClicked(false);
      setmessagesTabButtonClicked(false);
      setbookmarkTabButtonClicked(false);
      settweeterBlueTabButtonClicked(false);
      setprofileTabButtonClicked(false);
    }

    console.log(window.location.pathname);

    // Clean up function for when the component unmounts or when the URL changes again
    return () => {
      // Code to run when the component unmounts or when the URL changes again
      console.log("Component unmounted or URL changed again");
    };
  }, [window.location.href]);

  /* Manage states based on height */
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [leftNavScrollState, setLeftNavScrollState] = useState("");

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowHeight > 630) {
      setLeftNavScrollState("homepage-left h-screen pl-14 hidden sm:block");
    } else {
      setLeftNavScrollState(
        "homepage-left h-screen pl-14 hidden sm:block overflow-y-scroll overflow-x-hidden"
      );
    }
  }, [windowHeight]);

  /* Manage states based on height */

  useEffect(() => {
    console.log(currentUser);
    if (Object.keys(currentUser).length > 0) {
      if (currentUser.seenNotification) {
        if (
          currentUser.notificationData.length !== currentUser.seenNotification
        ) {
          setshowNotifAlert(true);
        } else {
          setshowNotifAlert(false);
        }
      } else {
        console.log("no seenNotification");
      }
    }
  }, [currentUser]);

  function uploadTweetText(e) {
    settweetData({ ...tweetData, tweetText: e });
    return tweetData;
  }

  function handleImgUpload(e) {
    setImageToGrabLink(e);
    const file = e;
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageToUpload(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  const handleResetUploadImage = () => {
    ImageTweetInputRef.current.value = null;
    setImageToUpload(null);
    setImageToGrabLink(null);
  };

  function finalUploadTweet() {
    if (imageToGrabLink !== null) {
      const fileName = Date.now() + "_" + imageToGrabLink.name;
      const TweetPics = strgRef(storage, `TweetPictures/${fileName}`);
      uploadBytes(TweetPics, imageToGrabLink).then((snapshot) => {
        console.log("Upload complete");

        // Get the download URL of the uploaded file
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            // Update tweetData with the tweetImageLink
            settweetData((prevData) => ({
              ...prevData,
              tweetImageLink: downloadURL,
            }));

            console.log("File available at: " + downloadURL);
          })
          .catch((error) => {
            console.log("Upload error: " + error.message);
            settweetingLoader(false);
          })
          .finally(() => {
            console.log(tweetData);
            setUploadComplete(true);
          });
      });
    } else {
      pushupTweet();
    }
  }

  useEffect(() => {
    if (uploadComplete) {
      pushupTweet();
      console.log(tweetData);
      setUploadComplete(false);
    }
  }, [uploadComplete]);

  function pushupTweet() {
    settweetData((prevData) => ({
      ...prevData,
      tweetId: Date.now(),
    }));
    updateTweetNode();
  }

  const updateNode = (path, newData) => {
    const dbRef = ref(realTimeDatabase, path);
    update(dbRef, newData)
      .then(() => {
        console.log("Data updated successfully");
        setprofileBlur(false);
        toast.success("Tweeted successfully");
        settweetingLoader(false);
        setImageToUpload(null);
        settweetData((prevData) => ({
          ...prevData,
          tweetImageLink: "",
        }));
        setImageToGrabLink(null);
        handleTweetFormReset();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        settweetingLoader(false);
      });
  };

  function updateTweetNode() {
    updateNode("tweetPool/" + tweetData.tweetId, tweetData);
    const userTweetsRef = ref(
      realTimeDatabase,
      "users/" + currentUser.userId + "/userTweets"
    );
    push(userTweetsRef, tweetData.tweetId)
      .then(() => {
        console.log("TweetId added to userTweets array.");
      })
      .catch((error) => {
        console.error("Error adding tweetId to userTweets array:", error);
      });
  }

  const handleTweetFormReset = () => {
    tweetTextareaRef.current.value = "";
  };

  const page = useParams();
  const navigate = useNavigate();
  const currentLocation = window.location.pathname;
  const settingsClassState =
    authState === null
      ? "mobile-settings-call fixed bottom-0 bg-black text-white w-full h-30 px-6 py-4"
      : "mobile-settings-call fixed bottom-10 bg-black text-white w-full h-30 px-6 py-4";
  const [homeLogoutCard, sethomeLogoutCard] = useState(false);

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
            className=" bg-black inputtweetdetailbox overflow-hidden relative"
          >
            <nav className="text-white p-3 inputtweetdetailboxnav z-10 bg-black w-full">
              <button
                onClick={() => {
                  setprofileBlur(false);
                }}
                className="text-xl cursor-pointer p-1 rounded-full px-2 flex profileEx"
              >
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </button>
            </nav>
            <section className="pt-16  overflow-y-scroll inputtweetdetailboxnavhandler text-white px-4 home-main-tweet-section">
              <div className="flex">
                <div>
                  <img
                    src={currentUser.profile_picture}
                    alt="user profile image"
                    className="rounded-full h-10 w-10 mr-3 cursor-pointer"
                  />
                </div>
                <textarea
                  ref={tweetTextareaRef}
                  onInput={(e) => {
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    if (
                      e.currentTarget.clientHeight >
                      0.4 * window.innerHeight
                    ) {
                      e.currentTarget.style.height = `${
                        0.4 * window.innerHeight
                      }px`;
                      e.currentTarget.style.overflowY = "scroll";
                    } else {
                      e.currentTarget.style.overflowY = "hidden";
                    }
                    if (e.currentTarget.rows > 7) {
                      e.currentTarget.rows = 7;
                    }
                  }}
                  type="text"
                  rows="5"
                  placeholder="What's happening?"
                  className="w-full text-xl pl-3 outline-none bg-black tweethomepagetextarea"
                  onChange={(e) => {
                    uploadTweetText(e.target.value);
                  }}
                />
              </div>
              <div className="pl-16">
                {imageToUpload && (
                  <div className=" h-48 w-full relative">
                    <button
                      onClick={() => {
                        setImageToUpload("");
                        handleResetUploadImage();
                      }}
                      className="text-xl absolute z-10 left-1 top-1 uploadtweetimageex cursor-pointer p-1 rounded-full px-2 flex profileEx"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </button>
                    <img
                      src={imageToUpload}
                      alt=""
                      className="uploadtweetimage absolute "
                    />
                  </div>
                )}
              </div>
              <div className="mt-7 bg-black pb-3 tweetwebluttext ">
                <FontAwesomeIcon icon="fa-solid fa-earth-americas" /> Everyone
                can reply
              </div>
            </section>
            <section className="px-4 py-3  w-full bottom-0">
              <div className="flex mt-6 justify-between items-center home-main-tweet-section-bottom">
                <div className="flex gap-3">
                  <input
                    ref={ImageTweetInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      handleImgUpload(e.target.files[0]);
                    }}
                    className="hidden"
                    type="file"
                    name="uploadImage"
                    id="uploadImage"
                  />
                  <label htmlFor="uploadImage" className=" cursor-pointer">
                    <FontAwesomeIcon icon="fa-regular fa-image" />
                  </label>
                  <div className=" cursor-pointer">
                    <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (
                      tweetData.tweetText.length > 0 ||
                      imageToUpload !== null
                    ) {
                      settweetingLoader(true);
                      finalUploadTweet();
                      console.log(tweetData);
                      console.log(tweetTextareaRef);
                    } else {
                      console.log("not uploading");
                    }
                  }}
                  className=" flex justify-center items-center home-main-tweet-section-button text-white px-4 rounded-full py-1 font-semibold"
                >
                  {!tweetingLoader && "Tweet"}
                  {tweetingLoader && (
                    <div className="flex w-11 h-6 justify-center items-center">
                      <LoaderWhite />
                    </div>
                  )}
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
      {homeLogoutCard && (
        <div className=" flex justify-center items-center homepage-auth-overlay h-full w-full absolute z-50">
          <div className="bg-black flex flex-col text-white  w-80 rounded-2xl p-5 ">
            <div
              className="text-xl mb-6 flex items-center cursor-pointer"
              onClick={() => {
                window.location.href = "/auth/Login";
              }}
            >
              <AiOutlineUserAdd />
              <p className="ml-3">Add an existing account</p>
            </div>
            <div
              className="text-xl flex items-center cursor-pointer"
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    setLogoutspinner(false);
                    location.reload();
                    console.log("user: signed out");
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }}
            >
              <FiLogOut />
              <p className="m ml-3">Logout account</p>
              {logoutspinner && (
                <div class="ml-3 loadingio-spinner-rolling-o8a0fs8tskj">
                  <div class="ldio-t5x32ssrll9">
                    <div></div>
                  </div>
                </div>
              )}
            </div>
            <button
              className="text text-xl mt-16 p-3 flex justify-center items-center rounded-full homelogouthovercancel"
              onClick={() => {
                sethomeLogoutCard(false);
              }}
            >
              <p>Cancel</p>
            </button>
          </div>
        </div>
      )}
      <div className=" bg-black flex justify-center">
        <div className="homepage h-screen bg-black flex">
          <section className={leftNavScrollState}>
            <Link
              to="/"
              className="homepage-bird text-white text-3xl w-full pt-3 rounded flex items-center justify-center"
            >
              <FontAwesomeIcon icon="fab fa-twitter" />
            </Link>

            <div className="section1-main flex cursor-pointer flex-col pt-5">
              {authState && (
                <Link
                  to="/Home"
                  className="flex section1-main-home-icon-long-home text-xl  justify-center"
                  aria-label="Home"
                  style={
                    homeTabButtonClicked
                      ? { fontWeight: "Bold" }
                      : { fontWeight: 100 }
                  }
                >
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                  </div>
                  <p className="hidden xl:block xl:pl-6">Home</p>
                </Link>
              )}

              <Link
                aria-label="Explore"
                to="/Home/Explore"
                onClick={() => {
                  dispatch(settingsChangeState({ fontWeight: 100 }));
                  dispatch(exploreChangeState({ fontWeight: "Bold" }));
                }}
                className="section1-main-explore flex text-xl  justify-center items-center"
                style={{ fontWeight: ifboldexp }}
              >
                <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                <span className="hidden xl:block xl:pl-6">Explore</span>
              </Link>

              {!authState && (
                <div
                  aria-label="Search"
                  className="section1-main-search text-xl font-semibold flex justify-center items-center"
                >
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </div>
              )}

              {!authState && (
                <Link
                  aria-label="Settings"
                  to={windowWidth}
                  onClick={() => {
                    dispatch(exploreChangeState({ fontWeight: 100 }));
                    dispatch(settingsChangeState({ fontWeight: "Bold" }));
                  }}
                  className=" overscroll-x-none section1-main-setting cursor-pointer text-xl flex justify-center items-center text-white"
                  style={{ fontWeight: ifboldset }}
                >
                  <SettingsTwoToneIcon />
                  <span className="hidden xl:block xl:pl-5">Settings</span>
                </Link>
              )}
              {authState && (
                <Link
                  aria-label="Notifications"
                  className="flex section1-main-home-icon-long-notif text-xl  justify-center items-center"
                  to="/Home/Notifications"
                  style={
                    notificationTabButtonClicked
                      ? { fontWeight: "Bold" }
                      : { fontWeight: 100 }
                  }
                >
                  <div className="relative">
                    <FontAwesomeIcon icon="fa-regular fa-bell" />
                    {showNotifAlert && (
                      <div className="bluetext text-xs absolute top-0 right-0">
                        <FontAwesomeIcon icon="fa-solid fa-circle" />
                      </div>
                    )}
                  </div>
                  <p className="hidden xl:block xl:pl-6">Notifications</p>
                </Link>
              )}
              {authState && (
                <Link
                  aria-label="Messages"
                  className="flex section1-main-home-icon-long-messge text-xl  justify-center items-center"
                  to="/Home/Messages"
                  style={
                    messagesTabButtonClicked
                      ? { fontWeight: "Bold" }
                      : { fontWeight: 100 }
                  }
                >
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-envelope" />
                  </div>
                  <p className="hidden xl:block xl:pl-6">Messages</p>
                </Link>
              )}
              {authState && (
                <Link
                  aria-label="Bookmarks"
                  className="flex section1-main-home-icon-long-bkmrk text-xl  justify-center items-center"
                  to="/Home/Bookmarks"
                  style={
                    bookmarkTabButtonClicked
                      ? { fontWeight: "Bold" }
                      : { fontWeight: 100 }
                  }
                >
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                  </div>
                  <p className="hidden xl:block xl:pl-6">Bookmarks</p>
                </Link>
              )}
              {authState && (
                <Link
                  aria-label="Tweeter Blue"
                  className="flex section1-main-home-icon-long text-xl  justify-center items-center"
                  to="/Home/Tweeter Blue"
                  style={
                    tweeterBlueTabButtonClicked
                      ? { fontWeight: "Bold" }
                      : { fontWeight: 100 }
                  }
                >
                  <div>
                    <FontAwesomeIcon icon="fa-brands fa-square-twitter" />
                  </div>
                  <p className="hidden xl:block xl:pl-6 whitespace-nowrap">
                    Tweeter Dev
                  </p>
                </Link>
              )}
              {authState && (
                <Link
                  aria-label="Profile"
                  className="flex section1-main-home-icon-profile text-xl  justify-center items-center"
                  to={"/Home/" + currentUser.username}
                  style={
                    profileTabButtonClicked
                      ? { fontWeight: "Bold" }
                      : { fontWeight: 100 }
                  }
                >
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-user" />
                  </div>
                  <p className="hidden xl:block xl:pl-6">Profile</p>
                </Link>
              )}
              {authState && (
                <Link
                  to="/Home/Settings/"
                  aria-label="More"
                  className="flex section1-main-home-icon text-xl mb-2 justify-center items-center"
                >
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                  </div>
                  <p className="hidden xl:block xl:pl-6">More</p>
                </Link>
              )}
            </div>

            <div className="home-bottom-nav-holder">
              {authState && (
                <button
                  onClick={() => {
                    setprofileBlur(true);
                  }}
                  aria-label="Tweet"
                  className="home-nav-tweet-button rounded-full font-semibold"
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-feather-pointed"
                    className="home-nav-tweet-quil"
                  />
                  <span className="home-nav-tweet-tweet">Tweet</span>
                </button>
              )}
              {authState && (
                <div
                  className="flex mt-8 cursor-pointer items-center p-2 rounded-full home-nav-acc-button"
                  onClick={() => {
                    sethomeLogoutCard(true);
                  }}
                >
                  <div className="flex items-center">
                    <div className="home-nav-profile-image relative">
                      <img
                        src={
                          currentUser
                            ? currentUser.profile_picture
                            : "https://picsum.photos/200/300"
                        }
                        alt="user profile image"
                        className="rounded-full h-10 w-10"
                      />
                    </div>
                    <div className="home-nav-acc-button-user">
                      <p className="home-nav-displayname font-semibold">
                        {currentUser ? currentUser.displayName : "user"}
                      </p>
                      <p className="home-nav-username">
                        {currentUser ? currentUser.username : "@user"}
                      </p>
                    </div>
                  </div>
                  <div className="home-nav-acc-button-ellips">
                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                  </div>
                </div>
              )}
            </div>
          </section>
          {authState &&
            (currentLocation === "/Home/" || currentLocation === "/Home") && (
              <Home
                scrollPositionHome={scrollPositionHome}
                setScrollPositionHome={setScrollPositionHome}
                profileBlur={profileBlur}
                setprofileBlur={setprofileBlur}
                mainTweetScrollOffset={mainTweetScrollOffset}
                setmainTweetScrollOffset={setmainTweetScrollOffset}
                tweetCache={tweetCache}
                setTweetCache={setTweetCache}
              />
            )}
          {<Outlet />}
        </div>
        {authState === null ? (
          <div className="homepage-login-banner py-2 bottom-0 w-full fixed flex items-center justify-center">
            <div className="homepage-auth-banner-holder text-white  flex items-center justify-between">
              <div className="homepage-auth-banner-info md:block hidden">
                <p className="homepage-auth-banner-dont-miss font-bold text-2xl">
                  Don't miss what's happening
                </p>
                <p className="homepage-login-banner-people-on">
                  people on Tweeter are the first to know.
                </p>
              </div>
              <div className="homepage-login-banner-auth flex gap-3 w-full md:w-44">
                <Link
                  to="/auth/Login"
                  className="homepage-login-banner-auth-login ml-3 md:px-4 md:w-22 w-1/2 font-bold py-1 rounded-full"
                >
                  <p className="text-center">Login</p>
                </Link>
                <Link
                  to="/auth/Signup"
                  className="homepage-login-banner-auth-signup mr-3 md:px-4 md:w-22 w-1/2 font-bold py-1 whitespace-nowrap rounded-full bg-white text-black"
                >
                  <p className="text-center">Sign up</p>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className={ifsetfeat}
          onClick={() => {
            dispatch(
              setGoToSettingsFeat(
                "go-2-settings-blur homepage-auth-overlay h-screen hidden fixed w-screen"
              )
            );
            document.body.classList.remove("overlay-open");
          }}
        >
          <div className={settingsClassState}>
            <div className="flex">
              <SettingsTwoToneIcon />
              <Link
                to="/Home/Settings/"
                onClick={() => {
                  dispatch(
                    setGoToSettingsFeat(
                      "go-2-settings-blur homepage-auth-overlay h-screen hidden fixed w-screen"
                    )
                  );
                  document.body.classList.remove("overlay-open");
                }}
              >
                <p className="pl-3">Go to settings</p>
              </Link>
            </div>
            <button
              className="mobile-settings-call-cancel rounded-full w-full py-2 mt-5"
              onClick={() => {
                dispatch(
                  setGoToSettingsFeat(
                    "go-2-settings-blur homepage-auth-overlay h-screen hidden fixed w-screen"
                  )
                );
                document.body.classList.remove("overlay-open");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        {authState !== null && (
          <BottomNav
            homeClicked={homeClicked}
            setHomeClicked={setHomeClicked}
            searchClicked={searchClicked}
            setsearchClicked={setsearchClicked}
            bellClicked={bellClicked}
            setbellClicked={setbellClicked}
            messageClicked={messageClicked}
            setmessageClicked={setmessageClicked}
            exploreChangeState={exploreChangeState}
            settingsChangeState={settingsChangeState}
          />
        )}
      </div>
      {mobNavleft && (
        <>
          <LeftNav
            setLogoutspinner={setLogoutspinner}
            logoutspinner={logoutspinner}
            setSetNdpriv={setSetNdpriv}
            setNdpriv={setNdpriv}
            mobileNavLeftState={mobileNavLeftState}
            currentUser={currentUser}
            showNotifAlert={showNotifAlert}
            setshowNotifAlert={setshowNotifAlert}
          />
          <div
            className="absolute top-0 h-screen w-screen"
            style={{ backgroundColor: "rgba(77, 91, 102, 0.5)" }}
          ></div>
        </>
      )}
    </>
  );
};

export default Root;
