import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import AuthLoginButton from "../components/Auth-LoginButton";
import googleIcon from "../assets/google_icon.svg";
import AdministrativeLinks from "../components/AdministrativeLinks";
import Trendstream from "../components/TrendStream";
import Happening from "../components/Happening";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../store";

library.add(fas);
library.add(fab);
library.add(far);

const Root = () => {
  const dispatch = useDispatch();
  const ifBlur = useSelector((state) => state.user.value.display);
  const googleSignButton = (
    <div className="flex items-center justify-center">
      <img src={googleIcon} alt="" className="h-8 flex w-8" />
      Sign in with Google
    </div>
  );

  const appleSignButton = (
    <>
      <FontAwesomeIcon icon="fa-brands fa-apple" className="apple-in-login" />
      <span className="pl-1 text-black">Sign in with Apple</span>
    </>
  );
  let currentDate = new Date();
  const join_create_account = "Create account";
  console.log(useLocation());

  return (
    <>
      <div className="bg-black">
        <div className="homepage h-screen bg-black flex m-auto">
          <section className="homepage-left h-screen hidden sm:block">
            <Link
              to="/"
              className="homepage-bird text-white text-3xl w-full pt-3 rounded flex items-center justify-center"
            >
              <FontAwesomeIcon icon="fab fa-twitter" />
            </Link>
            <div className="section1-main flex cursor-pointer flex-col gap-2 pt-5">
              <div
                className="section1-main-explore text-2xl font-semibold flex justify-center items-center"
                style={{ fontWeight: "bold" }}
              >
                <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                <span className="hidden xl:block xl:pl-6">Explore</span>
              </div>
              <div className="section1-main-search text-xl font-semibold flex justify-center items-center">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </div>
              <div
                className="section1-main-setting cursor-pointer text-2xl flex justify-center items-center text-white"
                style={{ fontWeight: 100 }}
              >
                <SettingsTwoToneIcon />
                <Link className="hidden xl:block xl:pl-5">Settings</Link>
              </div>
            </div>
          </section>
          <section className="homepage-center h-screen relative overflow-hidden">
            <div className="homepage-header sticky py-3 w-full flex h-16 px-5 items-center justify-between">
              <div className="homepage-header-searchbar w-full">
                <input
                  type="text"
                  className="homepage-header-searchbox h-10 rounded-full outline-none pl-16"
                  placeholder="Search Tweeter"
                />
                <label className="homepage-header-label absolute left-12 top-5 outline-none">
                  <FontAwesomeIcon icon="fas fa-magnifying-glass" />
                </label>
              </div>
              <Link
                onClick={() => dispatch(changeState({ display: "block" }))}
                to="/Home/Login"
                className="homepage-header-settings-icon text-base p-2 flex justify-center items-center rounded-full cursor-pointer"
              >
                <SettingsTwoToneIcon fontSize="small" />
              </Link>
            </div>
            <div className="homepage-center-info h-full overflow-y-scroll ">
              <p className="homepage-center-info-trends text-xl font-extrabold pb-3 px-3">
                Trends for you
              </p>
              <Trendstream />
              <div className="homepage-center-showmoreinfo pl-3 h-14 flex items-center cursor-pointer">
                Show more
              </div>
              <div className="homepage-center-whats-happening pt-3">
                <p className="homepage-center-whats-happening-head px-3 font-extrabold">
                  What's happening
                </p>
                <Happening />
                <div className="mb-40 pl-3 h-14 flex items-center cursor-pointer homepage-center-whats-happening-showmore">
                  Show more
                </div>
              </div>
            </div>
          </section>
          <section className="homepage-right h-screen">
            <div className="homepage-right-box mt-3 lg:mt-3 lg:m-auto px-5 py-3 ml-5 rounded-2xl flex flex-col items-center justify-center">
              <p className="homepage-right-new-twitter font-black text-xl pb-2">
                New to Tweeter?
              </p>
              <p className="homepage-right-sign-now">
                Sign up now to get your own personalized timeline!
              </p>
              <AuthLoginButton
                logo={googleSignButton}
                classes={
                  "rounded-full google-butt-login text-black mt-5 mb-3 next-signup-button next-signup-button-home-variant"
                }
              />
              <AuthLoginButton
                logo={appleSignButton}
                classes={
                  "rounded-full font-semibold flex items-center justify-center apple-butt-login apple-butt-login-home-variant"
                }
              />
              <AuthLoginButton
                logo={join_create_account}
                classes={
                  "rounded-full google-butt-login mt-3 font-semibold mb-5 create-acc-home"
                }
              />
              <p className="homepage-right-By-sign">
                By signing up, you agree to the{" "}
                <Link className="signup-link">Terms of Service</Link> and{" "}
                <Link className="signup-link">Privacy Policy</Link>, including{" "}
                <Link className="signup-link">Cookie Use.</Link>
              </p>
            </div>
            <AdministrativeLinks currentDate={currentDate} />
          </section>
        </div>

        <div
          className="absolute inset-0 flex justify-center items-center text-white homepage-auth-overlay"
          style={{ display: ifBlur }}
        >
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
      </div>
    </>
  );
};

export default Root;
