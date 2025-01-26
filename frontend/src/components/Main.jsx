import useStore from "../store/store.js";

const Main = () => {
  const userData = useStore((state) => state.userData);
  const loggedIn = useStore((state) => state.loggedIn);
  const firstName =
    loggedIn && userData.fullName ? userData.fullName.split(" ")[0] : "there";
  const token = useStore((state) => state.accessToken);

  console.log(userData, firstName, token);
  const openProfile = () => {};
  return (
    <div className="border border-black-500 w-full h-screen flex flex-col pr-14 pl-10 pt-4 pb-14 items-center justify-between gap-4">
      <div className="w-full h-10  flex justify-between items-center ">
        <img
          src="/trekBahadur_logo.png"
          alt="appLogo"
          className="w-40 h-full object-cover cursor-pointer"
          onClick={openProfile}
        />
        <div className="w-8 h-8 ">
          <img
            src="/nepal1.jpg"
            alt="avatar"
            className="object-cover rounded-full h-full w-full cursor-pointer"
          />
        </div>
      </div>
      <div className="w-3/4 h-1/3  flex flex-col gap-6 items-center py-6">
        <div className="text-6xl font-bold bg-gradient-to-r from-blue-900 via-red-500 to-purple-900 bg-clip-text text-transparent">
          Hi {firstName},
        </div>
        <div className="text-3xl font-medium bg-gradient-to-r from-purple-700 via-red-600 to-blue-500 bg-clip-text text-transparent">
          What can I assist you with, Today?
        </div>
      </div>

      <div className="w-full h-1/3 flex gap-3 justify-between px-2 ">
        <div className="w-64 h-full rounded-2xl p-8 bg-gradient-to-t cursor-pointer border border-slate-200  shadow-md  hover:shadow-2xl transition duration-300 ease-in-out ">
          <p className="text-lg font-medium text-slate-800">
            Suggest some of the top places to visit in Nepal.
          </p>
        </div>
        <div className="w-64 h-full rounded-2xl p-8 bg-gradient-to-t cursor-pointer border border-slate-200 shadow-md  hover:shadow-2xl transition duration-300 ease-in-out ">
          <p className="text-lg font-medium text-slate-800">
            "Must-try foods in Nepal"
          </p>
          <span></span>
        </div>
        <div className="w-64 h-full rounded-2xl p-8 bg-gradient-to-t cursor-pointer border border-slate-200 shadow-md  hover:shadow-2xl transition duration-300 ease-in-out ">
          <p className="text-lg font-medium text-slate-800">
            "Top cultural sites in Nepal"{" "}
          </p>
          <span></span>
        </div>
        <div className="w-64 h-full rounded-2xl p-8 bg-gradient-to-t cursor-pointer border border-slate-200 shadow-md  hover:shadow-2xl transition duration-300 ease-in-out ">
          <p className="text-lg font-medium text-slate-800">
            "Best trekking routes in Nepal"
          </p>
          <span></span>
        </div>
      </div>

      <div className="w-3/4 h-1/6  flex justify-center items-center relative">
        <input
          className="  border border-slate-600 rounded-3xl w-full h-12 p-6 pl-8 pr-16 focus:outline-none"
          type="text"
          placeholder="Enter your message"
        />
        <div className="absolute w-14 h-8 rounded-lg right-7 text-slate-700 font-medium top-1/2 transform -translate-y-1/2 cursor-pointer  flex items-center justify-center">
          Send
        </div>
      </div>
    </div>
  );
};

export default Main;
