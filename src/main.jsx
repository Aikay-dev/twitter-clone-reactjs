import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import App from "./App";
import Authentication from "./pages/auth/Authentication";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { Provider } from "react-redux";
import { store } from "./store";
import SettingsPage from "./pages/settings/settingsPage";
import Explore from "./pages/Explore";
import PersonalizationAndData from "./pages/settings/PersonalizationAndData";
import TweeterData from "./pages/settings/TweeterData";
import AdditionalResources from "./pages/settings/AdditionalResources";
import TweeterBluePage from "./pages/TweeterDev/TweeterBluePage";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import MessagesPage from "./pages/MessagesPage";
import BookmarksPage from "./pages/BookmarksPage";
import FullTweet from "./pages/FullTweet";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/Home" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home",
    element: <App />,
    children: [
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Signup",
        element: <SignUp />,
      },
      {
        path: "Settings",
        element: <SettingsPage/>,
        children: [
          {
            path: "personalization",
            element: <PersonalizationAndData/>
          },
          {
            path: "your_twitter_data",
            element: <TweeterData/>
          },
          {
            path: "about",
            element: <AdditionalResources/>
          },
        ]
      },
      {
        path: "Explore",
        element: <Explore/>,
        children: [
          {
            path: "Login",
            element: <Login />,
          },
          {
            path: "Signup",
            element: <SignUp />,
          },
        ]
      },{
        path: "Bookmarks",
        element: <BookmarksPage />,
      },{
        path: "Messages",
        element: <MessagesPage />,
      },{
        path: "Notifications",
        element: <NotificationPage />,
      },{
        path: "Profile",
        element: <ProfilePage />,
      },{
        path: "Tweeter Blue",
        element: <TweeterBluePage />,
      },{
        path: "/Home/:username/:timestamp",
        element: <FullTweet />,
      },{
        path: "/Home/:username",
        element: <ProfilePage />,
      },
      {
        path: "Search",
        element: <Search />
      }
    ],
  },
  {
    path: "auth/",
    element: <Authentication />,
    children: [
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Signup",
        element: <SignUp />,
      },
    ],
  },
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
