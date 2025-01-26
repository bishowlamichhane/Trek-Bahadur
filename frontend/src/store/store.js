import {create} from 'zustand'

const useStore = create((set)=>({
  
    userData:null,
    loggedIn: false,
    setUserData:(loggedIn,userData=null)=>{
    
      if (loggedIn) {
        localStorage.setItem("userData",userData)}
        else {
         
          localStorage.removeItem("userData");
        }
        set({userData})

    },
   
    accessToken: null,
    refreshToken: null,
    
    // Set the logged-in state and store tokens
    setLoggedIn: (loggedIn, accessToken = null, refreshToken = null) => {
      if (loggedIn) {
        // Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        // Remove tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      set({ loggedIn, accessToken, refreshToken });
    },
  
    // Initialize the store with tokens from localStorage
    initializeAuth: () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userData = localStorage.getItem("userData")

      if (accessToken && refreshToken && userData) {
        set({ loggedIn: true, accessToken, refreshToken,userData });
      }
    }
  }));
export default useStore