import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { exploreChangeState, settingsChangeState } from "../../store";

const SettingsMainNav = ({ navStyleOnPop }) => {
  const dispatch = useDispatch();
  const [rbStyle, setrbStyle] = useState({});
  const [rbStyle1, setrbStyle1] = useState({});
  const [rbStyle2, setrbStyle2] = useState({});

  useEffect(() => {
    if (
      window.location.pathname === "/Home/Settings" ||
      window.location.pathname === "/Home/Settings/" ||
      window.location.pathname === "/Home/Settings/personalization" ||
      window.location.pathname === "/Home/Settings/personalization/"
    ) {
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
      dispatch(exploreChangeState({ fontWeight: 100 }));
      if (window.innerWidth > 1040) {
        setrbStyle({
          borderRight: "2px solid rgb(29, 155, 240)",
          backgroundColor: "rgb(22,24,28)",
        });
      }
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
  }, [navStyleOnPop]);
  return (
    <section className="settings-main-tab h-screen">
      <div className="flex ">
        <div
          className="personalization-and-data-head-nav-arrow-holder main-settings-navigation-arrow flex items-center justify-center cursor-pointer rounded-full h-8 w-8 ml-2 mt-2 mr-8"
          onClick={() => window.history.back()}
        >
          <span className="text-base">
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          </span>
        </div>
        <p className="pt-3 pl-4 font-semibold text-xl pb-6">Settings</p>
      </div>
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
          <p className="pl-4">Personalization and data</p>
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
      <p className="pl-4 pr-4 pt-3 pb-3 mb-3 setting-these-set-text">
        These settings apply to this browser or device while you’re logged out.
        They don’t have any effect when you’re logged in.
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
  );
};

export default SettingsMainNav;
