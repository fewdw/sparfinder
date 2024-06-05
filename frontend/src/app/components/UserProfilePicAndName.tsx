import React from "react";

// Define the types for the props
interface UserProfilePicAndNameProps {
  name: string; // User's name
  bio: string; // User's bio
  imageSrc?: string; // Base64 string or URL for the profile picture, made optional
}

const UserProfilePicAndName: React.FC<UserProfilePicAndNameProps> = ({
  name,
  bio,
  imageSrc,
}) => {
  // Helper function to ensure the image src is correctly formatted
  const formatImageSrc = (src: string | undefined) => {
    if (src && src.startsWith("data:")) {
      return src;
    } else if (src) {
      return `data:image/jpeg;base64,${src}`;
    }
    return ""; // Return an empty string if src is not provided
  };

  return (
    <div>
      <div className="flex items-end gap-4">
        {imageSrc ? (
          <img
            src={formatImageSrc(imageSrc)} // Use the helper function to format the image source
            alt="User Profile"
            className="size-20 rounded-lg object-cover"
          />
        ) : (
          <div className="size-20 rounded-lg object-cover bg-gray-300" />
          // Provide a placeholder if no image is available
        )}

        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {name} {/* Display the user's name */}
          </h3>

          <p className="mt-0.5 text-gray-700">
            {bio} {/* Display the user's bio */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePicAndName;
