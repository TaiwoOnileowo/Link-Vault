import React from "react";
import { MdLogout } from "react-icons/md";
import { deleteStorage } from "../../utils/api";
import { useAppContext } from "../../context";
import { goTo } from "react-chrome-extension-router";
import Home from "../Home";
const index = () => {
  const { setSessionid } = useAppContext();

  const handleLogout = () => {
    deleteStorage("Links");
    deleteStorage("Folders");
    setSessionid(null);
    goTo(Home)
  };
  return (
    <div>
      <a href="http://localhost:3000/logout" target="_blank">
        <p onClick={handleLogout}>
          Logout <MdLogout />
        </p>
      </a>
    </div>
  );
};

export default index;
