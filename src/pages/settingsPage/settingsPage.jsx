import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { exploreChangeState, settingsChangeState } from "../../store";

library.add(fas);
library.add(fab);
library.add(far);

const SettingsPage = () => {
  const[navStyleOnPop, setnavStyleOnPop]  = useState(0)
  const dispatch = useDispatch();

  const [rbStyle, setrbStyle] = useState({});
  const [rbStyle1, setrbStyle1] = useState({});
  const [rbStyle2, setrbStyle2] = useState({});

  window.onpopstate = () => {
    const currentUrl = window.location.pathname;
    if (currentUrl === "/Home/Explore/" || currentUrl === "/Home/Explore") {
      dispatch(settingsChangeState({ fontWeight: 100 }));
      dispatch(exploreChangeState({ fontWeight: "Bold" }));
    }
    setnavStyleOnPop(navStyleOnPop + 1)
    console.log(window.location.pathname);
  };

  useEffect(() => {
    if (
      window.location.pathname === "/Home/Settings" ||
      window.location.pathname === "/Home/Settings/" ||
      window.location.pathname === "/Home/Settings/personalization" ||
      window.location.pathname === "/Home/Settings/personalization/"
    ) {
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
      dispatch(exploreChangeState({ fontWeight: 100 }));
      setrbStyle({
        borderRight: "2px solid rgb(29, 155, 240)",
        backgroundColor: "rgb(22,24,28)",
      });
      setrbStyle1({});
      setrbStyle2({});
      dispatch(exploreChangeState({ fontWeight: 100 }));
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
    } else if (
      window.location.pathname === "/Home/Settings/your_twitter_data" ||
      window.location.pathname === "/Home/Settings/your_twitter_data/"
    ) {
      setrbStyle1({
        borderRight: "2px solid rgb(29, 155, 240)",
        backgroundColor: "rgb(22,24,28)",
      });
      setrbStyle({});
      setrbStyle2({});
      dispatch(exploreChangeState({ fontWeight: 100 }));
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
    } else if (
      window.location.pathname === "/Home/Settings/about" ||
      window.location.pathname === "/Home/Settings/about/"
    ) {
      setrbStyle2({
        borderRight: "2px solid rgb(29, 155, 240)",
        backgroundColor: "rgb(22,24,28)",
      });
      setrbStyle({});
      setrbStyle1({});
      dispatch(exploreChangeState({ fontWeight: 100 }));
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
    }
    console.log("object")
  }, [navStyleOnPop]);

  return (
    <div className="settings-page flex overflow-scroll">
      <section className="settings-main-tab">
        <p className="pt-3 pl-4 font-semibold text-xl pb-6">Settings</p>
        <p className="pl-4 text-xl font-bold">Privacy</p>
        <Link
          to="personalization/"
          className="flex justify-between mt-4 pr-4 py-1 items-center cursor-pointer settings-personalized-data"
          style={rbStyle}
          onClick={() => {
            setrbStyle({
              borderRight: "2px solid rgb(29, 155, 240)",
              backgroundColor: "rgb(22,24,28)",
            });
            setrbStyle1({});
            setrbStyle2({});
          }}
        >
          <div className="flex flex-col">
            <p className="pl-4 font-semibold">Personalization and data</p>
            <p className="pl-4 settings-allow-all text-sm">Allow all</p>
          </div>
          <p className="settings-chevron-icons">
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
          </p>
        </Link>
        <Link
          to="your_twitter_data/"
          className="flex justify-between pr-4 py-4 items-center cursor-pointer settings-tweet-data"
          style={rbStyle1}
          onClick={() => {
            setrbStyle1({
              borderRight: "2px solid rgb(29, 155, 240)",
              backgroundColor: "rgb(22,24,28)",
            });
            setrbStyle({});
            setrbStyle2({});
          }}
        >
          <p className="pl-4">Your Tweeter data</p>
          <p className="settings-chevron-icons">
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
          </p>
        </Link>
        <p className="pl-4 pt-3 pb-3 mb-3 setting-these-set-text">
          These settings apply to this browser or device while you’re logged
          out. They don’t have any effect when you’re logged in.
        </p>
        <p className="pl-4 font-bold text-xl">General</p>
        <Link
          to="about/"
          className="flex justify-between pr-4 mt-3 items-center cursor-pointer settings-additional-resources"
          style={rbStyle2}
          onClick={() => {
            setrbStyle2({
              borderRight: "2px solid rgb(29, 155, 240)",
              backgroundColor: "rgb(22,24,28)",
            });
            setrbStyle({});
            setrbStyle1({});
          }}
        >
          <p className="pl-4 py-5">Additional resources</p>
          <p className="settings-chevron-icons">
            {" "}
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />{" "}
          </p>
        </Link>
      </section>
      <section className="settings-tab-expanded">
        <Outlet />
      </section>
    </div>
  );
};

export default SettingsPage;
