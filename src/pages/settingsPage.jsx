import React from "react";

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <section className="settings-main-tab">
        <p className="pt-3 pl-4 font-semibold text-xl pb-6">Settings</p>
        <p className="pl-4 text-xl font-bold">Privacy</p>
        <div className="flex justify-between mt-4 pr-4">
          <div className=" ">
            <p className="pl-4 font-semibold">Personalization and data</p>
            <p className="pl-4">Allow all</p>
          </div>
          <p>{">"}</p>
        </div>
        <div>
          <p className="pl-4">Your Tweeter data</p>
          <p>{">"}</p>
        </div>
        <p className="pl-4">
          These settings apply to this browser or device while you’re logged
          out. They don’t have any effect when you’re logged in.
        </p>
        <p className="pl-4">General</p>
        <div>
          <p className="pl-4">Additional resources</p>
          <p> {">"} </p>
        </div>
      </section>
      <section className="settings-tab-expanded"></section>
    </div>
  );
};

export default SettingsPage;
