import { useRef, useState } from "react";
import useStore from "../store/store.js";
import { FcDebian } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import model from "../config/gemini.js";
import Loading from "./Loading.jsx";
import { RiVoiceprintFill } from "react-icons/ri";

const Main = () => {
  const [isWriting, setIsWriting] = useState(false);

  const navigate = useNavigate();
  const userData = useStore((state) => state.userData);
  const loggedIn = useStore((state) => state.loggedIn);
  const firstName =
    loggedIn && userData.fullName ? userData.fullName.split(" ")[0] : "there";
  const recentPrompt = useStore((state) => state.recentPrompt);
  const setRecentPrompt = useStore((state) => state.setRecentPrompt);
  const setPrevPrompt = useStore((state) => state.setPrevPrompt);
  const inputElement = useRef(null);
  const result = useStore((state) => state.result);
  const setResult = useStore((state) => state.setResult);

  const [isLoading, setIsLoading] = useState(false);
  const handleEnter = (e) => {
    if (e.key === "Enter") sendInput();
  };
  const sendPrompt = (text) => {
    inputElement.current.value = text;
    sendInput();
  };

  const sendInput = async () => {
    setIsLoading(true);
    const input = inputElement.current.value;

    setRecentPrompt(input);
    setPrevPrompt(input);

    let tryy = await model.generateContent(input);
    let resultText = "";
    if (tryy.response) {
      resultText = await tryy.response.text();
      resultText = resultText.replace(/\*/g, "");
      console.log(resultText);
    }
    setResult(resultText);
    setIsLoading(false);
    const command = {
      input,
      result: resultText,
    };

    try {
      const response = await fetch("/api/users/addCommand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
      });

      if (response.ok) {
        inputElement.current.value = "";
        setIsWriting(false);
      }
    } catch (err) {
      console.log("Error sending the input command ", err);
    }
  };

  const openProfile = () => {};
  return (
    <div className=" w-full h-screen flex flex-col pr-14 pl-10 pt-4 pb-6 items-center justify-between gap-4  ">
      <div className="w-full h-10  flex justify-between items-center ">
        <img
          src="/trekBahadur_logo.png"
          alt="appLogo"
          className="w-40 h-full object-cover cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="w-8 h-8 ">
          <img
            src="/nepal1.jpg"
            alt="avatar"
            className="object-cover rounded-full h-full w-full cursor-pointer"
          />
        </div>
      </div>

      {!recentPrompt.length ? (
        <div className="w-full h-full flex flex-col items-center justify-around ">
          <div className="w-3/4 h-1/3  flex flex-col gap-6 items-center py-6">
            <div className="text-6xl font-medium bg-gradient-to-r from-blue-900 via-red-500 to-purple-900 bg-clip-text text-transparent">
              Hi {firstName},
            </div>
            <div className="text-2xl font-medium bg-gradient-to-r from-purple-700 via-red-560 to-blue-500 bg-clip-text text-transparent">
              What can I assist you with, Today?
            </div>
          </div>

          <div className="w-3/4 h-2/5 flex gap-3 justify-between px-14 ">
            <div
              className="w-56 overflow-hidden h-full rounded-2xl p-8 bg-gradient-to-t cursor-pointer border border-slate-200  shadow-md  hover:shadow-2xl transition duration-300 ease-in-out  "
              onClick={() =>
                sendPrompt("Suggest some of the top places to visit in Nepal")
              }
            >
              <p className="text-md font-medium text-slate-800">
                Suggest some of the top places to visit in Nepal.
              </p>
            </div>
            <div
              className="w-56 h-full rounded-2xl p-8 bg-gradient-to-t cursor-pointer border border-slate-200 shadow-md  hover:shadow-2xl transition duration-300 overflow-hidden ease-in-out "
              onClick={() => sendPrompt("Must-try foods in Nepal")}
            >
              <p className="text-md font-medium text-slate-800">
                "Must-try foods in Nepal"
              </p>
              <span></span>
            </div>
            <div
              className="w-56 h-full rounded-2xl p-8 bg-gradient-to-t cursor-pointer border border-slate-200 shadow-md  hover:shadow-2xl transition duration-300 overflow-hidden ease-in-out "
              onClick={() => sendPrompt("Top cultural sites in Nepal")}
            >
              <p className="text-md font-medium text-slate-800">
                "Top cultural sites in Nepal"{" "}
              </p>
              <span></span>
            </div>
            <div
              className="w-56 h-full rounded-2xl p-8 bg-gradient-to-t cursor-pointer border border-slate-200 shadow-md  hover:shadow-2xl transition duration-300 ease-in-out overflow-hidden "
              onClick={() => sendPrompt("Best trekking routes in Nepal")}
            >
              <p className="text-md font-medium text-slate-800">
                "Best trekking routes in Nepal"
              </p>
              <span></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-scroll w-full h-full scroll-auto no-scrollbar border border-1 px-32 space-y-12 pt-10">
          {recentPrompt.length > 0 && result.length > 0
            ? recentPrompt.map((prompt, idx) => (
                <div
                  className=" flex flex-col justify-start  gap-8 items-center "
                  key={idx}
                >
                  <div className="self-end w-auto h-auto mx-20 px-6 py-2 bg-slate-300 rounded-2xl">
                    {isLoading ? "..." : prompt}
                  </div>
                  {!isLoading ? (
                    <div className="flex items-start space-x-8 w-2/3">
                      <div className="w-8 h-8">
                        <FcDebian className="text-4xl" />
                      </div>

                      <div className="flex flex-col">{result[idx]}</div>
                    </div>
                  ) : (
                    <Loading />
                  )}
                </div>
              ))
            : ""}
        </div>
      )}

      <div className="w-3/5 h-1/8  flex justify-center items-center relative">
        <input
          className="  border border-slate-600 rounded-3xl w-full h-12 p-6 pl-8 pr-16 focus:outline-none"
          type="text"
          ref={inputElement}
          placeholder="Enter your message"
          onKeyDown={handleEnter}
          onChange={() => setIsWriting(true)}
        />
        <div
          className="absolute w-14 h-8 rounded-lg right-7 text-slate-700 font-medium top-1/2 transform -translate-y-1/2 cursor-pointer  flex items-center justify-center"
          onClick={sendInput}
        >
          {!isWriting ? <RiVoiceprintFill className="text-2xl" /> : "Send"}
        </div>
      </div>
    </div>
  );
};

export default Main;
