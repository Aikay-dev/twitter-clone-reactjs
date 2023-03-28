import React from "react";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import AuthLoginButton from "../components/Auth-LoginButton";
import googleIcon from "../assets/google_icon.svg";

library.add(fas);
library.add(fab);
library.add(far);

const Root = () => {
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

  const join_create_account = "Create account";

  return (
    <>
      {/* <Link to = '/auth/Login'>TWITTER</Link> */}
      <div className="bg-black">
        <div className="homepage h-screen bg-black flex m-auto">
          <section className="homepage-left h-screen">
            <div className="homepage-bird text-white text-3xl pt-3 rounded flex items-center justify-center">
              <FontAwesomeIcon icon="fab fa-twitter" />
            </div>
            <div className="section1-main flex flex-col gap-5 pt-5">
              <div className="section1-main-explore text-xl font-semibold">
                <span className="pl-2">
                  <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                </span>
                <span className="pl-6">Explore</span>
              </div>
              <div className="section1-main-setting text-xl flex text-white">
                <span className="pl-1">
                  <SettingsTwoToneIcon />
                </span>
                <span className="pl-5">Settings</span>
              </div>
            </div>
          </section>
          <section className="homepage-center h-screen relative ">
            <div className="homepage-header sticky py-3 w-full flex h-16 px-5 items-center justify-between">
              <div className="homepage-header-searchbar">
                <input
                  type="text"
                  className="homepage-header-searchbox h-10 rounded-full outline-none pl-16"
                  placeholder="Search Tweeter"
                />
                <label className="homepage-header-label absolute left-12 top-5 outline-none">
                  <FontAwesomeIcon icon="fas fa-magnifying-glass" />
                </label>
              </div>
              <div className="text-base">
                <SettingsTwoToneIcon fontSize="small" />
              </div>
            </div>
          </section>
          <section className="homepage-right h-screen">
            <div className="homepage-right-box m-auto mt-3 p-5 rounded-2xl">
              <p className="homepage-right-new-twitter font-black text-xl pb-2">New to Tweeter?</p>
              <p className="homepage-right-sign-now">Sign up now to get your own personalized timeline!</p>
              <AuthLoginButton
                logo={googleSignButton}
                classes={
                  "rounded-full google-butt-login text-black mt-5 mb-5 next-signup-button"
                }
              />
              <AuthLoginButton
                logo={appleSignButton}
                classes={
                  "rounded-full font-semibold flex items-center justify-center apple-butt-login"
                }
              />
              <AuthLoginButton
                logo={join_create_account}
                classes={"rounded-full google-butt-login mt-5 font-semibold mb-5"}
              />
              <p className="homepage-right-By-sign">
                By signing up, you agree to the <Link className="signup-link">Terms of Service</Link> and <Link className="signup-link">Privacy
                Policy</Link>, including <Link className="signup-link">Cookie Use.</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Root;
