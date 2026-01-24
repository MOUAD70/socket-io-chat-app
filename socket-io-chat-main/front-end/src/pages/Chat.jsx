import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { UserChat } from "../components/shared/chat/UserChat";
import LogoutButton from "../components/shared/LogoutButton";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import PotentialChats from "../components/shared/chat/PotentialChats";
import { IconMessageCirclePlus } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);
  const [showPotentialChats, setShowPotentialChats] = useState(false);

  const [currentChat, setCurrentChat] = useState(null);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10">
      <div className="relative flex flex-col md:flex-row gap-4 h-[75vh]">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-20">
          <div className="rounded-full flex items-center justify-center">
            {<LogoutButton />}
          </div>
        </div>

        <div className="w-full md:w-[30%] rounded-md border border-neutral-200 dark:border-white/20 bg-white dark:bg-black flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-white/20">
            <h2 className="text-sm font-semibold text-center">
              {user.name.toUpperCase()}'s Chats
            </h2>
          </div>
          <div className="overflow-y-auto">
            <div
              onClick={() => setShowPotentialChats(true)}
              className="flex items-center justify-between text-sm px-4 py-3 border-b cursor-pointer text-white font-bold bg-amber-600 hover:bg-amber-700 transition"
            >
              <span>Start a new chat</span>
              <IconMessageCirclePlus className="mx-2" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {userChats?.map((chat, i) => (
              <div
                key={i}
                onClick={() => setCurrentChat(chat)}
                className="text-sm px-4 py-3 border-b cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/5 transition"
              >
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[70%] rounded-md border border-neutral-200 dark:border-white/20 bg-white dark:bg-black flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-white/20">
            <h2 className="text-sm font-semibold text-center">
              {currentChat ? "Conversation" : "Select a chat"}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Messages will be rendered here later */}
          </div>

          {currentChat && (
            <div className="p-4 border-t border-neutral-200 dark:border-white/20">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="bg-white border-gray-300 text-gray-900 rounded-4xl pl-4 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 hover:border-amber-600 transition-colors"
                />
                <Button className="rounded-4xl">Send</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showPotentialChats && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowPotentialChats(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-md mx-4 rounded-md bg-white dark:bg-black border border-neutral-200 dark:border-white/20 shadow-lg"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-white/20">
                <h3 className="text-sm font-semibold">Start a new chat</h3>
                <button
                  onClick={() => setShowPotentialChats(false)}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <PotentialChats onClose={() => setShowPotentialChats(false)}/>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
