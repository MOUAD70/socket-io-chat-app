import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);

  console.log("USER CHATS: ", userChats);
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10">
      Chat Page!
    </div>
  );
};

export default Chat;
