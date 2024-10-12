import { create } from "zustand";
import { database } from "../plugins/firebase.js";
import {
  set as setFirebase,
  ref,
  push,
  serverTimestamp,
} from "firebase/database";

export const useChatStore = create((set) => ({
  chats: [],

  fetchChats: async () => {},
  createChat: async ({ chatName }) => {
    const db = database;

    const instanceRef = ref(db, "chat");
    const newChatRef = push(instanceRef);
    const chatId = newChatRef.key;

    await setFirebase(newChatRef, {
      chatName: chatName,
      createdAt: serverTimestamp(),
      type: "private",
      users: [],
      messages: [],
    })
      .then((response) => {
        console.log("Chat created with ID: ", chatId);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error creating chat: ", error);
        throw new Error("Error creating chat!");
      });
  },
}));
