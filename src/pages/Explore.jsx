import React, { useState, useEffect } from "react";
import AuthLoginButton from "../components/Auth-LoginButton";
import Trendstream from "../components/TrendStream";
import Happening from "../components/Happening";
import { blurChangeState, setGoToSettingsFeat } from "../store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import googleIcon from "../assets/google_icon.svg";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./auth/SignUp";
import SearchBar from "../components/SearchBar";
import { auth, realTimeDatabase, signInWithGoogle } from "../config/firebase";
import { mobileNavLeftState } from "../store";
import Loader from "./auth/components/Loader";
import WhoToFollow from "../components/WhoToFollow";
import { onValue, ref } from "firebase/database";
import SmLoader from "./auth/components/SmLoader";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

library.add(fas);
library.add(fab);
library.add(far);

const Explore = () => {
  const currentUser = useSelector((state) => state.currUsr.value);

  const ifBlur = useSelector((state) => state.user.value.display);
  const [showSignUpCard, setshowSignUpCard] = useState(false);
  const [happeningDataLoaded, sethappeningDataLoaded] = useState(false);
  const googleSignButton = (
    <div className="flex items-center justify-center">
      <img src={googleIcon} alt="" className="h-8 flex w-8" />
      Sign in with Google
    </div>
  );
  const [mostfollowedLoading, setmostfollowedLoading] = useState(true);
  const [mostfollowedData, setmostfollowedData] = useState({});
  const appleSignButton = (
    <>
      <FontAwesomeIcon icon="fa-brands fa-apple" className="apple-in-login" />
      <span className="pl-1 text-black">Sign in with Apple</span>
    </>
  );
  const join_create_account = "Create account";
  const dispatch = useDispatch();
  const mobNavleft = useSelector((state) => state.mobNavleft.value);
  const HandleSignIn = () => {
    const screenWidth = window.innerWidth;

    signInWithGoogle();
  };
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(realTimeDatabase, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArr = Object.values(data);

        let largestFollowercount = 0;
        let largestfollowerdata;
        dataArr.forEach((user) => {
          if (
            user.followersNumber[0] !== 0 &&
            user.followersNumber.length !== 1
          ) {
            if (user.followersNumber.length > largestFollowercount) {
              largestFollowercount = user.followersNumber.length;
              largestfollowerdata = user;
            }
          }
        });
        Object.values(largestfollowerdata).length > 1
          ? handlemostfolloweddisp(largestfollowerdata)
          : setmostfollowedLoading(true);
      }
    });
  }, []);

  function handlemostfolloweddisp(largestfollowerdata) {
    setmostfollowedLoading(false);
    setmostfollowedData(largestfollowerdata);
  }

  return (
    <>
      <div>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              backgroundColor: "rgb(29, 155, 240)",
              color: "#ffffff",
              padding: "10px",
            },
            success: {
              iconTheme: {
                primary: "green",
                secondary: "white",
              },
            },
          }}
          reverseOrder={false}
        />
      </div>
      {showSignUpCard && (
        <div className="absolute z-10 explore-signup-card">
          <SignUp setshowSignUpCard={setshowSignUpCard} />
        </div>
      )}
      <section className="homepage-center h-screen relative overflow-hidden">
        <div className="homepage-header sticky py-3 w-full flex h-16 px-4 gap-1 items-center justify-between">
          {auth.currentUser === null && (
            <Link
              to="/"
              className=" mobile-search-box-bird text-white text-3xl rounded mr-3"
            >
              <FontAwesomeIcon icon="fab fa-twitter" />
            </Link>
          )}
          {auth.currentUser !== null && (
            <div
              className="home-nav-profile-image exploreProfileDiv pt-2 w-14 h-14  flex justify-center items-center"
              onClick={() => {
                dispatch(mobileNavLeftState(true));
                document.body.classList.add("overlay-open");
              }}
            >
              <img
                src={currentUser.profile_picture}
                alt="user profile image"
                className="rounded-full w-8 h-8"
              />
            </div>
          )}
          <SearchBar currentUser={auth.currentUser} toast={toast} />
          <Link
            onClick={() => {
              dispatch(blurChangeState({ display: "block" }));
            }}
            to="/Home/Explore/Login"
            className="homepage-header-settings-icon text-base p-2 flex justify-center items-center rounded-full cursor-pointer"
          >
            <SettingsTwoToneIcon fontSize="small" />
          </Link>
          <Link
            className="ellipses-mobile-explore-header ml-4"
            onClick={() => {
              dispatch(
                setGoToSettingsFeat(
                  "go-2-settings-blur homepage-auth-overlay h-screen fixed w-screen"
                )
              );
              document.body.classList.add("overlay-open");
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </Link>
        </div>

        <div className="homepage-center-info cursor-pointer h-full overflow-y-scroll ">
          {!mostfollowedLoading && mostfollowedData && (
            <div
              onClick={() => {
                auth.currentUser === null
                  ? navigate("/auth/Login")
                  : navigate("/Home/" + mostfollowedData.username);
              }}
              className=" overflow-scroll mx-3 rounded-xl most-followed-user-card"
            >
              <p className=" whitespace-nowrap text-2xl pl-3 font-bold pt-2 text-fuchsia-200">
                Most followed user 🤩🎊
              </p>
              <div className="flex">
                <div className=" flex w-14 flex-col gap-10 items-center justify-center">
                  <div>
                    <img
                      src={mostfollowedData.profile_picture}
                      alt="user profile image"
                      className="rounded-full h-12 w-12 cursor-pointer"
                      style={{ marginLeft: "9px" }}
                    />
                  </div>
                  <p className="text-fuchsia-200 font-extrabold text-3xl pl-5">
                    #{mostfollowedData.followersNumber.length}
                  </p>
                </div>
                <div className=" pl-5 w-full flex flex-col">
                  <p className=" text-2xl font-bold whitespace-nowrap">
                    {mostfollowedData.displayName}
                  </p>
                  <div></div>
                  <p className="text-sm">{mostfollowedData.bioData}</p>
                </div>
              </div>
              <div className="flex items-center justify-end pr-3 whitespace-nowrap">
                <p className="text-sm">
                  Tweeter inc. {new Date().getFullYear()}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center">
            {mostfollowedLoading && <SmLoader />}
          </div>
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
            <Happening
              happeningDataLoaded={happeningDataLoaded}
              sethappeningDataLoaded={sethappeningDataLoaded}
            />
            {!happeningDataLoaded && <Loader />}
            <div className="mb-40 pl-3 h-14 flex items-center cursor-pointer homepage-center-whats-happening-showmore">
              {happeningDataLoaded && <p>Show more</p>}
            </div>
          </div>
        </div>
      </section>
      <section className="homepage-right h-screen">
        {auth.currentUser === null && (
          <div className="homepage-right-box mt-3 lg:mt-3 lg:m-auto px-5 py-3 ml-5 rounded-2xl flex flex-col items-center justify-center">
            <p className="homepage-right-new-twitter font-black text-xl pb-2">
              New to Tweeter?
            </p>
            <p className="homepage-right-sign-now">
              Sign up now to get your own personalized timeline!
            </p>
            <div
              onClick={(e) => {
                e.preventDefault();
                HandleSignIn();
              }}
            >
              <AuthLoginButton
                logo={googleSignButton}
                classes={
                  "rounded-full google-butt-login text-black mt-5 mb-3 next-signup-button new-to-tweeter-button"
                }
              />
            </div>
            <AuthLoginButton
              logo={appleSignButton}
              classes={
                "rounded-full font-semibold flex items-center justify-center apple-butt-login new-to-tweeter-button"
              }
            />
            <Link to="/Auth/Signup">
              <AuthLoginButton
                logo={join_create_account}
                classes={
                  "rounded-full google-butt-login mt-3 font-semibold mb-5 new-to-tweeter-button"
                }
              />
            </Link>
            <p className="homepage-right-By-sign">
              By signing up, you agree to the{" "}
              <Link className="signup-link">Terms of Service</Link> and{" "}
              <Link className="signup-link">Privacy Policy</Link>, including{" "}
              <Link className="signup-link">Cookie Use.</Link>
            </p>
          </div>
        )}

        {auth.currentUser !== null && (
          <div className="pl-5">
            <WhoToFollow />
          </div>
        )}
      </section>
      <div
        className="absolute inset-0 flex justify-center items-center text-white homepage-auth-overlay"
        style={{ display: ifBlur }}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target === e.currentTarget) {
            console.log("blur div");
          }
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Explore;
