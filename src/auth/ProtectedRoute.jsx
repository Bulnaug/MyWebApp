import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>⏳ Lade...</p>;
  return user ? children : <Navigate to="/" />;
}