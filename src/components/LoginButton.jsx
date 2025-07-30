import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Link } from "react-router-dom";


import BoardsPage from "../pages/BoardsPage";
import BoardPage from "../pages/BoardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LogoutButton from "../components/LogoutButton"


export default function LoginPanel() {
  return (

    <div>
        
        <div className="flex space-x-4">
            <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
            Login
            </Link>

            <Link
            to="/register"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
            >
            Register
            </Link>
        </div>
       
    </div>
  );
}