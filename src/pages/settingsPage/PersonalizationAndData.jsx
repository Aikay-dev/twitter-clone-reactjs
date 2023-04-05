import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

library.add(fas);
library.add(fab);
library.add(far);

const PersonalizationAndData = () => {
  return (
    <div className="personalization-and-data-section">
      <div className="personalization-and-data-top-1">
        <div className="personalization-and-data-head-nav">
          <div>
            <span><FontAwesomeIcon icon="fa-solid fa-arrow-left" /></span>
          </div>
          <p className="font-bold">Personlization and data</p>
        </div>
        <p>
          These settings apply to this browser or device while you’re logged
          out. They don’t have any effect when you’re logged in.
        </p>
      </div>
      <div className="personalization-and-data-top-2">
        <div>
          <div>Personalization and data</div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <p>This will enable or disable all of the settings on this page.</p>
      </div>
      <div>
        <p>Personalization</p>
        <div>
          <div>Personalized ads</div>
          <input type="checkbox" name="" id="" />
        </div>
        <p>
          You will always see ads on Twitter based on your Twitter activity.
          When this setting is enabled, Twitter may further personalize ads from
          Twitter advertisers, on and off Twitter, by combining your Twitter
          activity with other online activity and information from our partners.{" "}
          <span><Link>Learn more</Link></span>
        </p>
        <div>
          <p>Personalize based on your inferred identity</p>
          <input type="checkbox" name="" id="" />
        </div>
        <p>
          Twitter will always personalize your experience based on information
          you’ve provided, as well as the devices you’ve used to log in. When
          this setting is enabled, Twitter may also personalize based on other
          inferences about your identity, like devices and browsers you haven’t
          used to log in to Twitter or email addresses and phone numbers similar
          to those linked to your Twitter account. <span>Learn more</span>
        </p>
        <p>Data</p>
        <div>
          <p>Allow additional information sharing with business partners</p>
          <input type="checkbox" name="" id="" />
        </div>
        <p>
          Twitter always shares information with business partners as a way to
          run and improve its products. When enabled, this allows Twitter to
          share additional information with those partners to help support
          running Twitter’s business, including making Twitter’s marketing
          activities on other sites and apps more relevant for you.{" "}
          <span>Learn more</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalizationAndData;
