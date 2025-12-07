import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN_ROUTE } from "../Routes";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return "";

  if (!user) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return children;
}
