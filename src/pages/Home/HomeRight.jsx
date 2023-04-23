import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Trendstream from '../../components/TrendStream';

library.add(fas);
library.add(fab);
library.add(far);

const HomeRight = () => {
  return (
    <section className="homepage-right h-screen px-7">
        <div className="homepage-header-searchbar w-full relative mt-2">
          <input
            type="text"
            className="homemain-head-search h-10 rounded-full outline-none pl-16"
            placeholder="Search Tweeter"
          />
          <label className="homepage-header-label absolute left-5 top-2 outline-none">
            <FontAwesomeIcon icon="fas fa-magnifying-glass" />
          </label>
        </div>
        <div className="home-main-trends-for-you mt-5 pt-3 overflow-hidden">
          <p className="homepage-center-info-trends text-xl font-extrabold pb-3 px-4 text-white">
            Trends for you
          </p>
          <Trendstream/>
        </div>
      </section>
  )
}

export default HomeRight