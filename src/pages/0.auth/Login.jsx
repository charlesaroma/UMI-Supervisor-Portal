import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic
    if (email === "josh@umi.ac.ug" && password === "password123") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Incorrect username or password. Please try again");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo */}
      <div className="mb-8 flex items-center">
        <img src="/Logo%20main.png" alt="UMI Logo" className="h-16 mb-2" />
      </div>
      {/* Login Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              School Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full border ${
                  error ? "border-red-400" : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                <Icon
                  icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                  className="h-5 w-5"
                />
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="form-checkbox rounded text-blue-600"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-yellow-700 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition-colors mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
