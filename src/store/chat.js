import { create } from "zustand";
import { database, storage as firebaseStorage } from "../plugins/firebase.js";
import { useAuthenticationStore } from "./authentication.js";
import { ref, onValue, off } from "firebase/database";

import {
  listChats,
  createNewChat,
  sendMessage,
  uploadImage,
  serializeChatPageData,
  serializeNavData,
  serializeUserData,
  serializeAsideData,
} from "../functions/firebase.js";

export const useChatStore = create((set, get) => ({
  chats: [],
  listeners: {}, // To store active listeners

  // Getters
  getNavChats: () => {
    const allChats = get().chats;
    const loggedInUserId =
      useAuthenticationStore.getState().user.data?.key || null;

    const response = serializeNavData(allChats, loggedInUserId);
    return response;
  },
  getChatPageData: (chatRef) => {
    const allChats = get().chats;
    const loggedInUserId =
      useAuthenticationStore.getState().user.data.key || null;

    const response = serializeChatPageData(allChats, chatRef, loggedInUserId);
    return response;
  },

  getUserData: (chatRef) => {
    const allChats = get().chats;
    const response = serializeUserData(allChats, chatRef);
    return response;
  },

  getAsideData: (chatRef) => {
    const allChats = get().chats;
    const loggedInUserId =
      useAuthenticationStore.getState().user.data?.key || null;

    const response = serializeAsideData(allChats, chatRef, loggedInUserId);
    return response;
  },

  // Actions
  fetchChats: async (loggedInUserId) => {
    const db = database;

    const response = await listChats(db, loggedInUserId)
      .then((response) => {
        set(() => ({ chats: response }));
      })
      .catch(() => {
        set(() => ({ chats: [] }));
      });
    return response;
  },

  findNewChat: async ({ chatName = "", users }) => {
    const db = database;
    const response = await createNewChat(db, { chatName, users });
    return response;
  },

  listenForMessages: (chatRef) => {
    const db = database;
    const messagesRef = ref(db, `chats/${chatRef}/messages`);

    const listener = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const chatMessages = Object.keys(messagesData).map((messageId) => ({
          id: messageId,
          ...messagesData[messageId],
        }));

        // console.log(messagesData);

        // Update Zustand store with new messages
        set((state) => {
          const updatedChats = state.chats.map((chat) => {
            if (chat.id === chatRef) {
              return { ...chat, messages: chatMessages };
            }
            return chat;
          });
          // console.log(updatedChats);
          return { chats: updatedChats };
        });
      }
    });

    // Store listener reference to unsubscribe later
    set((state) => ({
      listeners: { ...state.listeners, [chatRef]: listener },
    }));
  },

  unsubscribeFromChat: (chatRef) => {
    const db = database;
    const messagesRef = ref(db, `chats/${chatRef}/messages`);
    const listener = get().listeners[chatRef];

    if (listener) {
      off(messagesRef); // Unsubscribe from Firebase listener
      set((state) => {
        const newListeners = { ...state.listeners };
        delete newListeners[chatRef];
        return { listeners: newListeners };
      });
    }
  },

  sendMessage: async (chatRef, formData) => {
    const db = database;
    const response = await sendMessage(db, chatRef, formData);
    return response;
  },

  uploadImage: async (chatRef, formData) => {
    const db = database;
    const storage = firebaseStorage;

    const response = await uploadImage(db, storage, chatRef, formData);
    return response;
  },
}));
