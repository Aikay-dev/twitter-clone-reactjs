import { useEffect, useState, useRef } from "react";
import HomeRight from "./Home/HomeRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsFillPatchCheckFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { onValue, ref, update, push } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import { getTweetDate } from "../utility/dateJoined";
import LoaderWhite from "../components/LoaderWhite";
import toast, { Toaster } from "react-hot-toast";
import { ref as strgRef } from "firebase/storage";
import { storage } from "../config/firebase";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import CommentTweet from "../database/CommentTweet";
import Loader from "./auth/components/Loader";

function FullTweet() {
  const [fulltweetData, setfulltweetData] = useState(null);
  const { timestamp } = useParams();
  const currentUser = useSelector((state) => state.currUsr.value);
  const tweetTextareaRef = useRef(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageToGrabLink, setImageToGrabLink] = useState(null);
  const [tweetingLoader, settweetingLoader] = useState(false);
  const ImageTweetInputRef = useRef(null);
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

  useEffect(() => {
    if (currentUser.badgedUser) {
      settweetData({ ...tweetData, badgedUser: true });
    }
  }, []);

  const [commentTweet, setcommentTweet] = useState(false);
  const [loadedFullTweet, setLoadedFullTweet] = useState(false);
  const [timestampdynmic, setTimestampdynmic] = useState(timestamp);
  const [commentMounter, setcommentMounter] = useState(true);
  const [usrs, setusrs] = useState({});
  const [userKey, setUserKey] = useState("");
  const [Key, setKey] = useState("");
  const [showRetweet, setRetweet] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [showBookmark, setshowBookmark] = useState(false);
  const [pushupAfterImage, setpushupAfterImage] = useState(false);
  const [tweetNotFound, settweetNotFound] = useState(false);
  const [loader, setloader] = useState(true);
  useEffect(() => {
    const url = window.location.pathname;
    const extractedTimestamp = url.substring(url.lastIndexOf("/") + 1);
    setTimestampdynmic(extractedTimestamp);

    retrieveData();
  }, [window.location.pathname, timestampdynmic]);

  function retrieveData() {
    if (!loadedFullTweet) {
      const url = window.location.pathname;
      const timestampdynmic = url.substring(url.lastIndexOf("/") + 1);
      setTimestampdynmic(timestampdynmic);

      const tweetPoolRef = ref(
        realTimeDatabase,
        `tweetPool/${timestampdynmic}`
      );
      onValue(tweetPoolRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          setLoadedFullTweet(true);
          setfulltweetData(data);
        } else {
          setcommentTweet(true);
        }
      });
    }
  }

  useEffect(() => {
    if (commentTweet) {
      const tweetPoolRef = ref(
        realTimeDatabase,
        `commentTweetPool/${timestampdynmic}`
      );
      onValue(tweetPoolRef, (snapshot) => {
        const data = snapshot.val();

        setfulltweetData(data);
        if (data !== null) {
          setLoadedFullTweet(true);
          settweetNotFound(true);
          setloader(false);
        } else {
          setloader(false);
          settweetNotFound(true);
        }
      });
    }
  }, [commentTweet]);

  function tweetTime(timestampdynmic) {
    const date = new Date(timestampdynmic);
    let hours = date.getHours();
    const minutes = date.getUTCMinutes(); // Use getUTCMinutes() instead of getMinutes()

    const amPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${amPm}`;

    return formattedTime;
  }

  const handleTweetFormReset = () => {
    tweetTextareaRef.current.value = "";
  };

  useEffect(() => {
    if (fulltweetData) {
      for (let i = 0; i < fulltweetData.retweets.length; i++) {
        if (fulltweetData.retweets[i] === currentUser.userId) {
          setRetweet(true);
        } else {
          setRetweet(false);
        }
      }

      for (let i = 0; i < fulltweetData.likes.length; i++) {
        if (fulltweetData.likes[i] === currentUser.userId) {
          setShowLike(true);
        } else {
          setShowLike(false);
        }
      }
    }
  }, [fulltweetData]);

  const updateNode = (path, newData) => {
    const dbRef = ref(realTimeDatabase, path);
    update(dbRef, newData)
      .then(() => {
        toast.success("Commented successfully");
        setcommentTweet(false);
        settweetingLoader(false);
        retrieveData();
        setcommentMounter(false);
        setImageToUpload(null);
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

  const updateRtwtNode = (path, newData) => {
    const dbRef = ref(realTimeDatabase, path);
    update(dbRef, newData)
      .then(() => {
        toast.success("Retweet Updated");
        setcommentTweet(false);
        settweetingLoader(false);
        retrieveData();
        setcommentMounter(false);
        setImageToUpload(null);
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

  const updateNodeSilent = (path, newData) => {
    const dbRef = ref(realTimeDatabase, path);
    update(dbRef, newData)
      .then(() => {})
      .catch((error) => {
        console.error("Error updating data:", error);
        settweetingLoader(false);
      });
  };

  useEffect(() => {
    setcommentMounter(true);
  }, [commentMounter]);

  function updateTweetNode() {
    if (commentTweet === false) {
      updateNode("commentTweetPool/" + tweetData.tweetId, tweetData);
      const commentTweetsRef = ref(
        realTimeDatabase,
        "tweetPool/" + timestampdynmic + "/comments"
      );
      push(commentTweetsRef, tweetData.tweetId)
        .then(() => {
          const userDataNotify = userKey;
          userDataNotify.notificationData.push({
            displayName: currentUser.displayName,
            message: "Commented on your post",
            userId: currentUser.userId,
            profilePicture: currentUser.profile_picture,
          });
          updateNodeSilent("users/" + Key, userDataNotify);
        })
        .catch((error) => {
          console.error("Error adding tweetId to userTweets array:", error);
        });
    } else {
      updateNode("commentTweetPool/" + tweetData.tweetId, tweetData);
      const commentTweetsRef = ref(
        realTimeDatabase,
        "commentTweetPool/" + timestampdynmic + "/comments"
      );
      push(commentTweetsRef, tweetData.tweetId)
        .then(() => {})
        .catch((error) => {
          console.error("Error adding tweetId to userTweets array:", error);
        });
    }
  }

  function pushupTweet() {
    settweetData((prevData) => ({
      ...prevData,
      tweetId: Date.now(),
    }));
    if (currentUser.badgedUser) {
      settweetData({ ...tweetData, badgedUser: true });

      updateTweetNode();
    } else {
      updateTweetNode();
    }
  }

  function finalUploadTweet() {
    if (imageToGrabLink !== null) {
      const fileName = Date.now() + "_" + imageToGrabLink.name;
      const TweetPics = strgRef(storage, `TweetPictures/${fileName}`);
      uploadBytes(TweetPics, imageToGrabLink).then((snapshot) => {
        // Get the download URL of the uploaded file
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            // Update tweetData with the tweetImageLink
            settweetData((prevData) => ({
              ...prevData,
              tweetImageLink: downloadURL,
            }));
            setpushupAfterImage(true);
          })
          .catch((error) => {
            settweetingLoader(false);
          })
          .finally(() => {});
      });
    } else {
      pushupTweet();
    }
  }

  useEffect(() => {
    if (pushupAfterImage) {
      pushupTweet();
      setpushupAfterImage(false);
    }
  }, [pushupAfterImage]);

  function formatDate(timestampdynmic) {
    const date = new Date(timestampdynmic);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function uploadTweetText(e) {
    settweetData({ ...tweetData, tweetText: e });
    return tweetData;
  }

  const handleResetUploadImage = () => {
    ImageTweetInputRef.current.value = null;
    setImageToUpload(null);
    setImageToGrabLink(null);
  };

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
  const [likeStyle, setlikeStyle] = useState({});
  const [retweetStyle, setretweetStyle] = useState({});
  const [bookmarkStyle, setbookmarkStyle] = useState({});
  useEffect(() => {
    if (showLike) {
      setlikeStyle({ color: "rgb(249, 24, 128)" });
    } else {
      setlikeStyle({});
    }

    if (showRetweet) {
      setretweetStyle({ color: "rgb(1, 161, 108)" });
    } else {
      setretweetStyle({});
    }

    if (showBookmark) {
      setbookmarkStyle({ color: "var(--blueText)" });
    } else {
      setbookmarkStyle({});
    }
  }, [showLike, showRetweet, showBookmark]);

  function handleRetweet() {
    const userDataNotify = userKey;
    userDataNotify.notificationData.push({
      displayName: currentUser.displayName,
      message: "Retweeted your post",
      userId: currentUser.userId,
      profilePicture: currentUser.profile_picture,
    });

    const fulldata2push = fulltweetData;

    const index = fulldata2push.retweets.indexOf(currentUser.userId);

    if (index !== -1) {
      fulldata2push.retweets.splice(index, 1);
      if (commentTweet === false) {
        updateRtwtNode("tweetPool/" + fulltweetData.tweetId, fulldata2push);
      } else {
        updateRtwtNode(
          "commentTweetPool/" + fulltweetData.tweetId,
          fulldata2push
        );
      }
      setRetweet(false);
    } else {
      fulldata2push.retweets.push(currentUser.userId);
      if (commentTweet === false) {
        updateRtwtNode("tweetPool/" + fulltweetData.tweetId, fulldata2push);
      } else {
        updateRtwtNode(
          "commentTweetPool/" + fulltweetData.tweetId,
          fulldata2push
        );
      }
      updateNodeSilent("users/" + Key, userDataNotify);
      setRetweet(true);
      updateNodeSilent("tweetPool/" + Date.now(), {
        ...fulltweetData,
        RetweetedBy: currentUser.username,
        tweetId: Date.now(),
      });
    }
  }

  useEffect(() => {
    if (fulltweetData) {
      for (let i = 0; i < currentUser.bookmarkData.length; i++) {
        if (currentUser.bookmarkData[i] === fulltweetData.tweetId) {
          setshowBookmark(true);
        } else {
        }
      }
    }
  }, [fulltweetData]);

  useEffect(() => {
    const CurrentRTDB = ref(realTimeDatabase, "users/");
    onValue(CurrentRTDB, (snapshot) => {
      const data = snapshot.val();

      setusrs(data);
      let foundKey = null;

      for (const key in data) {
        if (fulltweetData !== null) {
          if (
            data.hasOwnProperty(key) &&
            data[key].username === fulltweetData.username
          ) {
            foundKey = data[key];

            setUserKey(foundKey);
            setKey(key);

            break;
          }
        }
      }
    });
  }, [fulltweetData]);

  useEffect(() => {}, [usrs, userKey]);

  function handleLike() {
    const fulldata2push = fulltweetData;
    const userDataNotify = userKey;
    userDataNotify.notificationData.push({
      displayName: currentUser.displayName,
      message: "Liked your post",
      userId: currentUser.userId,
      profilePicture: currentUser.profile_picture,
    });

    const index = fulldata2push.likes.indexOf(currentUser.userId);
    let updateUserLikes = { ...currentUser };

    if (index !== -1) {
      fulldata2push.likes.splice(index, 1);
      if (updateUserLikes.likedTweets.length === 1) {
        updateUserLikes.likedTweets = [0];
      } else {
        const liketweetHolder = [...updateUserLikes.likedTweets];
        liketweetHolder.splice(index, 1);
        updateUserLikes.likedTweets = liketweetHolder;
      }
      if (commentTweet === false) {
        updateNodeSilent("tweetPool/" + fulltweetData.tweetId, fulldata2push);
        updateNodeSilent("users/" + currentUser.userId, updateUserLikes);
      } else {
        updateNodeSilent(
          "commentTweetPool/" + fulltweetData.tweetId,
          fulldata2push
        );
      }

      setShowLike(false);
    } else {
      if (updateUserLikes.likedTweets[0] === 0) {
        updateUserLikes.likedTweets = [fulltweetData.tweetId];
      } else {
        const userlikedTweetHolder = [...updateUserLikes.likedTweets];
        userlikedTweetHolder.push(fulltweetData.tweetId);
        updateUserLikes.likedTweets = userlikedTweetHolder;
      }
      fulldata2push.likes.push(currentUser.userId);
      if (commentTweet === false) {
        updateNodeSilent("tweetPool/" + fulltweetData.tweetId, fulldata2push);
        updateNodeSilent("users/" + currentUser.userId, updateUserLikes);
      } else {
        updateNodeSilent(
          "commentTweetPool/" + fulltweetData.tweetId,
          fulldata2push
        );
      }

      setShowLike(true);
      updateNodeSilent("users/" + Key, userDataNotify);
      toast.success("Liked successfully");
    }
  }

  function handleBookmark() {
    const tweetId = fulltweetData.tweetId;
    const bookmarkDataCopy = { ...currentUser };
    const index = bookmarkDataCopy.bookmarkData.indexOf(tweetId);

    if (index !== -1) {
      const updatedBookmarkData = [...bookmarkDataCopy.bookmarkData];
      updatedBookmarkData.splice(index, 1);
      if (updatedBookmarkData.length === 0) {
        updatedBookmarkData.push(0);
      }
      bookmarkDataCopy.bookmarkData = updatedBookmarkData;
      updateNodeSilent("users/" + currentUser.userId, bookmarkDataCopy);
      setshowBookmark(false);
      toast.success("Removed from Bookmark");
    } else {
      const updatedBookmarkData = [...bookmarkDataCopy.bookmarkData];
      if (updatedBookmarkData[0] === 0) {
        updatedBookmarkData[0] = tweetId;
      } else {
        updatedBookmarkData.push(tweetId);
      }
      bookmarkDataCopy.bookmarkData = updatedBookmarkData;
      updateNodeSilent("users/" + currentUser.userId, bookmarkDataCopy);
      setshowBookmark(true);
      toast.success("Added to Bookmark");
    }
    // Perform any further operations with the updated bookmarkDataCopy object
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
        <nav className="flex items-center z-10 pb-2 pt-2 absolute w-full top-mobile-nav">
          <div
            className="personalization-and-data-head-nav-arrow-holder flex items-center justify-center cursor-pointer rounded-full h-8 w-8 ml-2 mt-2 mr-8"
            onClick={() => {
              window.history.back();
              retrieveData();
              setcommentTweet(false);
              setLoadedFullTweet(false);
            }}
          >
            <span className="text-base">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </span>
          </div>
          <p className=" font-semibold text-xl">Tweet</p>
        </nav>

        {loadedFullTweet && (
          <section className="pt-20 pb-20 homepage-center-info overflow-y-scroll h-full">
            <div className="flex justify-between px-3">
              <Link
                to={
                  fulltweetData !== null
                    ? "/Home/" + fulltweetData.username
                    : ""
                }
                className="flex "
              >
                <div>
                  <img
                    src={fulltweetData !== null ? fulltweetData.profilePic : ""}
                    alt="user profile image"
                    className="rounded-full h-10 w-10 max-w-14 mr-5 cursor-pointer main-card-profile-pic"
                  />
                </div>
                <div>
                  <p className=" font-bold flex items-center gap-1">
                    <span>
                      {fulltweetData !== null ? fulltweetData.displayName : ""}
                    </span>
                    <span>
                      {fulltweetData !== null
                        ? fulltweetData.badgedUser && (
                            <span className="bluetext">
                              <BsFillPatchCheckFill />
                            </span>
                          )
                        : ""}
                    </span>
                  </p>
                  <p className="text-sm homelabelcolor">
                    {fulltweetData !== null ? fulltweetData.username : ""}
                  </p>
                </div>
              </Link>
              <button className="ml-4 ellipseinFullTweet flex w-8 h-8 rounded-full justify-center items-center">
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
              </button>
            </div>
            <div style={{ whiteSpace: "pre-wrap" }} className="px-3 pt-4">
              {fulltweetData !== null ? fulltweetData.tweetText : ""}
            </div>
            {fulltweetData !== null
              ? fulltweetData.tweetImageLink && (
                  <div className=" mt-5 px-3 fulltweetcardimage justify-center flex items-center">
                    <img
                      src={
                        fulltweetData !== null
                          ? fulltweetData.tweetImageLink
                          : ""
                      }
                      alt=""
                      className="main-tweet-image-tweetfull"
                    />
                  </div>
                )
              : ""}
            <div className="py-3 px-3 flex gap-2 items-center homelabelcolor">
              <div className=" text-sm ">
                {tweetTime(Number(timestampdynmic))}
              </div>
              <div className="dotfontawe">
                <FontAwesomeIcon icon="fa-solid fa-circle" />
              </div>
              <div className=" text-sm homelabelcolor">
                {formatDate(Number(timestampdynmic))}
              </div>
            </div>
            <div className="flex justify-around items-center homelabelcolor text-xl mx-3 py-1 tweetfullactionsection">
              <button
                onClick={() => {
                  tweetTextareaRef.current.focus();
                }}
                className="p-3 cursor-pointer rounded-full main-tweet-comment-icon main-tweet-comment-icon-background"
              >
                <FaRegComment />
              </button>
              <button
                onClick={handleRetweet}
                className="p-3 cursor-pointer rounded-full main-tweet-retweet-icon main-tweet-retweet-icon-background"
                style={retweetStyle}
              >
                <FaRetweet />
              </button>
              <button
                onClick={handleLike}
                className="p-3 cursor-pointer rounded-full main-tweet-like-icon main-tweet-like-icon-background"
                style={likeStyle}
              >
                <AiOutlineHeart />
              </button>
              <button
                style={bookmarkStyle}
                onClick={handleBookmark}
                className="p-3 text-lg cursor-pointer rounded-full main-tweet-comment-icon main-tweet-comment-icon-background"
              >
                <BsBookmark />
              </button>
            </div>
            <div className="text-sm ml-16 pt-2">
              <span className="homelabelcolor">Replying to </span>
              {fulltweetData && (
                <Link
                  to={"/Home/" + fulltweetData.username}
                  className="bluetext cursor-pointer"
                >
                  {fulltweetData.username}
                </Link>
              )}
            </div>
            <section className="py-3 px-3 home-main-tweet-section">
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
                    } else {
                    }
                  }}
                  className=" flex justify-center items-center home-main-tweet-section-button text-white px-4 rounded-full py-1 font-semibold"
                >
                  {!tweetingLoader && "Comment"}
                  {tweetingLoader && (
                    <div className="flex w-11 h-6 justify-center items-center">
                      <LoaderWhite />
                    </div>
                  )}
                </button>
              </div>
            </section>
            <section>
              {commentMounter && (
                <CommentTweet
                  setcommentTweet={setcommentTweet}
                  setLoadedFullTweet={setLoadedFullTweet}
                  fulltweetData={fulltweetData}
                />
              )}
              <div className=" h-40"></div>
            </section>
          </section>
        )}
        {!loadedFullTweet && loader && <Loader />}
        {tweetNotFound && <div className=" pt-16 pl-3">Tweet Not found</div>}
      </section>

      <HomeRight />
    </>
  );
}

export default FullTweet;
