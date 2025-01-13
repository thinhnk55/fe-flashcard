import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// Simple hash function for color generation
const stringToColor = (str: string): string => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-lime-500",
    "bg-orange-500",
  ];
  const colorIndex = str.charCodeAt(0) % colors.length;
  return colors[colorIndex];
};

interface LetterAvatarProps {
  name: string;
  style?: string;
}

const LetterAvatar: React.FC<LetterAvatarProps> = ({
  name,
  style = "w-9 h-9",
}) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const backgroundColor = stringToColor(name);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <div
      className={`flex items-center justify-center text-white font-bold rounded-full ${backgroundColor} ${style} cursor-pointer`}
      onClick={handleClick}
    >
      {firstLetter}
    </div>
  );
};

export default LetterAvatar;
