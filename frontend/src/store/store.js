import {create} from 'zustand'

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

    recentPrompt:null,
    setRecentPrompt:(recentPrompt)=>set(state=>({
      recentPrompt:recentPrompt
    })),
    prevPrompt:[],
    setPrevPrompt:(prev)=>set(state=>(
      {
        prevPrompt:[...state.prevPrompt,prev]
      }
    )),

    showResult:false,
    setShowResult:()=>set(state=>
    ({
      showResult:!state.showResult
    })
    ),

    result:["This is your result"],
    setResult:()=>set(state=>({
      result:state.result
    })),
    isLoading : false,
    setIsLoading:()=>set(state=>({
      isLoading:!state.isLoading
    }))
    


  


    
  }));
export default useStore;
