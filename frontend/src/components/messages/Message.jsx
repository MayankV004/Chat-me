import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
 
function Message({message}) {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderID === authUser._id;
  const chatClassName = fromMe ? "chat chat-end" : "chat chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const chatBubbleColor = fromMe ? "bg-blue-500" : "bg-zinc-800";
  const Time = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt="Tailwind CSS chat bubble component"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${chatBubbleColor} ${shakeClass} pb-2`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{Time}</div>
    </div>
  );
}

export default Message;
