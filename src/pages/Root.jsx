import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";


library.add(fas);
library.add(fab);
library.add(far);

const Root = () => {
  const page = useParams()
  console.log(page)
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/Home") {
      navigate("/Home/Explore");
    }
  }, []);

  


  return (
    <>
      <div className="bg-black">
        <div className="homepage h-screen bg-black flex m-auto">
          <section className="homepage-left h-screen hidden sm:block">
            <Link
              to="/"
              className="homepage-bird text-white text-3xl w-full pt-3 rounded flex items-center justify-center"
            >
              <FontAwesomeIcon icon="fab fa-twitter" />
            </Link>
            <div className="section1-main flex cursor-pointer flex-col gap-2 pt-5">
              <div
                className="section1-main-explore text-2xl font-semibold flex justify-center items-center"
                style={{ fontWeight: "bold" }}
              >
                <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                <span className="hidden xl:block xl:pl-6">Explore</span>
              </div>
              <div className="section1-main-search text-xl font-semibold flex justify-center items-center">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </div>
              <div
                className="section1-main-setting cursor-pointer text-2xl flex justify-center items-center text-white"
                style={{ fontWeight: 100 }}
              >
                <SettingsTwoToneIcon />
                <Link to="/Home/Settings" className="hidden xl:block xl:pl-5">
                  Settings
                </Link>
              </div>
            </div>
          </section>
          <Outlet/>
        </div>

        <div className="homepage-login-banner py-2 absolute bottom-0 w-full flex items-center justify-center">
          <div className="homepage-auth-banner-holder text-white  flex items-center justify-between">
            <div className="homepage-auth-banner-info md:block hidden">
              <p className="homepage-auth-banner-dont-miss font-bold text-2xl">
                Don't miss what's happening
              </p>
              <p className="homepage-login-banner-people-on">
                people on Twitter are the first to know.
              </p>
            </div>
            <div className="homepage-login-banner-auth flex gap-3 w-full md:w-44">
              <Link
                to="/auth/Login"
                className="homepage-login-banner-auth-login ml-3 md:px-4 md:w-22 w-1/2 font-bold py-1 rounded-full"
              >
                <p className="text-center">Login</p>
              </Link>
              <Link
                to="/auth/Signup"
                className="homepage-login-banner-auth-signup mr-3 md:px-4 md:w-22 w-1/2 font-bold py-1 whitespace-nowrap rounded-full bg-white text-black"
              >
                <p className="text-center">Sign up</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
