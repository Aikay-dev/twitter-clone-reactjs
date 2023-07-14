import React, { useEffect, useState } from "react";
import AuthLoginButton from "../../components/Auth-LoginButton";
import Trendstream from "../../components/TrendStream";
import Happening from "../../components/Happening";
import { blurChangeState, setGoToSettingsFeat } from "../../store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import googleIcon from "../../assets/google_icon.svg";
import { useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../auth/SignUp";
import SearchBar from "../../components/SearchBar";
import { auth, signInWithGoogle } from "../../config/firebase";
import Loader from "../auth/components/Loader";
import WhoToFollow from "../../components/WhoToFollow";
import PhotoSearch from "./PhotoSearch";
import TopSearch from "./TopSearch";
import PeopleSearch from "./PeopleSearch";
import { onValue, ref } from "firebase/database";
import { realTimeDatabase } from "../../config/firebase";

const Search = () => {
  console.log(auth.currentUser);
  const currentUser = useSelector((state) => state.currUsr.value);
  console.log(currentUser);
  const ifBlur = useSelector((state) => state.user.value.display);
  const [showSignUpCard, setshowSignUpCard] = useState(false);
  const [topsearchTab, settopsearchTab] = useState(true);
  const [PeopleTab, setPeopleTab] = useState(false);
  const [PhotosTab, setPhotosTab] = useState(false);
  const [searchTweets, setSearchTweets] = useState([]);
  const [searchPermit, setsearchPermit] = useState(true);
  const [searchPeople, setSearchPeople] = useState([]);
  const [searchExtractText, setsearchExtractText] = useState("");
  const [searchPreText, setsearchPreText] = useState("");

  useEffect(() => {
    const currentDir = window.location.pathname;
    const extractedText = currentDir.split("/").filter(Boolean).pop();
    console.log(extractedText);
    setsearchExtractText(extractedText);
  }, []);

  useEffect(() => {
    if (searchExtractText) {
      setsearchPreText(searchExtractText);
    }
  }, [searchExtractText]);

  useEffect(() => {
    if (searchPermit && searchPreText.length > 0) {
      const tweetRef = ref(realTimeDatabase, "tweetPool/");
      onValue(tweetRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        console.log(searchPreText);
        const foundTweets = [];

        Object.values(data).forEach((element) => {
          element.tweetText.split(" ").forEach((text) => {
            const trimmedSearchPreText = searchPreText.trim();
            if (text.toLowerCase() === trimmedSearchPreText.toLowerCase()) {
              foundTweets.push(element);
            }
          });
        });

        console.log(foundTweets);

        foundTweets.length > 0
          ? setSearchTweets(foundTweets)
          : setSearchTweets([null]);
      });

      const userRef = ref(realTimeDatabase, "users/");
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const foundUser = [];

        Object.values(data).forEach((element) => {
          const regexDN = new RegExp(
            element.displayName.replace(/\s/g, "").toLowerCase(),
            "i"
          );
          const regexUN = new RegExp(
            element.username.replace(/\s/g, "").toLowerCase(),
            "i"
          );

          const sanitizedSearchPreText = searchPreText
            .replace(/\s/g, "")
            .toLowerCase();

          if (
            regexDN.test(sanitizedSearchPreText) ||
            regexUN.test(sanitizedSearchPreText)
          ) {
            foundUser.push(element);
            console.log(foundUser);
          } else {
            /* console.log(regexDN + " and " + sanitizedSearchPreText);
            console.log("No match");
            console.log(regexDN.test(sanitizedSearchPreText)); */
            const displayName = "Sapa Bro";
            const searchQuery = "sapa";

            const regexDN = new RegExp(
              searchQuery.replace(/\s/g, "").toLowerCase(),
              "i"
            );
            const isMatch = regexDN.test(displayName);

            console.log(isMatch); // Output: true
          }
        });

        console.log(foundUser);
      });
      setsearchPermit(false);
    } else {
      console.log("no search permit");
    }
  }, [searchPreText, searchPermit]);

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
  const dispatch = useDispatch();
  const HandleSignIn = () => {
    const screenWidth = window.innerWidth;
    console.log("first2");

    signInWithGoogle();
  };

  return (
    <>
      {showSignUpCard && (
        <div className="absolute z-10 explore-signup-card">
          <SignUp setshowSignUpCard={setshowSignUpCard} />
        </div>
      )}
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="homeBorder-bottom">
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
                className="personalization-and-data-head-nav-arrow-holder flex items-center justify-center cursor-pointer rounded-full h-8 w-9"
                onClick={() => window.history.back()}
              >
                <span className="text-base">
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </span>
              </div>
            )}
            <SearchBar
              currentUser={auth.currentUser}
              setSearchTweets={setSearchTweets}
              searchTweets={searchTweets}
            />
            <Link
              className="ml-4 p-2 flex justify-center items-center rounded-full search-ellipse"
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
          <div className="flex  overflow-x-scroll search-top-nav-bar">
            <button
              onClick={() => {
                settopsearchTab(true);
                setPeopleTab(false);
                setPhotosTab(false);
              }}
              className="px-10 search-nav-button-hover pt-3 cursor-pointer"
            >
              <div
                className=" h-full "
                style={
                  topsearchTab
                    ? {
                        borderBottom: "3px solid rgb(29, 155, 240)",
                        fontWeight: 600,
                      }
                    : { color: "rgb(113, 118, 123)" }
                }
              >
                <p className="pb-2">Top</p>
              </div>
            </button>
            <button
              onClick={() => {
                settopsearchTab(false);
                setPeopleTab(true);
                setPhotosTab(false);
              }}
              className="px-10 search-nav-button-hover pt-3 cursor-pointer"
            >
              <div
                className=" h-full "
                style={
                  PeopleTab
                    ? {
                        borderBottom: "3px solid rgb(29, 155, 240)",
                        fontWeight: 600,
                      }
                    : { color: "rgb(113, 118, 123)" }
                }
              >
                <p className="pb-2">People</p>
              </div>
            </button>
            <button
              onClick={() => {
                settopsearchTab(false);
                setPeopleTab(false);
                setPhotosTab(true);
              }}
              className="px-10 search-nav-button-hover pt-3 cursor-pointer"
            >
              <div
                className=" h-full "
                style={
                  PhotosTab
                    ? {
                        borderBottom: "3px solid rgb(29, 155, 240)",
                        fontWeight: 600,
                      }
                    : { color: "rgb(113, 118, 123)" }
                }
              >
                <p className="pb-2">Photos</p>
              </div>
            </button>
          </div>
        </header>
        <section className="h-screen overflow-y-scroll">
          {PhotosTab && <PhotoSearch searchTweets={searchTweets} />}
          {topsearchTab && <TopSearch searchTweets={searchTweets} />}
          {PeopleTab && (
            <PeopleSearch
              searchTweets={searchTweets}
              searchPeople={searchPeople}
            />
          )}
          <div className=" h-48"></div>
        </section>
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
                console.log("first");
              }}
            >
              <AuthLoginButton
                logo={googleSignButton}
                classes={
                  "rounded-full google-butt-login text-black mt-5 mb-3 next-signup-button next-signup-button-home-variant"
                }
              />
            </div>
            <AuthLoginButton
              logo={appleSignButton}
              classes={
                "rounded-full font-semibold flex items-center justify-center apple-butt-login apple-butt-login-home-variant"
              }
            />
            <Link to="/Auth/Signup">
              <AuthLoginButton
                logo={join_create_account}
                classes={
                  "rounded-full google-butt-login mt-3 font-semibold mb-5 create-acc-home"
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
      >
        <Outlet />
      </div>
    </>
  );
};

export default Search;
