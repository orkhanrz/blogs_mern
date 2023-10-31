import { createContext, useState } from "react";

const userContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    fetch("/api/users/signout", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(null);
        }
      });
  };

  const edit = (user) => {
    setUser((prevState) => {
      return {
        ...prevState,
        ...user,
      };
    });
  };

  return (
    <userContext.Provider value={{ user, login, logout, edit }}>
      {children}
    </userContext.Provider>
  );
}

export { UserContextProvider, userContext };
