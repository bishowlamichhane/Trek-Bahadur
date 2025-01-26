import { Outlet } from "react-router-dom";
import useStore from "../store/store.js";
import { useEffect } from "react";

import "./App.css";
const App = () => {
  const initializeAuth = useStore((state) => state.initializeAuth);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
