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
  queryMessagesByType,
  queryChatData,
} from "../functions/firebase.js";

import { serializer } from "../utils/serializer.js";

export const useChatStore = create((set, get) => ({
  chats: [],
  listeners: {}, // To store active listeners
  chat: {
    header: {
      name: "",
      image: null,
      lastSeen: "",
      type: "",
    },
    chatMessages: [],
    asideDataPage: {
      users: [],
      images: [],
      documents: [],
      videos: [],
      links: [],
    },
  },

  // Getters
  getNavChats: () => {
    const allChats = get().chats;

    const loggedInUserId =
      useAuthenticationStore.getState().user.data?.key || null;

    const response = serializeNavData(allChats, loggedInUserId);
    return response;
  },
  setChatPageData: (chat) => {
    const loggedInUserId =
      useAuthenticationStore.getState().user.data?.key || null;
    const response = serializeChatPageData(chat, loggedInUserId);
    console.log("TEST", response);
    return response;
  },

  getUserData: (chatRef) => {
    const allChats = get().chats;
    const response = serializeUserData(allChats, chatRef);
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

        // Update Zustand store with new messages
        set((state) => {
          return {
            chat: {
              ...state.chat,
              chatMessages: serializer.serializeMessages(chatMessages),
            },
          };
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

    const response = await uploadImage(db, storage, chatRef, formData).then(
      (response) => {
        console.log(response);
      }
    );
    return response;
  },

  // Query
  queryChatData: async (chatRef) => {
    const db = database;
    if (chatRef) {
      const response = await queryChatData(db, chatRef);
      const serializedData = get().setChatPageData(response);

      const asideResponse = await get().queryAsideData(
        chatRef,
        serializedData.header.type
      );

      set((state) => ({
        chat: {
          ...state.chat,
          ...serializedData,
          asideDataPage: {
            ...state.chat.asideDataPage,
            ...asideResponse,
          },
        },
      }));
    } else {
      set(() => ({
        chat: {
          header: {
            name: "",
            image: null,
            lastSeen: "",
            type: "",
          },
          chatMessages: [],
          asideDataPage: {
            users: [],
            images: [],
            documents: [],
            videos: [],
            links: [],
          },
        },
      }));
    }
  },
  queryAsideData: async (chatRef, type) => {
    const db = database;
    const chatTypes = {
      private: ["image", "video", "link", "document"],
      group: ["users", "image", "video", "link", "document"],
    };

    const queries = await chatTypes[type].reduce(async (acc, chatType) => {
      acc[`${chatType}s`] = await queryMessagesByType(db, chatRef, chatType);
      return acc;
    }, {});
    return queries;
  },
}));
