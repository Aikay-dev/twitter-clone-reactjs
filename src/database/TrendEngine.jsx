import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { onValue, ref } from "firebase/database";
import { realTimeDatabase } from "../config/firebase";
import Loader from "../pages/auth/components/Loader";

library.add(fas);
library.add(fab);
library.add(far);

const TrendEngine = () => {
  const [tweets, setTweets] = useState([]);
  const [loader, setloader] = useState(true);
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    const wholeTweetsRef = ref(realTimeDatabase, "tweetPool/");
    onValue(wholeTweetsRef, (snapshot) => {
      let data = snapshot.val();
      const dataArr = Object.values(data);
      console.log(dataArr);
      setTweets(dataArr);
    });
  }, []);

  useEffect(() => {
    tweets.length > 1 ? trendGen(tweets) : console.log("Data not recieved yet");
  }, [tweets]);

  // Step 1: Extract tweet texts
  function trendGen() {
    const tweetTexts = tweets.map((tweet) => tweet.tweetText);

    const wordCount = {}; // Create an object to store word occurrences

    tweetTexts.forEach((text) => {
      const cleanedText = text.replace(/[^\w\s]/g, "").toLowerCase();
      const tokens = cleanedText.split(/\s+/);

      tokens.forEach((token) => {
        if (token.length > 4) {
          wordCount[token] = (wordCount[token] || 0) + 1;
        }
      });
    });

    const sortedTrends = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
    const numTrends = 5;
    const topTrends = sortedTrends.slice(0, numTrends);

    console.log("Top Trends:");
    topTrends.forEach(([trend, count]) => {
      console.log(`Trend: ${trend}, Count: ${count}`);
    });
    setTrends(topTrends);
    setloader(false);
    console.log(topTrends);
  }

  return (
    <>
      {!loader && (
        <div className="homepage-center-trends">
          {trends.map((items, index) => {
            return (
              <div
                key={index}
                className="homepage-center-current-trend px-3 py-3 cursor-pointer flex items-center justify-between"
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
              </div>
            );
          })}
        </div>
      )}
      {loader && <Loader />}
    </>
  );
};

export default TrendEngine;
