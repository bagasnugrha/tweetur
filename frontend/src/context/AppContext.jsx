import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({children}) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  async function getUser() {
    const res = await fetch("/api/user", {
      headers: {
        // send token to the api
        Authorization: `Bearer ${token}`
      }
    });
    
    if (res.ok) {
      // retreive the user
      const data = await res.json();
      // assign the retreived user to the user state
      setUser(data);
    }
  };
  
  // get the user if local storage has/change the token
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  
  return (
    // pass the state globally
    <AppContext.Provider value={{ token, setToken, user, setUser}}>
      {children}
    </AppContext.Provider>
  );
}