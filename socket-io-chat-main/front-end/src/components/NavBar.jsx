"use client";
import { Outlet } from "react-router-dom";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

const NavBar = () => {
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
      <DummyContent />
    </div>
  );
};
const DummyContent = () => {
  return (
    <div className="mx-auto mt-30 grid grid-cols-1 h-120 w-4xl dark:bg-black relative dark:border-white/20 border border-neutral-200 bg-white rounded-2xl">
      <Outlet />
    </div>
  );
};

export default NavBar;
