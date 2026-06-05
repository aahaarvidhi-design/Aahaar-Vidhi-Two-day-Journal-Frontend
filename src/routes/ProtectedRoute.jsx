import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const ProtectedRoute = ({
  children
}) => {

  const {
    loading
  } = useAuth();

  const token =
    localStorage.getItem(
      "token"
    );

  if (loading) {

    return (
      <h3>
        Loading...
      </h3>
    );
  }

  if (!token) {

    return (
      <Navigate
        to="/login"
      />
    );
  }

  return children;
};

export default ProtectedRoute;