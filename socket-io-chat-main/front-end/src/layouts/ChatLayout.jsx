import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar";
import { BackgroundRippleEffect } from "../components/ui/aceternity/background-ripple-effect";

const ChatLayout = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BackgroundRippleEffect className="fixed inset-0 -z-10" />

      <div className="relative z-10">
        <NavBar />
        <div className="mx-auto mt-15 w-full max-w-4xl relative rounded-2xl border border-neutral-200 dark:border-white/20 bg-white dark:bg-black overflow-hidden mb-5 min-h-[calc(100dvh-6rem)] md:min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
