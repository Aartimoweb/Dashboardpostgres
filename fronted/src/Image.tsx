import React, { useState, useEffect } from "react";

interface ProfileProps {
  first_name: string;
  last_name: string;
  imageUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ first_name, last_name, imageUrl }) => {
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    if (imageUrl.includes("/fallback/")) {
      setIsValidImage(false);
      console.log(isValidImage)
    }
  }, [imageUrl]);

  const handleError = () => {
    setIsValidImage(false);
  };

  const initials = `${first_name[0]?.toUpperCase() || ""}${last_name[0]?.toUpperCase() || ""}`;

  return (
    <>
      {isValidImage ? (
        <img 
          src={imageUrl} 
          alt="Profile" 
          width={100} 
          height={100} 
          onError={handleError} 
        />
      ) : (
        <div
          style={{
            width: 100,
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ccc",
            borderRadius: "50%",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {initials}
        </div>
      )}
    </>
  );
};

export default Profile;
