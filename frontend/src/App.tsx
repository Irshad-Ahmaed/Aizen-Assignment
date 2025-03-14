import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const ProtectedRoute = ({ children }: { children: any }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
