"use client";
import { useContext } from "react";
import { IconLogout } from "@tabler/icons-react";
import { AuthContext } from "../../context/AuthContext";

const LogoutButton = ({ className = "" }) => {
  const { handleLogout, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <button
      onClick={handleLogout}
      className={`border text-sm font-medium relative
        border-neutral-200 dark:border-white/20
        text-black dark:text-white
        hover:bg-neutral-200 active:hover:bg-neutral-300
        bg-white px-4 py-2 rounded-full
        cursor-pointer flex items-center justify-center space-x-1
        transition-colors duration-150
        ${className}`}
    >
      <IconLogout className="h-4 w-4" />
      <span>Log out</span>
      <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-amber-600 to-transparent h-px" />
    </button>
  );
};

export default LogoutButton;
