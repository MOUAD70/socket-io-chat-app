import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UNAUTHORIZED_ROUTE } from "../Routes";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={UNAUTHORIZED_ROUTE} replace />;
  }

  return children;
}
