import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import HomeRight from "../Home/HomeRight";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mobileNavLeftState } from "../../store";
import AboutDevTab from "./AboutDevTab";
import BlogTab from "./BlogTab";
import ServicesTab from "./ServicesTab";
import ContactTab from "./ContactTab";

library.add(fas);
library.add(fab);
library.add(far);

function TweeterBluePage() {
  const [aboutdevTab, setaboutdevTab] = useState(true);
  const [servicesTab, setservicesTab] = useState(false);
  const [blogTab, setblogTab] = useState(false);
  const [contactTab, setcontactTab] = useState(false);
  const dispatch = useDispatch();
  const mobNavleft = useSelector((state) => state.mobNavleft.value);
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <header className="flex flex-col w-full absolute pt-5 notificationheaderBorder profilePageHeader">
          <div className="flex bg-black px-5 justify-between items-center">
            <div
              className="notificationUserImage flex items-center"
              onClick={() => {
                dispatch(mobileNavLeftState(true));
                document.body.classList.add("overlay-open");
                console.log(mobNavleft);
              }}
            >
              <img
                src="https://picsum.photos/200/300"
                alt="user profile image"
                className=" rounded-full w-8 h-8 max-h-8"
              />
            </div>
            <div className="flex  justify-between w-full items-center">
              <p className="t text-xl  font-bold">Tweeter Dev</p>
              <Link
                to="/Home/Settings/"
                className="p-1 rounded-full notificationSettingsButton flex justify-center items-center cursor-pointer"
              >
                <SettingsTwoToneIcon fontSize="small" />
              </Link>
            </div>
          </div>
          <div className="flex justify-between mt-3 overflow-x-scroll devpagetabholder">
            <div
              onClick={() => {
                aboutdevTab ? setaboutdevTab(true) : setaboutdevTab(true);
                setservicesTab(false);
                setblogTab(false);
                setcontactTab(false);
              }}
              className="minwidthprofiletab whitespace-nowrap h-16 w-full flex items-center justify-center cursor-pointer profilepageTweetsbigTab"
            >
              <div
                style={
                  aboutdevTab
                    ? { borderBottom: "3px solid var(--blueText)" }
                    : {}
                }
                className=" h-full flex justify-center items-center profilepageTweetsTab"
              >
                About Dev
              </div>
            </div>
            <div
              onClick={() => {
                setaboutdevTab(false);
                servicesTab ? setservicesTab(true) : setservicesTab(true);
                setblogTab(false);
                setcontactTab(false);
              }}
              className="minwidthprofiletab whitespace-nowrap h-16 w-full flex items-center justify-center cursor-pointer profilepageLikesbigTab"
            >
              <div
                style={
                  servicesTab
                    ? { borderBottom: "3px solid var(--blueText)" }
                    : {}
                }
                className="h-full flex justify-center items-center profilepageLikesTab"
              >
                Services
              </div>
            </div>
            <div
              onClick={() => {
                setaboutdevTab(false);
                setservicesTab(false);
                setblogTab(true)
                setcontactTab(false);
              }}
              className=" minwidthprofiletab h-16 w-full flex items-center justify-center cursor-pointer profilepageLikesbigTab"
            >
              <div
                style={
                  blogTab ? { borderBottom: "3px solid var(--blueText)" } : {}
                }
                className=" whitespace-nowrap h-full flex justify-center items-center profilepageLikesTab"
              >
                Blog
              </div>
            </div>
            <div
              onClick={() => {
                setaboutdevTab(false);
                setservicesTab(false);
                setblogTab(false);
                contactTab ? setcontactTab(true) : setcontactTab(true);
              }}
              className="minwidthprofiletab h-16 w-full flex items-center justify-center cursor-pointer profilepageLikesbigTab"
            >
              <div
                style={
                  contactTab
                    ? { borderBottom: "3px solid var(--blueText)" }
                    : {}
                }
                className=" whitespace-nowrap h-full flex justify-center items-center profilepageLikesTab"
              >
                Contact me
              </div>
            </div>
          </div>
        </header>
        <section className="pb-60 devpageblogtab overflow-y-scroll h-screen notificationmainsection">
          {aboutdevTab && <AboutDevTab />}
          {blogTab && <BlogTab />}
          {contactTab && <ContactTab />}
          {servicesTab && <ServicesTab />}
        </section>
      </section>

      <HomeRight />
    </>
  );
}

export default TweeterBluePage;
