import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { UserChat } from "../components/shared/chat/UserChat";
import LogoutButton from "../components/shared/LogoutButton";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import PotentialChats from "../components/shared/chat/PotentialChats";
import { IconMessageCirclePlus, IconArrowLeft } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBox from "../components/shared/chat/ChatBox";
import EmojiPicker from "emoji-picker-react";
import { Send } from "lucide-react";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, updateCurrentChat, currentChat, sendTextMessage } =
    useContext(ChatContext);
  const [showPotentialChats, setShowPotentialChats] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  const goBackToList = () => updateCurrentChat(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!pickerRef.current) return;
      if (!pickerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const addEmoji = (emojiData) => {
    setTextMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10">
      <div className="relative flex flex-col md:flex-row gap-4 md:h-[75vh]">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-20">
          <div className="rounded-full flex items-center justify-center">
            <LogoutButton />
          </div>
        </div>

        <div
          className={`
            w-full md:w-[30%]
            rounded-md border border-neutral-200 dark:border-white/20
            bg-white dark:bg-black
            flex flex-col overflow-hidden
            ${currentChat ? "hidden md:flex" : "flex"}
          `}
        >
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-white/20">
            <h2 className="text-sm font-semibold text-center">
              {user.name.toUpperCase()}'s Chats
            </h2>
          </div>

          <div
            onClick={() => setShowPotentialChats(true)}
            className="flex items-center justify-between text-sm px-4 py-3 border-b cursor-pointer text-white font-bold bg-amber-600 hover:bg-amber-700 transition"
          >
            <span>Start a new chat</span>
            <IconMessageCirclePlus className="mx-2" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            {userChats?.map((chat) => (
              <div
                key={chat._id}
                onClick={() => updateCurrentChat(chat)}
                className="text-sm px-4 py-3 border-b cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/5 transition"
              >
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`
            w-full md:w-[70%] h-full
            rounded-md border border-neutral-200 dark:border-white/20
            bg-white dark:bg-black
            flex flex-col overflow-hidden
            ${currentChat ? "flex" : "hidden md:flex"}
          `}
        >
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-white/20 flex items-center gap-2">
            <button
              onClick={goBackToList}
              className="md:hidden text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer transition -ml-2"
              aria-label="Back"
            >
              <IconArrowLeft size={"20px"} />
            </button>

            <h2 className="text-sm font-semibold flex-1 text-center md:text-center">
              {currentChat ? "Conversation" : "Select a chat"}
            </h2>

            <div className="w-10 md:hidden" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
            <ChatBox />
          </div>

          {currentChat && (
            <div className="p-4 border-t border-neutral-200 dark:border-white/20">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="bg-white border-gray-300 text-gray-900 rounded-4xl pl-4 focus:border-amber-600 focus:ring-1 focus:ring-amber-200 hover:border-amber-600 transition-colors"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                />

                <div className="relative" ref={pickerRef}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-4xl cursor-pointer"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Emoji"
                  >
                    😀
                  </Button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        className="absolute bottom-12 right-0 z-50"
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        <EmojiPicker
                          width={250}
                          height={300}
                          searchDisabled
                          onEmojiClick={(emojiData) => addEmoji(emojiData)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  className="rounded-4xl"
                  type="submit"
                  onClick={() =>
                    sendTextMessage(
                      textMessage,
                      user,
                      currentChat._id,
                      setTextMessage,
                    )
                  }
                >
                  Send <Send />
                </Button>
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
                <PotentialChats onClose={() => setShowPotentialChats(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
