"use client";
import { useContext } from "react";
import { FloatingNav } from "../ui/aceternity/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { AuthContext } from "../../context/AuthContext";


const NavBar = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (user) {
    return <div />;
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
