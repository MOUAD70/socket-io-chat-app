import { createContext, useState, useEffect, useCallback } from "react";
import { getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  console.log(messages);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`http://localhost:5000/api/users`);

      if (response.error) {
        return console.log("Error fetching users: ", response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };
    if (user && userChats) {
      getUsers();
    }
  }, [userChats, user]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(
          `http://localhost:5000/api/chats/${user._id}`,
        );

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `http://localhost:5000/api/messages/${currentChat?._id}`,
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `http://localhost:5000/api/chats/`,
      JSON.stringify({
        firstId,
        secondId,
      }),
    );

    if (response.error) {
      return console.log("Error creating user chat: ", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
