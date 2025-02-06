  import {create} from 'zustand'
  import {persist,createJSONStorage} from 'zustand/middleware'

  const useStore = create((set)=>({
    
      userData:null,
      loggedIn: false,
      setUserData:(loggedIn,userData=null)=>{
      
        if (loggedIn) {
          localStorage.setItem("userData", JSON.stringify(userData))}
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
    
      initializeAuth: () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const userDataString = localStorage.getItem("userData");
      
        let userData = null;
      
        // Check if userData exists and is a valid JSON string
        if (userDataString) {
          try {
            userData = JSON.parse(userDataString);
          } catch (error) {
            console.error("Error parsing userData:", error);
          }
        }
      
        if (accessToken && refreshToken && userData) {
          set({ loggedIn: true, accessToken, refreshToken, userData });
        }
      },

      recentPrompt: [],
    setRecentPrompt: (recentPrompt) => set(state=>({
      recentPrompt:[...state.recentPrompt,recentPrompt]
    })),

    prevPrompt: JSON.parse(localStorage.getItem('prevPrompt'))||[],
    setPrevPrompt: (prev) => set((state)=>({
      prevPrompt:[...state.prevPrompt,prev]
    })),

    result: [],
    setResult: (result) => set(state=>({
      result:[...state.result,result]
    })),

    

    
    
      

    


      
    }));
  export default useStore;
