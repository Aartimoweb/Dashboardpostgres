import React from "react";
import { useUser } from "./UserContext";
import Profile from "./Image";

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
         <Profile 
           first_name={user.first_name} 
           last_name={user.last_name} 
           imageUrl={user.profile} 
         />
       </div>
      ) : (
        <p>No profile image available.</p>
      )}
    </div>
  );
};

export default UserDetails;