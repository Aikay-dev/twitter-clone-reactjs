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
} from "../store";
import { auth } from "../config/firebase";
import Home from "./Home/Home";

library.add(fas);
library.add(fab);
library.add(far);

const Root = () => {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState(
    useSelector((state) => state.userAuth.value)
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuthState) => {
      if (userAuthState !== null) {
        console.log("New authentication state:", userAuthState.email);
        setAuthState(userAuthState.email);
        dispatch(checkAuthState(userAuthState.email));
      } else {
        if (
          window.location.pathname === "/Home" ||
          window.location.pathname === "/Home/"
        ) {
          navigate("/Home/Explore");
        } else if (window.location.pathname === "/Home/Explore") {
        }
        console.log("No user is signed in");
        console.log("object");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const ifboldexp = useSelector((state) => state.exp.value.fontWeight);
  const ifboldset = useSelector((state) => state.set.value.fontWeight);
  const ifsetfeat = useSelector((state) => state.gotosetfeat.value);
  const [windowWidth, SetwindowWidth] = useState(
    window.innerWidth > 1040
      ? "/Home/Settings/personalization"
      : "/Home/Settings/"
  );

  const page = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-black flex justify-center">
        <div className="homepage h-screen bg-black flex">
          <section className="homepage-left h-screen pl-14 hidden sm:block">
            <Link
              to="/"
              className="homepage-bird text-white text-3xl w-full pt-3 rounded flex items-center justify-center"
            >
              <FontAwesomeIcon icon="fab fa-twitter" />
            </Link>

            <div className="section1-main flex cursor-pointer flex-col gap-2 pt-5">
              {authState && (
                <Link>
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                  </div>
                  <p>Home</p>
                </Link>
              )}

              <Link
                to="/Home/Explore"
                onClick={() => {
                  dispatch(settingsChangeState({ fontWeight: 100 }));
                  dispatch(exploreChangeState({ fontWeight: "Bold" }));
                }}
                className="section1-main-explore text-xl flex justify-center items-center"
                style={{ fontWeight: ifboldexp }}
              >
                <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                <span className="hidden xl:block xl:pl-6">Explore</span>
              </Link>

              <div className="section1-main-search text-xl font-semibold flex justify-center items-center">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </div>

              {!authState && (
                <Link
                  to={windowWidth}
                  onClick={() => {
                    dispatch(exploreChangeState({ fontWeight: 100 }));
                    dispatch(settingsChangeState({ fontWeight: "Bold" }));
                  }}
                  className="section1-main-setting cursor-pointer text-xl flex justify-center items-center text-white"
                  style={{ fontWeight: ifboldset }}
                >
                  <SettingsTwoToneIcon />
                  <span className="hidden xl:block xl:pl-5">Settings</span>
                </Link>
              )}
              {authState && (
                <Link>
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-bell" />
                  </div>
                  <p>Notifications</p>
                </Link>
              )}
              {authState && (
                <Link>
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-envelope" />
                  </div>
                  <p>Messages</p>
                </Link>
              )}
              {authState && (
                <Link>
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                  </div>
                  <p>Bookmarks</p>
                </Link>
              )}
              {authState && (
                <Link>
                  <div>
                    <FontAwesomeIcon icon="fa-brands fa-square-twitter" />
                  </div>
                  <p>Tweeter Blue</p>
                </Link>
              )}
              {authState && (
                <Link>
                  <div>
                    <FontAwesomeIcon icon="fa-regular fa-user" />
                  </div>
                  <p>Profile</p>
                </Link>
              )}
              {authState && (
                <Link>
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                  </div>
                  <p>More</p>
                </Link>
              )}
            </div>
            <button>Tweet</button>
            <div>
              <div>
                <div>
                  <img src="" alt="" />
                </div>
                <div>
                  <p>Hail Hydra</p>
                  <p>@general ik</p>
                </div>
              </div>
              <div>
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
              </div>
            </div>
          </section>
          {authState && <Home />}
          <Outlet />
        </div>
        {authState === null ? (
          <div className="homepage-login-banner py-2 absolute bottom-0 w-full flex items-center justify-center">
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
          <div className="mobile-settings-call fixed bottom-0 bg-black text-white w-full h-30 px-6 py-4">
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
      </div>
    </>
  );
};

export default Root;
