import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "./HomeRight";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mobileNavLeftState } from "../../store";
import { FaFeatherAlt } from "react-icons/fa";
import FollowingTweetStream from "./dataStream/FollowingTweetStream";
import { getTweetDate } from "../../utility/dateJoined";
import LoaderWhite from "../../components/LoaderWhite";
import { ref as strgRef } from "firebase/storage";
import { storage } from "../../config/firebase";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import generateRandomString from "../../utility/userIdAlgo";
import { ref, update, push } from "firebase/database";
import { realTimeDatabase } from "../../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import HomepageTweetStream from "../../database/HomepageTweetStream";
import WhiteStripeLoader from "../../components/WhiteStripeLoader";

library.add(fas);
library.add(fab);
library.add(far);

const Home = ({
  tweetCache,
  setTweetCache,
  mainTweetScrollOffset,
  setmainTweetScrollOffset,
  profileBlur,
  setprofileBlur,
  scrollPositionHome,
  setScrollPositionHome,
}) => {
  const dispatch = useDispatch();
  const mobNavleft = useSelector((state) => state.mobNavleft.value);
  const [ForyouTab, setForyouTab] = useState(true);
  const [FollowingTab, setFollowingTab] = useState(false);
  const currentUser = useSelector((state) => state.currUsr.value);
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
  const ImageTweetInputRef = useRef(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageToGrabLink, setImageToGrabLink] = useState(null);
  const [tweetingLoader, settweetingLoader] = useState(false);
  const tweetTextareaRef = useRef(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dispatchNewTweets, setdispatchNewTweets] = useState(false);
  const [newtweetsbuttonAnimation, setnewtweetsbuttonAnimation] = useState(
    "absolute  morenewtweetsbutton px-4 py-2 rounded-full"
  );
  const [tweetLoaded, setTweetLoaded] = useState(false);
  const [loadMoreTweets, setloadMoreTweets] = useState(false);
  const [loadingOldTweets, setloadingOldTweets] = useState(false);
  const [readyForScroll, setReadyForScroll] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = mainhomesectionRef.current;

    const handleScroll = () => {
      const currentPosition = scrollContainer.scrollTop;
      console.log("Current scroll position:", currentPosition);
      setmainTweetScrollOffset(currentPosition);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    // Set the initial scroll position to the value of mainTweetScrollOffset

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = mainhomesectionRef.current;
    if (readyForScroll) {
      scrollContainer.scrollTop = mainTweetScrollOffset;
      setTweetLoaded(true);
    }
  }, [readyForScroll]);

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
    if (currentUser.badgedUser) {
      settweetData({ ...tweetData, badgedUser: true });
      console.log("badged user");
    }
  }, [currentUser]);

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
        setdispatchNewTweets(true);
        toast.success("Tweeted successfully");
        tweetTextareaRef.current.style.height = "100px";
        settweetingLoader(false);
        setImageToUpload(null);
        setImageToGrabLink(null)
        settweetData((prevData) => ({
          ...prevData,
          tweetImageLink: "",
          tweetText: "",
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
  const mainhomesectionRef = useRef(null);

  function loadNewTweets() {
    setdispatchNewTweets(true);
    mainhomesectionRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setnewtweetsbuttonAnimation(
      "absolute morenewtweetsbutton px-4 py-2 rounded-full"
    );
    console.log("first");
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
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="pt-4 z-30 top-mobile-nav w-full ">
          <div className="pl-3 w-full mobileheader flex gap-1 sm:hidden">
            <div
              className="home-nav-profile-image w-14 pl-1 pt-1 flex justify-center items-center"
              onClick={() => {
                dispatch(mobileNavLeftState(true));
                document.body.classList.add("overlay-open");
                console.log(mobNavleft);
              }}
            >
              <img
                src={currentUser.profile_picture}
                alt="user profile image"
                className="rounded-full w-8 h-8 max-h-8"
              />
            </div>
            <Link
              to="/"
              className=" home-main-bird-header w-full text-white text-2xl  pr-16 flex items-center justify-center"
            >
              <FontAwesomeIcon icon="fab fa-twitter" />
            </Link>
          </div>
          <p className="text text-lg font-semibold pl-4 mb-3 home-main-header-text-home">
            Home
          </p>
          <div className="flex w-full h-14 homepage-center-top-nav">
            <button
              className="w-1/2 homepage-center-top-nav-foryou flex justify-center items-center"
              onClick={() => {
                setFollowingTab(!FollowingTab);
                setForyouTab(!ForyouTab);
              }}
            >
              <div
                style={
                  ForyouTab
                    ? { borderBottom: "2px solid rgb(29, 155, 240)" }
                    : {}
                }
                className="h-full flex justify-center items-center"
              >
                For you
              </div>
            </button>
            <button
              className="w-1/2 homepage-center-top-nav-following flex justify-center items-center"
              onClick={() => {
                setFollowingTab(!FollowingTab);
                setForyouTab(!ForyouTab);
              }}
            >
              <div
                style={
                  FollowingTab
                    ? { borderBottom: "2px solid rgb(29, 155, 240)" }
                    : {}
                }
                className="h-full flex justify-center items-center"
              >
                Following
              </div>
            </button>
          </div>
        </header>
        <button onClick={loadNewTweets} className={newtweetsbuttonAnimation}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-up" /> New Tweets
        </button>
        <div
          ref={mainhomesectionRef}
          className="h-full pt-32 w-full tweet-scroll-section overflow-y-scroll overflow-x-hidden"
        >
          <section className="py-3 px-3 home-main-tweet-section1">
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
                  if (e.currentTarget.rows > 7) {
                    e.currentTarget.rows = 7;
                  }
                }}
                type="text"
                rows="1"
                placeholder="What's happening?"
                className="w-full text-xl pl-3 outline-none bg-black tweethomepagetextareamain"
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
            <div className="flex mt-6 justify-between items-center home-main-tweet-section-bottom">
              <div className="flex pl-16 gap-3">
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
          <section className="main-tweet-flow-section">
            {ForyouTab && (
              <HomepageTweetStream
                newtweetsbuttonAnimation={newtweetsbuttonAnimation}
                setnewtweetsbuttonAnimation={setnewtweetsbuttonAnimation}
                dispatchNewTweets={dispatchNewTweets}
                setdispatchNewTweets = {setdispatchNewTweets}
                tweetLoaded={tweetLoaded}
                setTweetLoaded={setTweetLoaded}
                setloadMoreTweets={setloadMoreTweets}
                loadMoreTweets={loadMoreTweets}
                tweetCache={tweetCache}
                setTweetCache={setTweetCache}
                setReadyForScroll={setReadyForScroll}
              />
            )}
            {FollowingTab && <FollowingTweetStream />}
            <div className=" h-52 flex justify-center pt-2">
              {tweetLoaded && (
                <button
                  onClick={() => {
                    setloadingOldTweets(true);
                    setTimeout(() => {
                      setloadingOldTweets(false);
                    }, 1000);
                    if (!loadingOldTweets) {
                      setloadMoreTweets(true);
                    }
                  }}
                  className="h-8 px-3 text-sm bluebackground rounded-full"
                >
                  {!loadingOldTweets && (
                    <p>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-right" />{" "}
                      Load more Tweets
                    </p>
                  )}
                  {loadingOldTweets && <WhiteStripeLoader />}
                </button>
              )}
            </div>
          </section>
        </div>
        <button
          onClick={() => {
            setprofileBlur(true);
          }}
          className="floating-tweet-button text-white w-10 h-10 fixed justify-center items-center rounded-full"
        >
          <FaFeatherAlt />
        </button>
      </section>

      <HomeRight />
    </>
  );
};

export default Home;
