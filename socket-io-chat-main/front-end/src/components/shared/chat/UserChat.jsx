import { useFetchRecipient } from "../../../hooks/useFetchRecipient";

export const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipient(user, chat);

  const avatarLetter = recipientUser?.name?.charAt(0).toUpperCase() || "U";

  const notifications = 2;
  const isOnline = true;

  return (
    <div className="flex items-center justify-between gap-3 relative">
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <div className="relative shrink-0 w-10 h-10">
          <div className="w-10 h-10 rounded-full bg-orange-200 dark:bg-white/10 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-white">
            {avatarLetter}
          </div>

          {isOnline && (
            <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white dark:border-black bg-green-500" />
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
            {recipientUser?.name || "Unknown"}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {chat.lastMessage || "No messages yet"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          12:45 PM
        </span>
        {notifications > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
            {notifications}
          </span>
        )}
      </div>
    </div>
  );
};
