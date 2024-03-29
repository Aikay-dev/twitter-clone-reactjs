import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onValue, ref } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import Loader from "../pages/auth/components/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TrendEngine = () => {
  const currentUser = useSelector((state) => state.currUsr.value);

  const [tweets, setTweets] = useState([]);
  const [loader, setloader] = useState(true);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const wholeTweetsRef = ref(realTimeDatabase, "tweetPool/");
    onValue(wholeTweetsRef, (snapshot) => {
      let data = snapshot.val();
      const dataArr = Object.values(data);
      setTweets(dataArr);
    });
  }, []);

  useEffect(() => {
    tweets.length > 0 ? trendGen() : false;
  }, [tweets]);

  // Step 1: Extract tweet texts
  function trendGen() {
    const tweetTexts = tweets.map((tweet) => tweet.tweetText);

    const wordCount = {}; // Create an object to store word occurrences

    tweetTexts.forEach((text) => {
      const cleanedText = text.replace(/[^\w\s]/g, "").toLowerCase();
      const tokens = cleanedText.split(/\s+/);

      tokens.forEach((token) => {
        token.length > 4
          ? (wordCount[token] = (wordCount[token] || 0) + 1)
          : false;
      });
    });

    const sortedTrends = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
    const numTrends = 5;
    const topTrends = sortedTrends.slice(0, numTrends);

    topTrends.forEach(([trend, count]) => {});
    setTrends(topTrends);
    setloader(false);
  }

  return (
    <>
      {!loader && (
        <div className="homepage-center-trends">
          {trends.map((items, index) => {
            return (
              <Link
                to={
                  currentUser !== null
                    ? `/Home/Search/${items[0]}`
                    : "/Auth/Login"
                }
                key={index}
                className="homepage-center-current-trend p-3 cursor-pointer flex items-center justify-between"
              >
                <div className="homepage-center-current-trend-info">
                  <p className="trend-category text-sm">Music . Trending</p>
                  <p className="trend-topic font-bold text-white">{items[0]}</p>
                  <p className="trend-tweets-num text-sm">
                    <span>{items[1]}</span> Tweets
                  </p>
                </div>
                <div className="homepage-center-current-trend-more mb-9 font-bold rounded-full cursor-pointer">
                  <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {loader && <Loader />}
    </>
  );
};

export default TrendEngine;
