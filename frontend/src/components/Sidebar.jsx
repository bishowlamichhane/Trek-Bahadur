import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store.js";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="w-full h-20  border-b-2 ">
        <div className="menu-toggle" onClick={toggleSidebar}>
          <IoMenu className="w-6 h-6 text-gray-700" />
        </div>
      </div>
      <div className="w-full h-full mt-4 ">
        <div className="w-2/3 h-10 bg-slate-100 rounded-2xl p-2 flex justify-center items-center gap-2 ">
          <p className="text-sm">New </p>
          <span>
            <IoMdAdd />
          </span>
        </div>
      </div>
      <div className="w-full h-36  flex justify-start items-center">
        <div
          className="w-full h-6 bg-slate-100 rounded-2xl flex justify-center cursor-pointer "
          onClick={register}
        >
          {loggedIn ? (
            <p className="text-md" onClick={logOut}>
              Log out
            </p>
          ) : (
            <p className="text-md" onClick={register}>
              Sign Up
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
