import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login, register } from "../api/auth";

const AuthForm = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = isLogin ? await login(email, password) : await register(username, email, password);
            setToken(data.access_token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Authentication failed", error);
        }
    };

    return (
        <div>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && <input type="username" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)} required />}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Switch to Register" : "Switch to Login"}
            </button>
        </div>
    );
};

export default AuthForm;