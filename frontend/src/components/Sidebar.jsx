import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import useStore from "../store/store.js";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const prevPrompt = useStore((state) => state.prevPrompt);
  const count = prevPrompt.length + 1;
  const setUserData = useStore((state) => state.setUserData);
  const token = useStore((state) => state.accessToken);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const loggedIn = useStore((state) => state.loggedIn);
  const setLoggedIn = useStore((state) => state.setLoggedIn);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await fetch("/api/users/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setLoggedIn(false);
        setUserData(null);
        setUserData(false);
        navigate("/");
      }
    } catch (err) {
      console.log("Error Occurred: ", err.message);
    }
  };

  const register = () => {
    navigate("/register");
  };

  const openPrompt = async () => {};
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="w-full h-20  border-b-2 ">
        <div className="menu-toggle" onClick={toggleSidebar}>
          <IoMenu className="w-6 h-6 text-gray-700" />
        </div>
      </div>
      <div className="w-full h-full mt-4 flex flex-col items-start">
        <div className="w-2/3 h-10  flex justify-start items-center gap-2 cursor-pointer">
          <p className="text-sm">New </p>
          <span>
            <IoMdAdd />
          </span>
        </div>

        <div
          className="w-2/3 h-10 
      \
      [-96] block gap-2 mt-4 flex justify-start"
        >
          {" "}
          <p className="text-sm">Recent </p>
        </div>
        <div className="w-2/3 h-full  p-2 block gap-2 mt-4">
          <div className="w-full flex flex-col gap-1">
            {prevPrompt.length > 0 ? (
              prevPrompt.map((prompt, index) => (
                <p
                  key={index}
                  className="overflow-hidden whitespace-nowrap text-sm text-gray-900 bg-slate-100 px-2 rounded-md"
                  onClick={openPrompt}
                >
                  {prompt.slice(0, 18)}
                </p>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent prompts</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-36  flex flex-col justify-start  border border-1">
        <div>
          <IoIosHelpCircleOutline />
          <IoSettingsSharp />
          <GoHistory />
        </div>
        <div
          className="w-full h-6  flex justify-start cursor-pointer items-center  gap-2 whitespace-nowrap"
          onClick={register}
        >
          <FaRegCircleUser />
          {loggedIn ? (
            <p className="text-sm" onClick={logOut}>
              Log out
            </p>
          ) : (
            <p className="text-sm" onClick={register}>
              Sign Up
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
