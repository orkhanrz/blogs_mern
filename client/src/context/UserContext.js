import { createContext, useState } from "react";

const userContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    fetch("/api/users/signout", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(null);
          localStorage.removeItem("user");
        }
      });
  };

  const edit = (user) => {
    setUser((prevState) => {
      const editedUser = { ...prevState, ...user };
      localStorage.setItem("user", JSON.stringify(editedUser));

      return editedUser;
    });
  };

  return (
    <userContext.Provider value={{ user, login, logout, edit }}>
      {children}
    </userContext.Provider>
  );
}

export { UserContextProvider, userContext };
