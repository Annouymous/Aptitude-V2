"use client";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config"; // Firebase initialization

const LoginPage = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your user ID"
          required
        />
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
