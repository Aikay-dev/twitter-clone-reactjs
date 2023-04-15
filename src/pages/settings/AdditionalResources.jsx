import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SettingsTopNav from "./SettingsTopNav";

library.add(fas);
library.add(fab);
library.add(far);

const AdditionalResources = () => {
  const legalSection = [
    "Ads info",
    "Cookie Policy",
    "Privacy Policy",
    "Terms of Service",
  ];

  const miscellaneousItems = [
    "About",
    "Accessibility",
    "Advertising",
    "Blog",
    "Brand Resources",
    "Careers",
    "Developers",
    "Directory",
    "Help Center",
    "Marketing",
    "status",
    "Twitter for Business",
  ];

  const miscitemsmap = miscellaneousItems.map((item, index) => {
    const links = [
      "https://about.twitter.com/",
      "https://help.twitter.com/resources/accessibility",
      "https://ads.twitter.com/?ref=gl-tw-tw-twitter-advertise",
      "https://blog.twitter.com/",
      "https://about.twitter.com/press/brand-assets",
      "https://careers.twitter.com/",
      "https://developer.twitter.com/",
      "https://twitter.com/i/directory/profiles",
      "https://help.twitter.com/",
      "https://marketing.twitter.com/",
      "https://status.twitterstat.us/",
      "https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness",
    ];

    return (
      <a
        key={index}
        href={links[index]}
        className="flex justify-between items-center py-4 pl-4 pr-5 twetter-data-tabs cursor-pointer"
      >
        <div>{item}</div>
        <p className="settings-chevron-icons">
          <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
        </p>
      </a>
    );
  });

  const legalsecmap = legalSection.map((item, index) => {
    const links = [
      "https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo",
      "https://support.twitter.com/articles/20170514",
      "https://twitter.com/privacy",
      "https://twitter.com/tos",
    ];

    return (
      <a
        key={index}
        href={links[index]}
        className="flex justify-between items-center py-4 pl-4 pr-5 twetter-data-tabs cursor-pointer"
      >
        <div>{item}</div>
        <p className="settings-chevron-icons">
          <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
        </p>
      </a>
    );
  });
  return (
    <div className="h-full additional-resources-section">
      <SettingsTopNav />
      <p className="ml-4 text-sm addres-check-out mb-5">
        Check out other places for helpful information to learn more about
        Tweeter products and services.
      </p>
      <p className="font-black text-lg ml-4">Release notes</p>
      <a
        href="https://twitter.com/i/release_notes"
        className="flex justify-between items-center py-4  pl-4 pr-5 twetter-data-tabs cursor-pointer addres-relase-note-tab"
        target="blank"
      >
        <div>Release notes</div>
        <p className="settings-chevron-icons">
          <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
        </p>
      </a>
      <p className="font-black text-lg mt-4 ml-4">Legal</p>
      <div className="addres-relase-note-tab">{legalsecmap}</div>
      <p className="font-black text-lg mt-4 ml-4">Miscellaneous</p>
      <div className="pb-10">{miscitemsmap}</div>
    </div>
  );
};

export default AdditionalResources;
