import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";
import { motion } from "motion/react"
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password );
  };
  return (
    <motion.div className="flex flex-col items-center justify-center min-w-96 mx-auto" initial={{ opacity: 0, scale: 0.9, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
      delay: 0.1,
    }}>
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-5">
          Login
          <span className="text-blue-500"> ChatMe</span>
        </h1>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-1">
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              value={username}
              placeholder="Enter username"
              className="w-full input input-primary h-10 py-3 "
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-primary h-10  outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-primary" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner small"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
