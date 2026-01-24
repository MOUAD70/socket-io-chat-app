import { useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";
import { AuthContext } from "../../../context/AuthContext";

const PotentialChats = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);

  if (!potentialChats || potentialChats.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex flex-col gap-2">
        {potentialChats.map((u, index) => {
          const avatarLetter = u.name?.charAt(0).toUpperCase() || "U";

          return (
            <div
              key={index}
              className="
                flex items-center justify-between
                px-3 py-2
                rounded-md
                border border-neutral-200 dark:border-white/10
                dark:bg-white/5
                cursor-pointer
                hover:bg-neutral-100 dark:hover:bg-white/10
                transition
              "
              onClick={() => {
                createChat(user._id, u._id);
                onClose?.();
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 w-10 h-10">
                  <div className="w-10 h-10 rounded-full bg-orange-200 dark:bg-white/10 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-white">
                    {avatarLetter}
                  </div>
                </div>

                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                  {u.name?.charAt(0).toUpperCase() + u.name?.slice(1)}
                </span>
              </div>

              <span className="text-xs text-neutral-400 shrink-0">New</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PotentialChats;
