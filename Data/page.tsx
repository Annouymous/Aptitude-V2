"use client";
import { useState } from "react";
import UserForm from "./UserForm";
// Assuming you have the test component
import LoginPage from "./Login";
import AptitudeTest from "./AptitudeTest";

const App = () => {
  const [userData, setUserData] = useState(null);

  const handleUserCreated = (userId) => {
    alert(`User created! Your User ID is: ${userId}`);
  };

  const handleLoginSuccess = (userData) => {
    setUserData(userData);
  };

  if (!userData) {
    return (
      <div>
        <UserForm onUserCreated={handleUserCreated} />
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return <AptitudeTest />;
};

export default App;
