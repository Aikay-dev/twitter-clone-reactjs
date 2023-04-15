import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { exploreChangeState, settingsChangeState } from "../store";

library.add(fas);
library.add(fab);
library.add(far);

const Root = () => {
  const ifboldexp = useSelector((state) => state.exp.value.fontWeight);
  const ifboldset = useSelector((state) => state.set.value.fontWeight);
  const [windowWidth, SetwindowWidth] = useState(
    window.innerWidth > 1040
      ? "/Home/Settings/personalization"
      : "/Home/Settings/"
  );

  const dispatch = useDispatch();

  const page = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/Home") {
      navigate("/Home/Explore");
    } else if (window.location.pathname === "/Home/Explore") {
    } else {
    }
  }, []);

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
            </div>
          </section>
          <Outlet />
        </div>
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
        <div className="mobile-settings-call absolute bottom-0 bg-black text-white w-full h-30 px-6 py-4">
          <div className="flex">
            <SettingsTwoToneIcon />
            <p className="pl-3">Go to settings</p>
          </div>
          <button className="mobile-settings-call-cancel rounded-full w-full py-2 mt-5">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default Root;
