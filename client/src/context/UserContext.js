import { createContext, useState } from "react";

const userContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    fetch("/users/signout", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(null);
        }
      });
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
}

export { UserContextProvider, userContext };
