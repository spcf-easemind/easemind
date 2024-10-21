import { create } from "zustand";
import { database, storage as firebaseStorage } from "../plugins/firebase.js";
import { useAuthenticationStore } from "./authentication.js";
import { useUsersStore } from "./users.js";
import { ref, onValue, off } from "firebase/database";

import {
  listChats,
  createNewChat,
  createNewGroup,
  sendMessage,
  uploadMedia,
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
  loading: false,

  // Getters
  getNavChats: () => {
    const allChats = get().chats;

    const loggedInUserId =
      useAuthenticationStore.getState().user.data?.key || null;

    const response = serializeNavData(allChats, loggedInUserId);
    return response;
  },
  setChatPageData: (chat, users) => {
    const loggedInUserId =
      useAuthenticationStore.getState().user.data?.key || null;
    const response = serializeChatPageData(chat, loggedInUserId, users);
    return response;
  },

  getUserData: (chatRef) => {
    const allChats = get().chats;
    const response = serializeUserData(allChats, chatRef);
    return response;
  },

  setChattedUsers: (loggedInUser) => {
    const allChats = get().chats;
    const chattedUsers = [loggedInUser.key];

    allChats.forEach((chat) => {
      const chatUsers = Object.keys(chat.users);
      const [userId] = chatUsers.filter((user) => user !== loggedInUser.key);
      chattedUsers.push(userId);
    });

    return chattedUsers;
  },

  setAvailableUsers: (chattedUsers, users) => {
    const availableUsers = users.filter(
      ({ key }) => !chattedUsers.includes(key)
    );

    let randomUser = null;

    if (availableUsers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableUsers.length);
      randomUser = availableUsers[randomIndex];
      console.log(randomUser);
    } else {
      console.log("No available users found.");
    }

    return randomUser;
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

  findNewChatCompanion: async (loggedInUser, value) => {
    set(() => ({ loading: true }));
    const db = database;
    const fetchUsersFn = useUsersStore.getState().getAllUsers;

    // Fetch the list of users that logged in user has chatted with
    const chattedUsers = get().setChattedUsers(loggedInUser);

    // Fetch all users from juno database
    const users = await fetchUsersFn();
    const usersResponse = useUsersStore.getState().data;

    // Get a random user that logged in user has not chatted with
    const randomUser = get().setAvailableUsers(chattedUsers, usersResponse);

    // Create a new users object with the random user
    const usersData = {
      [randomUser.key]: {
        name: randomUser.data.fullName,
        image: randomUser.data?.profileImageUrl || null,
      },
      [loggedInUser.key]: {
        name: loggedInUser.fullName,
        image: loggedInUser?.profileImageUrl || null,
      },
    };

    // Initialize a new chat with the random user
    const response = await createNewChat(db, { users: usersData });

    set(() => ({ loading: false }));
    return response;
  },

  createGroupChat: async (groupKey, formData) => {
    const db = database;
    await createNewGroup(db, groupKey, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  listenForChats: (loggedInUserId) => {
    const db = database;
    const chatsRef = ref(db, "chats");

    const listener = onValue(chatsRef, async (snapshot) => {
      const chatsData = snapshot.val();
      console.log(chatsData);
      // if (chatsData) {
      //   const chats = Object.keys(chatsData).map((chatId) => ({
      //     id: chatId,
      //     ...chatsData[chatId],
      //   }));

      //   set(() => ({ chats: chats }));
      // }
    });
    set((state) => ({
      listeners: { ...state.listeners, [loggedInUserId]: listener },
    }));
  },

  listenForMessages: (chatRef) => {
    const db = database;
    const messagesRef = ref(db, `chats/${chatRef}/messages`);

    const listener = onValue(messagesRef, async (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const chatMessages = Object.keys(messagesData).map((messageId) => ({
          id: messageId,
          ...messagesData[messageId],
        }));

        const asideResponse = await get().queryAsideData(
          chatRef,
          get().chat.header.type
        );

        // Update Zustand store with new messages
        set((state) => {
          return {
            chat: {
              ...state.chat,
              chatMessages: serializer.serializeMessages(chatMessages),
              asideDataPage: {
                ...state.chat.asideDataPage,
                ...asideResponse,
              },
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

    const response = await uploadMedia(db, storage, chatRef, formData).then(
      (response) => {
        console.log(response);
      }
    );
    return response;
  },

  // Query
  queryChatData: async (chatRef) => {
    const db = database;
    const fetchUsersFn = useUsersStore.getState().getAllUsers;
    if (chatRef) {
      const response = await queryChatData(db, chatRef);
      const users = await fetchUsersFn();
      const userResponse = useUsersStore.getState().data;
      const serializedData = get().setChatPageData(response, userResponse);
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

    const queries = await chatTypes[type].reduce(
      async (accPromise, chatType) => {
        const acc = await accPromise;
        acc[`${chatType}s`] = await queryMessagesByType(db, chatRef, chatType);
        return acc;
      },
      Promise.resolve({})
    );

    return queries;
  },
}));
