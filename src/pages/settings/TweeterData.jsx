import React from "react";
import SettingsTopNav from "./SettingsTopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas);
library.add(fab);
library.add(far);

const TweeterData = () => {
  const tweetData_tabs = [
    "Account",
    "Apps, devices & information",
    "Interests and ads data",
    "Download archive",
  ];

  const tabmapper = tweetData_tabs.map((items) => {
    return (
      <li key={tweetData_tabs.indexOf(items)} className="flex justify-between items-center py-4  pl-4 pr-5 twetter-data-tabs cursor-pointer">
        <div>{items}</div>
        <p className="settings-chevron-icons">
          <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
        </p>
      </li>
    );
  });

  return (
    <div className="h-screen tweeter-Data-section">
      <SettingsTopNav navText={"Your Tweeter data"} />
      <ul>{tabmapper}</ul>
    </div>
  );
};

export default TweeterData;
