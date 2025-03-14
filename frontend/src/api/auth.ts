import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/v2/auth/login`, { email, password });
        console.log("login:", response);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error; // Optionally rethrow for further handling
    }
};

export const register = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/v2/auth/register`, { username, email, password });
        console.log("register:", response);
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error; // Optionally rethrow for further handling
    }
};