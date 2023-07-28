import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

import { scrollToBottom } from "../helpers/scrollToBottom";

export const SidebarChatItem = ({ chat }) => {
  const { dispatch, chatState } = useContext(ChatContext);
  const onClikc = async () => {
    dispatch({
      type: types.activarChat,
      payload: chat.uid,
    });

    //cargar los mensajes del chat
    const resp = await fetchConToken(`mensajes/${chat.uid}`);

    dispatch({
      type: types.cargarMensaje,
      payload: resp.mensajes,
    });
    setTimeout(() => {
      scrollToBottom("mensajes");
    }, 0);
  };

  return (
    <div
      className={`chat_list ${
        chatState.chatActivo === chat.uid ? "active_chat" : null
      }`}
      onClick={onClikc}
    >
      {/* active_chat */}
      <div className={`chat_people`}>
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{chat.nombre}</h5>
          {chat.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
