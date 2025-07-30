import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
