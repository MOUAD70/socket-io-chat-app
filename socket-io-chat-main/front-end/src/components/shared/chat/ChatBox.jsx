import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { useFetchRecipient } from "../../../hooks/useFetchRecipient";
import { formatTime } from "../../../utils/formatTime";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipient(user, currentChat);

  if (!currentChat) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
        No conversation selected yet...
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
        Loading chats...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="pb-3 mb-3 border-b border-neutral-200 dark:border-white/10">
        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
          {recipientUser?.name
            ? recipientUser.name.charAt(0).toUpperCase() + recipientUser.name.slice(1)
            : "Conversation"}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Messages
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages?.length ? (
          messages.map((message) => {
            const isMine = message.senderId === user?._id;

            return (
              <div
                key={message._id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-2
                    text-sm leading-relaxed
                    ${isMine
                      ? "bg-amber-600 text-white"
                      : "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white"}
                  `}
                >
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>

                  <p
                    className={`
                      mt-1 text-[11px]
                      ${isMine ? "text-white/80" : "text-neutral-500 dark:text-neutral-400"}
                      text-right
                    `}
                  >
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
