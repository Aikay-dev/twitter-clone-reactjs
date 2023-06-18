import React, { useEffect, useState } from "react";
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
import { BiHomeCircle, BiSearch } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { RiHome7Fill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { MdMailOutline } from "react-icons/md";
import { signOut } from "firebase/auth";
import { FaSearch } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import LeftNav from "./Home/mobile components/LeftNav";

library.add(fas);
library.add(fab);
library.add(far);

const Root = ({ authState, setAuthState }) => {
  const dispatch = useDispatch();

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

  const page = useParams();
  const navigate = useNavigate();
  const currentLocation = window.location.pathname;
  console.log(authState);
  const settingsClassState =
    authState === null
      ? "mobile-settings-call fixed bottom-0 bg-black text-white w-full h-30 px-6 py-4"
      : "mobile-settings-call fixed bottom-10 bg-black text-white w-full h-30 px-6 py-4";
  const [homeLogoutCard, sethomeLogoutCard] = useState(false);

  return (
    <>
      {homeLogoutCard && (
        <div className=" flex justify-center items-center homepage-auth-overlay h-full w-full absolute z-50">
          <div className="bg-black flex flex-col text-white  w-80 rounded-2xl p-5 ">
            <div
              className="text-xl mb-6 flex items-center cursor-pointer"
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    setLogoutspinner(false);
                    navigate("/auth/Login");
                    console.log("user: signed out");
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }}
            >
              <AiOutlineUserAdd />
              <p className="ml-3">Add an existing account</p>
            </div>
            <div
              className="text-xl flex items-center cursor-pointer"
              onClick={() => {
                window.location.href = "/auth";
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
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-bell" />
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
                  to="/Home/Profile"
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
                        src="https://picsum.photos/200/300"
                        alt="user profile image"
                        className="rounded-full h-10 w-10"
                      />
                    </div>
                    <div className="home-nav-acc-button-user">
                      <p className="home-nav-displayname font-semibold">
                        Hail Hydra
                      </p>
                      <p className="home-nav-username">@general ik</p>
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
              <Home />
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
                  people on Twitter are the first to know.
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
          <nav className="w-screen bg-black fixed mobile-bottom-nav h-14 justify-around bottom-0 text-2xl items-center">
            <Link
              to="/Home"
              onClick={() => {
                dispatch(settingsChangeState({ fontWeight: 100 }));
                dispatch(exploreChangeState({ fontWeight: "Bold" }));
                setHomeClicked(true);
                setsearchClicked(false);
                setbellClicked(false);
                setmessageClicked(false);
              }}
            >
              {!homeClicked && <BiHomeCircle />}
              {homeClicked && <RiHome7Fill />}
            </Link>
            <Link
              to="/Home/Explore"
              onClick={() => {
                dispatch(settingsChangeState({ fontWeight: 100 }));
                dispatch(exploreChangeState({ fontWeight: "Bold" }));
                setHomeClicked(false);
                setsearchClicked(true);
                setbellClicked(false);
                setmessageClicked(false);
              }}
            >
              {!searchClicked && <BiSearch />}
              {searchClicked && <FaSearch />}
            </Link>
            <Link to="/Home/Notifications">
              <button
                onClick={() => {
                  setHomeClicked(false);
                  setsearchClicked(false);
                  setbellClicked(true);
                  setmessageClicked(false);
                }}
              >
                {!bellClicked && <FontAwesomeIcon icon="fa-regular fa-bell" />}
                {bellClicked && <BsBellFill />}
              </button>
            </Link>
            <Link to="/Home/Messages">
              <button
                onClick={() => {
                  setHomeClicked(false);
                  setsearchClicked(false);
                  setbellClicked(false);
                  setmessageClicked(true);
                }}
              >
                {!messageClicked && <MdMailOutline />}
                {messageClicked && <MdMail />}
              </button>
            </Link>
          </nav>
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
