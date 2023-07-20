import React, { useEffect, useState } from "react";
import AuthLoginButton from "../../components/Auth-LoginButton";
import { setGoToSettingsFeat } from "../../store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import googleIcon from "../../assets/google_icon.svg";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../auth/SignUp";
import SearchBar from "../../components/SearchBar";
import { auth, signInWithGoogle } from "../../config/firebase";
import WhoToFollow from "../../components/WhoToFollow";
import PhotoSearch from "./PhotoSearch";
import TopSearch from "./TopSearch";
import PeopleSearch from "./PeopleSearch";
import { onValue, ref } from "firebase/database";
import { realTimeDatabase } from "../../config/firebase";

const Search = () => {
  const currentUser = useSelector((state) => state.currUsr.value);

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

        const foundTweets = [];

        Object.values(data).forEach((element) => {
          element.tweetText.split(" ").forEach((text) => {
            const trimmedSearchPreText = searchPreText.trim();
            if (text.toLowerCase() === trimmedSearchPreText.toLowerCase()) {
              foundTweets.push(element);
            }
          });
        });

        foundTweets.length > 0
          ? setSearchTweets(foundTweets)
          : setSearchTweets([null]);
      });

      const userRef = ref(realTimeDatabase, "users/");
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();

        const foundUser = [];

        function stripEmojis(text) {
          // remove emojis from the text
          return text.replace(
            /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{1FAD0}-\u{1FAFF}\u{1F6F4}-\u{1F6FF}\u{1F3FB}-\u{1F3FF}]/gu,
            ""
          );
        }

        Object.values(data).forEach((element) => {
          const displayNameRegex = stripEmojis(
            element.displayName.replace(/\s/g, "")
          );
          const usernameRegex = stripEmojis(
            element.username.replace(/\s/g, "")
          );
          const sanitizedSearchRegex = new RegExp(
            stripEmojis(searchPreText.replace(/\s/g, "")),
            "i"
          );

          if (
            sanitizedSearchRegex.test(displayNameRegex) ||
            sanitizedSearchRegex.test(usernameRegex)
          ) {
            foundUser.push(element);

            setSearchPeople(foundUser);
          }
        });
      });
      setsearchPermit(false);
    } else {
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
        <header className="homeBorder-bottom z-10 bg-black search-header w-full ">
          <div className="homepage-header py-3 w-full flex h-16 px-4 gap-1 items-center justify-between">
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
                    "go-2-settings-blur homepage-auth-overlay z-20 h-screen fixed w-screen"
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
        <section className="h-screen overflow-y-scroll pt-28">
          {PhotosTab && <PhotoSearch searchTweets={searchTweets} />}
          {topsearchTab && <TopSearch searchTweets={searchTweets} />}
          {PeopleTab && (
            <PeopleSearch
              searchTweets={searchTweets}
              searchPeople={searchPeople}
            />
          )}
          <div className=" h-60"></div>
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
