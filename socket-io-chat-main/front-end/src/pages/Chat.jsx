import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { UserChat } from "../components/shared/chat/UserChat";
import LogoutButton from "../components/shared/LogoutButton";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);
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
                <Button className="rounded-4xl">
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
