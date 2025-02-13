import React from "react";
import { useUser } from "./UserContext";

const UserDetails: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <p>No user details available. Please log in first.</p>;
  }

  return (
    <div>
      <h3>User Details</h3>
      <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Contact:</strong> {user.contact}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      {user.profile ? (
        <div>
          <p><strong>Profile Image:</strong></p>
          <img 
            src={user.profile} 
            alt="User Profile" 
            style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
          />
        </div>
      ) : (
        <p>No profile image available.</p>
      )}
    </div>
  );
};

export default UserDetails;