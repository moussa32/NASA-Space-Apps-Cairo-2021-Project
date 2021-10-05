import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { RiHealthBookFill } from "react-icons/ri";
import "./BottomNavigation.css";

const BottomNavigation = ({ location }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setActiveTab("dashboard");
    } else if (location.pathname.includes("notifications")) {
      setActiveTab("notifications");
    } else if (location.pathname.includes("disease")) {
      setActiveTab("disease");
    } else if (location.pathname.includes("result")) {
      setActiveTab("result");
    } else if (location.pathname.includes("news")) {
      setActiveTab("news");
    } else {
      setActiveTab("home");
    }
  }, [activeTab]);

  return (
    <nav className="bottomNav">
      <Link
        className={`links ${activeTab === "dashboard" ? "selected" : ""} text-white`}
        to="/dashboard"
      >
        <MdDashboard size={"1.5rem"} />
      </Link>
      <Link
        className={`links ${
          activeTab === "disease" || activeTab === "result" ? "selected" : ""
        } text-white`}
        to="/disease"
      >
        <RiHealthBookFill size={"1.5rem"} />
      </Link>
      <Link
        className={`links ${activeTab === "notifications" ? "selected" : ""} text-white`}
        to="/notifications"
      >
        <IoMdNotifications size={"1.5rem"} />
      </Link>
      <Link className={`links ${activeTab === "news" ? "selected" : ""} text-white`} to="/news">
        <IoNewspaper size={"1.5rem"} />
      </Link>
    </nav>
  );
};

export default withRouter(BottomNavigation);
