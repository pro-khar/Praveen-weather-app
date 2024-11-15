// App.js
import  { useState, useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";

import WeatherSearch from "./Components/WeatherSearch";

const clientId =
  "223830906538-i9ou4nrase53dcb1ju8fjkbtop013rbv.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState(null);

  // On successful login, save the user data in localStorage
  const handleLoginSuccess = (response) => {
    const { credential } = response;
    const userObject = {
      token: credential,
      profile: decodeJwt(credential), // decode to get user info
    };
    setUser(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed:", error);
  };

  // Load user data from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function to clear session data
  const handleLogout = () => {
    googleLogout(); // optional, only if you want to trigger Google's logout
    setUser(null);
    localStorage.removeItem("user");
  };

  // Function to decode JWT token (Google's credential response)
  const decodeJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <h1>Weather Search App</h1>
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        ) : (
          <div>
            <h2>Welcome, {user.profile.name}</h2>
            <WeatherSearch />
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
