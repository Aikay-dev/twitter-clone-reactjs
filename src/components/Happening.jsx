import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import randColor from "../utility/randomColorgen";

library.add(fas);
library.add(fab);
library.add(far);

const Happening = () => {
  const [sportData, setSportData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.openligadb.de/getmatchdata/bl1/2020/8")
      .then((response) => {
        setSportData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let scoreCards = sportData.map((matches) => {
    `Team-1: ${matches.goals[0].scoreTeam1}, Team-2 ${matches.goals[0].scoreTeam2}`;
    return (
      <div
        className="homepage-center-whats-happening-card flex flex-col justify-center  cursor-pointer py-2 px-3 mt-5 mb-5"
        key={sportData.indexOf(matches)}
      >
        <div className="homepage-center-whats-happening-card-top-info flex items-center justify-between">
          <div className="homepage-center-whats-happening-card-top-info-sport font-bold text-sm">
            {matches.leagueName.replace(/[^A-Za-z]/g, "").replace(/-/g, " ")}
          </div>
          <div className="homepage-center-whats-happening-card-top-info-winner text-sm flex justify-center items-center gap-1">
            Final{" "}
            <FontAwesomeIcon
              icon="fa-solid fa-circle"
              className="homepage-center-whats-happening-card-top-info-winner-dot"
            />{" "}
            {matches.goals[0].scoreTeam1 === matches.goals[0].scoreTeam2
              ? "Draw"
              : matches.goals[0].scoreTeam1 > matches.goals[0].scoreTeam2
              ? matches.team1.teamName + " Won"
              : matches.team2.teamName + " Won"}
          </div>
        </div>
        <div className="homepage-center-whats-happening-card-main mt-2">
          <div
            style={{ backgroundColor: randColor() }}
            className="homepage-center-whats-happening-card-main-team-1 flex items-center justify-between  rounded-t-md"
          >
            <div className="flex pl-2">
              <img src={matches.team1.teamIconUrl} alt="" className="h-10 w-10" />
              <p className="homepage-center-whats-happening-card-main-team-1-name px-5 py-3 font-extrabold">
                {matches.team1.teamName}
              </p>
            </div>
            <p className="homepage-center-whats-happening-card-main-team-1-score px-5 py-3 font-black text-2xl">
              {matches.goals[0].scoreTeam1}
            </p>
          </div>
          <div
            style={{ backgroundColor: randColor() }}
            className="homepage-center-whats-happening-card-main-team-2 flex items-center justify-between font-extrabold rounded-b-md"
          >
            <div className="flex pl-2">
              <img src={matches.team2.teamIconUrl} alt="" className="h-10 w-10" />
              <p className="homepage-center-whats-happening-card-main-team-2-name px-5 py-3">
                {matches.team2.teamName}
              </p>
            </div>
            <p className="homepage-center-whats-happening-card-main-team-2-score px-5 py-3 font-black text-2xl">
              {matches.goals[0].scoreTeam2}
            </p>
          </div>
        </div>
      </div>
    );
  });

  console.log(sportData);
  return <>{scoreCards}</>;
};

export default Happening;
