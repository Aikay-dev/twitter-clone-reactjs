import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  exploreChangeState,
  settingsChangeState,
  personalizationblurChangeState,
  checkboxsettingsChangeState,
} from "../../store";
import { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import SettingsMainNav from "./SettingsMainNav";

export const SettingsContext = createContext(null);

const SettingsPage = () => {
  const [navStyleOnPop, setnavStyleOnPop] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ifBlur = useSelector((state) => state.peras.value);

  window.onpopstate = () => {
    const currentUrl = window.location.pathname;
    if (currentUrl === "/Home/Explore/" || currentUrl === "/Home/Explore") {
      dispatch(settingsChangeState({ fontWeight: 100 }));
      dispatch(exploreChangeState({ fontWeight: "Bold" }));
    }
    setnavStyleOnPop(navStyleOnPop + 1);
    console.log(window.location.pathname);
  };

  const [togglePermit, setTogglePermit] = useState(false);
  return (
    <SettingsContext.Provider value={{ togglePermit, setTogglePermit }}>
      <div className=" overflow-y-scroll xs:w-full">
        <div className="settings-page flex ">
          {window.innerWidth > 1040 || window.location.pathname === "/Home/Settings/" ? (
            <SettingsMainNav navStyleOnPop={navStyleOnPop} /> 
          ) : (
            <Outlet />
            
          )}

          {window.innerWidth > 1040 ? (
            <section className="settings-tab-expanded">
              <Outlet />
            </section>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        style={ifBlur}
        className="w-screen h-screen absolute flex justify-center items-center homepage-auth-overlay"
      >
        <div className="bg-black w-80 h-72 p-8 rounded-2xl">
          <p className=" font-bold text-xl">
            Disable personalization and data?
          </p>
          <p className="settings-personalize-text-this-may mb-5">
            This may make the Tweets and ads you see less relevant.
          </p>
          <button
            className="settings-personalize-disable text-black w-full py-3 mb-3 rounded-full font-bold"
            onClick={() => {
              setTogglePermit(true);
              dispatch(personalizationblurChangeState({ display: "none" }));
              dispatch(checkboxsettingsChangeState(false));
            }}
          >
            Disable
          </button>
          <button
            className="settings-personalize-cancel text-white w-full py-3 rounded-full font-bold"
            onClick={() => {
              dispatch(personalizationblurChangeState({ display: "none" }));
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </SettingsContext.Provider>
  );
};

export default SettingsPage;
