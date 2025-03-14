import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { RotateCw } from "lucide-react";

const Signup: React.FC = () => {
  // State to store email and password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Handle email and password change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const resp = await register(username, email, password);
    setIsLoading(false);
    if(resp.message === 'User registered successfully'){
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              placeholder="Alex Mercer"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center text-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Signup {loading && <RotateCw size={20} className="animate-spin"/>}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-500 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
