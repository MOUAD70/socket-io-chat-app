import { createContext, useState, useEffect } from "react";
import { getRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`http://localhost:5000/api/users`);

      if (response.error) {
        return setUsersError(response);
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
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        usersError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
