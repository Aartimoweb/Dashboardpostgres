interface ProfileProps {
  first_name: string;
  last_name: string;
  imageUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ first_name, last_name, imageUrl }) => {
  const renderProfileImage = () => {
      if (imageUrl) {
          return <img src={imageUrl} alt="Profile" width={100} height={100} />;
      } else {
        
          const initials = `${first_name[0]}${last_name[0]}`.toUpperCase();
          return (
              <div
                  style={{
                      width: 100,
                      height: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ccc",
                      borderRadius: "50%",
                  }}
              >
                  <span>{initials}</span>
              </div>
          );
      }
  };

  return <>{renderProfileImage()}</>;
};

export default Profile;
