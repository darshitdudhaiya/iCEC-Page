import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure you have this package installed

const Profile = () => {
  const [token, setToken] = useState({
    name: "N/A",
    picture: "N/A",
    email: "N/A",
    email_verified: "N/A",
    provider: "N/A",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Get the token from localStorage
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken); // Decode the JWT
        
        // Check if it's a Firebase token
        if (decoded.firebase) {
          setToken({
            name: decoded.name || "N/A",
            picture: decoded.picture || "N/A",
            email: decoded.email || "N/A",
            email_verified: decoded.email_verified || "N/A",
            provider: decoded.firebase.sign_in_provider || "N/A",
          });
        } else {
          // Handle custom token case if necessary
          setToken({
            name: decoded.name || "N/A",
            picture: "N/A", // Assuming no picture in custom token
            email: decoded.email || "N/A",
            email_verified: "N/A",
            provider: "N/A",
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <img
          src={token.picture !== "N/A" ? token.picture : "https://via.placeholder.com/96"}
          alt={token.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
        />
        <h2 className="text-2xl font-semibold text-center">{token.name}</h2>
        <p className="text-center text-gray-600 mt-2">{token.email}</p>
        <p className="text-center mt-2">
          Email Verified:{" "}
          <span className={token.email_verified ? "text-green-500" : "text-red-500"}>
            {token.email_verified ? "Yes" : "No"}
          </span>
        </p>
        <p className="text-center mt-2 text-gray-500">Sign-in Provider: {token.provider}</p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
