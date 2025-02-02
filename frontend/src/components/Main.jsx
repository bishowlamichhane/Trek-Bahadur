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

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between p-6">
      <div className="w-full h-14  flex justify-between items-center mt-0">
        <img
          src="/trekBahadur_logo.png"
          alt="appLogo"
          className=" h-full object-cover cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="w-8 h-8">
          <img
            src="/nepal1.jpg"
            alt="avatar"
            className="object-cover rounded-full h-full w-full cursor-pointer"
          />
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-between overflow-hidden">
        {!recentPrompt.length ? (
          <div className="w-full flex flex-col items-center justify-center flex-grow space-y-10">
            <div className="text-6xl font-medium bg-gradient-to-r from-blue-900 via-red-500 to-purple-900 bg-clip-text text-transparent">
              Hi {firstName},
            </div>
            <div className="text-2xl font-medium bg-gradient-to-r from-purple-700 via-red-560 to-blue-500 bg-clip-text text-transparent">
              What can I assist you with today?
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
              {[
                "Suggest some of the top places to visit in Nepal",
                "Must-try foods in Nepal",
                "Top cultural sites in Nepal",
                "Best trekking routes in Nepal",
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex-wrap h-32 rounded-2xl p-6 bg-gradient-to-t cursor-pointer border border-slate-200 shadow-md hover:shadow-2xl transition duration-300 ease-in-out overflow-hidden"
                  onClick={() => sendPrompt(text)}
                >
                  <p className="text-md font-medium text-slate-800">{text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Output Section */
          <div className="w-full flex-1 overflow-auto max-h-[65vh] px-8 py-4 space-y-6 border border-gray-300 rounded-md">
            {recentPrompt.map((prompt, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-4">
                <div className="self-end w-auto px-6 py-2 bg-slate-300 rounded-2xl">
                  {isLoading ? "..." : prompt}
                </div>

                {!isLoading ? (
                  <div className="flex items-start space-x-4 w-3/4">
                    <FcDebian className="text-4xl" />
                    <div className="flex flex-col">{result[idx]}</div>
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-6 w-3/5 flex items-center">
        <input
          className="border border-slate-600 rounded-3xl w-full h-12 p-6 pl-8 pr-16 focus:outline-none"
          type="text"
          ref={inputElement}
          placeholder="Enter your message"
          onKeyDown={handleEnter}
          onChange={() => setIsWriting(true)}
        />
        <div
          className="absolute w-14 h-8 rounded-lg right-4 text-slate-700 font-medium top-1/2 transform -translate-y-1/2 cursor-pointer flex items-center justify-center"
          onClick={sendInput}
        >
          {!isWriting ? <RiVoiceprintFill className="text-2xl" /> : "Send"}
        </div>
      </div>
    </div>
  );
};

export default Main;
