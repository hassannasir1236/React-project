import React from "react";
import UserContext from "./context/Usercontext";

export default function Profile() {
const {user} = React.useContext(UserContext);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <p className="mb-2"><strong>Username:</strong> {user.username}</p>
          <p><strong>Password:</strong> {user.password}</p>
        </div>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
}