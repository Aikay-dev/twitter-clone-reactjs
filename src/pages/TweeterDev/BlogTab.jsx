import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import blogOne from "../../assets/blog1.jpg";
import blogTwo from "../../assets/blog2.jpg";

function BlogTab() {
  return (
    <>
      <a
        target="_blank"
        href="https://dev.to/aikay/developing-an-e-commerce-website-with-javascript-and-firebase-a-comprehensive-guide-series-1-3m73"
        className="main-tweet-card pb-3 w-full relative cursor-pointer flex"
      >
        <div className="mt-3  ml-4 main-tweet-card-first-half">
          <img
            src="https://picsum.photos/200/300"
            alt="user profile image"
            className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
          />
        </div>

        <div className="w-full main-tweet-card-second-half">
          <div className="flex justify-between w-full pr-2 mt-3">
            <div className="flex items-center">
              <p className="main-tweet-card-display-name font-semibold mr-2 whitespace-nowrap flex-wrap ">
                Tweeter Dev
              </p>
              <p className="text-sm main-tweet-card-username whitespace-nowrap">
                @generalik . Timeless
              </p>
            </div>
            <div className="">
              <div className="homepage-center-current-trend-more font-bold rounded-full cursor-pointer">
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
              </div>
            </div>
          </div>
          <div className="main-tweet-card-content overflow-x-hidden">
            <p>
              How to create an E-commerce website with javascript and firebase
            </p>
            <div className=" linkdevpagepost overflow-hidden mr-4">
              <img src={blogOne} alt="" className="linkimagedevpage" />
              <div className="p-2">
                <p className="homelabelcolor text-sm">https://dev.to/aikay</p>
                <p>How to create an E-commerce website</p>
                <p className="homelabelcolor text-sm">
                  When new developers first learn Javascript, the undertake
                  projects to enhance their skills, capabilities and have a feel
                  for what project building is like. In this blog, i will teach
                  you how to create an E-commerce website with just Javascript
                  and Firebase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
      <a
        target="_blank"
        href="https://dev.to/aikay/how-to-consume-an-api-with-vanilla-javascript-5ec7"
        className="main-tweet-card pb-3 w-full relative cursor-pointer flex"
      >
        <div className="mt-3  ml-4 main-tweet-card-first-half">
          <img
            src="https://picsum.photos/200/300"
            alt="user profile image"
            className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
          />
        </div>

        <div className="w-full main-tweet-card-second-half">
          <div className="flex justify-between w-full pr-2 mt-3">
            <div className="flex items-center">
              <p className="main-tweet-card-display-name font-semibold mr-2 whitespace-nowrap flex-wrap ">
                Tweeter Dev
              </p>
              <p className="text-sm main-tweet-card-username whitespace-nowrap">
                @generalik . Timeless
              </p>
            </div>
            <div className="">
              <div className="homepage-center-current-trend-more font-bold rounded-full cursor-pointer">
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
              </div>
            </div>
          </div>
          <div className="main-tweet-card-content overflow-x-hidden">
            <p>How to consume an API with vanilla javascript</p>
            <div className=" linkdevpagepost overflow-hidden mr-4">
              <img src={blogTwo} alt="" className="linkimagedevpage" />
              <div className="p-2">
                <p className="homelabelcolor text-sm">https://dev.to/aikay</p>
                <p>How to Consume an API</p>
                <p className="homelabelcolor text-sm">
                  API consumption or API fetching refers to the process of
                  accessing and using data or services provided by an
                  Application Programming Interface (API). Almost all websites
                  use APIs to communicate with their backends or servers
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default BlogTab;
