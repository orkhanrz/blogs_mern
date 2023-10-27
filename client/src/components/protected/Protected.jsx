import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";

function Protected({ children }) {
  const { user } = useContext(userContext);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default Protected;
