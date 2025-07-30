import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Link } from "react-router-dom";


import BoardsPage from "../pages/BoardsPage";
import BoardPage from "../pages/BoardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LogoutButton from "../components/LogoutButton"


export default function Homepage() {
  return (

    <div>
        <h1 className="text-2xl font-bold mb-4">📋 MyPlanner</h1>
        
        
    </div>
  );
}