import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import profilePic from "../../assets/profilepic.jpg";
import devwallpaper from "../../assets/devwallpaper.svg";

library.add(fas);
library.add(fab);
library.add(far);

function AboutDevTab() {
  const skillImages = [
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original-wordmark.svg",
    "https://camo.githubusercontent.com/bbb327d6ba7708520eaafd13396fed64d73bf5df5c4cdd0ba03cf0843f7a9340/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f676e755f626173682f676e755f626173682d69636f6e2e737667",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    "https://camo.githubusercontent.com/5734d0669fe22ce04a1cb989a156cd32c379875f6bca56d5210c9432824856d9/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f7461696c77696e646373732f7461696c77696e646373732d69636f6e2e737667",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
    "https://camo.githubusercontent.com/76ae44a94388e048be2d8f5730d221c844f291162e6c5cdd632b1623a1b859f8/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6b6f746c696e6c616e672f6b6f746c696e6c616e672d69636f6e2e737667",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
    "https://camo.githubusercontent.com/07c382b68200c1a86d52d1682346e73e038b2f160c9afbc0af773fb3646882c8/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6772617068716c2f6772617068716c2d69636f6e2e737667",
    "https://camo.githubusercontent.com/fbfcb9e3dc648adc93bef37c718db16c52f617ad055a26de6dc3c21865c3321d/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6769742d73636d2f6769742d73636d2d69636f6e2e737667",
    "https://camo.githubusercontent.com/ed93c2b000a76ceaad1503e7eb9356591b885227e82a36a005b9d3498b303ba5/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6669676d612f6669676d612d69636f6e2e737667",
    "https://camo.githubusercontent.com/dd4b2422ed3bfc9da88c43d18550375c66f9584327dff7ecc19315ce50b96f07/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f66697265626173652f66697265626173652d69636f6e2e737667",
  ];

  const skills = skillImages.map((images) => {
    return (
      <img
        src={images}
        alt=""
        key={skillImages.indexOf(images)}
        className="h-10"
      />
    );
  });

  return (
    <>
      <section className="h-full profilepagemainsection">
        <div className=" h-48 w-full bg-slate-500 profilebacdropimage"></div>
        <div className="flex flex-col relative h-68 devprofileheader">
          <div className="p-1 bg-black absolute rounded-full flex justify-center items-center  profileimageintweetdevpage ">
            <img
              src={profilePic}
              alt="profile pic"
              className="rounded-full profileimageinproflepageimage relative h-32 w-32"
              height="100%"
              width="100%"
            />
          </div>
          <div className="pl-4 pt-28">
            <p className=" font-black text-xl">Emmanuel Ikpomosa Esekhaigbe</p>
            <div className="flex gap-2 pt-2 items-center">
              <img
                src="https://em-content.zobj.net/thumbs/120/twitter/322/flag-nigeria_1f1f3-1f1ec.png"
                alt=""
                className="h-4"
              />
              <p className="text-sm homelabelcolor">Akwa ibom, Nigeria</p>
            </div>
            <div className="flex gap-2 text-sm mt-1">
              <span className="text-white">
                <FontAwesomeIcon icon="fa-solid fa-link" />
              </span>
              <a
                href="https://emmanuelfestus.netlify.app/"
                className="homelabelcolor devprofilepagelink"
              >
                https://emmanuelfestus.netlify.app/
              </a>
            </div>
            <div className="flex gap-2 mt-1">
              <span>
                <FontAwesomeIcon icon="fa-brands fa-github" />
              </span>
              <a
                href="https://github.com/GeneralAike"
                className="homelabelcolor devprofilepagelink text-sm"
              >
                @GeneralAike
              </a>
            </div>
            <div className="flex gap-2 mt-1">
              <span className="text-sm">
                <FontAwesomeIcon icon="fa-solid fa-code" />
              </span>
              <p className=" text-slate-300">Front-end web developer</p>
            </div>
          </div>
        </div>
        <div className="p-3 pb-60">
          <div>
            <FontAwesomeIcon icon="fa-solid fa-code" />
          </div>
          <p>
            Hey guys, Emmanuel here. I have been working in the tech industry
            for a number of years, and in that time I have gained a wealth of
            experience and knowledge in a variety of programming languages and
            frameworks. I am always eager to learn more and stay up-to-date on
            the latest technologies.
          </p>
          <div className="flex flex-row-reverse">
            <FontAwesomeIcon icon="fa-solid fa-code" />
          </div>
          <div className="mt-4">
            <p className=" text-2xl homelabelcolor">Skills</p>
            <p className="mb-3 mt-3">Programming language & tools</p>
            <div className="flex gap-5 flex-wrap">{skills}</div>
          </div>
          <div className="mt-6">
            <p className=" text-2xl mb-3 homelabelcolor">Education</p>
            <div>
              <p>LANDMARK UNIVERSITY</p>
              <p className="text-sm homelabelcolor">
                100 level to 500 level where i studied mechanical engineering
              </p>
              <p className="text-sm homelabelcolor">
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                </span>{" "}
                2017 to 2022
              </p>
            </div>
            <div className="mt-3">
              <p>RAY-FIELD SECONDARY SCHOOL</p>
              <p className="text-sm homelabelcolor">
                Jss1 to SS3 where i majored in Science
              </p>
              <p className="text-sm homelabelcolor">
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                </span>{" "}
                2011 to 2017
              </p>
            </div>
            <div className="mt-3">
              <p>RAY-FIELD PRIMARY SCHOOL</p>
              <p className="text-sm homelabelcolor">Primary 1 to Primary 4</p>
              <p className="text-sm homelabelcolor">
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
                </span>{" "}
                2007 to 2011
              </p>
            </div>
          </div>
          <section className="pt-4">
            <p className=" text-2xl">
              Get verified on Tweeter{" "}
            </p>
            <p className="text-sm">Support TWEETER dev by getting verified, you never know, this might be the next twitter</p>
            
            <div className="bankcard h-64 mx-auto mt-5 rounded-2xl ">
              <div className="flex justify-between px-6 pt-5">
                <p className="font-semibold text-xl">Tweeter Verification</p>
                <div
                  className=" text-5xl"
                  style={{ color: " var(--blueText)" }}
                >
                  <FontAwesomeIcon icon="fa-brands fa-twitter" />
                </div>
              </div>
              <div className="px-6 flex flex-col gap-2">
                <p className="text-sm">Account Number</p>
                <p className="text-3xl">0739518320</p>
              </div>
              <div className="flex justify-between px-6 pt-4 items-end">
                <div className="flex flex-col">
                  <p className="bankinbankcard">Bank</p>
                  <p>Access Bank</p>
                  <p className="">Emmanuel Ikpomosa Esekhaigbe</p>
                </div>
                <div>
                  <p>Fee</p>
                  <p className=" whitespace-nowrap">1000 Naira</p>
                </div>
              </div>
            </div>
            <p className="pt-3">After payment, kindly contact me on any of the options provided in the contact page.</p>
          </section>
        </div>
      </section>
    </>
  );
}

export default AboutDevTab;
