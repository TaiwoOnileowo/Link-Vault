import React from "react";
import { MdLogout } from "react-icons/md";
import { deleteStorage } from "../../utils/api";
import { useAppContext } from "../../context";
import { goTo } from "react-chrome-extension-router";
import Home from "../Home";
import { AppContextType } from "../../types";
const index = () => {
  const { session } = useAppContext() as AppContextType;

  const handleLogout = () => {
    deleteStorage("Links");
    deleteStorage("Folders");

    goTo(Home);
  };
  return (
    <div className="w-full text-white items-center text-xl justify-center flex flex-col h-screen">
      {session ? (
        <h1>You are logged in as {session.user.name.split(" ")[0]}</h1>
      ) : (
        <h1>You are not logged in</h1>
      )}
      <a
        href={`http://localhost:3000/${session ? "logout" : "login"}`}
        target="_blank"
      >
        <button onClick={handleLogout} className="bg-primary-2 px-4 py-2 mt-4">
          {session ? (
            <span className="flex gap-2 items-center ">
              Log out <MdLogout />
            </span>
          ) : (
            `Log in `
          )}
        </button>
      </a>
    </div>
  );
};

export default index;
