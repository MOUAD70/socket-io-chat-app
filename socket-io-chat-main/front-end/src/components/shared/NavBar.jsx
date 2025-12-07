"use client";
import { useContext } from "react";
import { FloatingNav } from "../ui/aceternity/floating-navbar";
import {
  IconHome,
  IconLogout,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { user, handleLogout, loading } = useContext(AuthContext);

  if (loading) return null;

  if (user) {
    return (
      <div className="fixed top-15 right-60 z-50">
        <button
          onClick={handleLogout}
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/20 text-black dark:text-white hover:bg-neutral-200 active:hover:bg-neutral-300 bg-white px-4 py-2 rounded-full cursor-pointer flex items-center justify-center space-x-1 transition-colors duration-150"
        >
          <IconLogout className="h-4 w-4 text-black dark:text-white" />
          <span>Log out</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-amber-600 to-transparent h-px" />
        </button>
      </div>
    );
  }
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default NavBar;
