import { create } from "zustand";
import { database } from "../plugins/firebase.js";
import { useAuthenticationStore } from "./authentication.js";
import { serializer } from "../utils/serializer.js";
import {
  set as setFirebase,
  ref,
  push,
  serverTimestamp,
  get as getFirebase,
  onValue,
  child,
  off,
} from "firebase/database";

export const useChatStore = create((set, get) => ({
  chats: [],
  listeners: {}, // To store active listeners

  // Getters
  getNavChats: () => {
    const allChats = get().chats;
    const loggedInUserId =
      useAuthenticationStore.getState().user.data?.key || null;

    const privateChat = [];
    const groupChat = [];

    allChats.forEach((chat) => {
      const lastMessage = chat.messages
        ? serializer.serializeMessages(chat.messages).slice(-1)[0]
        : null;

      if (chat.type === "private") {
        const displayUser = () => {
          const [userId] = Object.keys(chat.users).filter(
            (item) => item !== loggedInUserId
          );
          return chat.users[userId];
        };

        privateChat.push({
          id: chat.id,
          userName: displayUser().name,
          userImage: displayUser().image,
          text: `${lastMessage.userName}: ${lastMessage.message}`,
          type: chat.type,
          time: lastMessage.time,
          unread: 0,
        });
      } else if (chat.type === "group") {
        groupChat.push({
          id: chat.id,
          userName: chat.chatName,
          userImage: chat.chatImage,
          text: `${lastMessage.userName}: ${lastMessage.message}`,
          type: chat.type,
          time: lastMessage.time,
          unread: 0,
        });
      }
    });

    return { privateChat, groupChat };
  },
  getChatPageData: (chatRef) => {
    const allChats = get().chats;
    const loggedInUserId =
      useAuthenticationStore.getState().user.data.key || null;

    let header = {
      name: "",
      image: null,
      lastSeen: "",
    };
    let chatMessages = [];

    const chat = allChats.find((chat) => chat.id === chatRef);

    if (chat) {
      const messages = chat.messages;
      const chatUsers = chat.users;

      if (chat.type === "private") {
        const displayUser = () => {
          const [userId] = Object.keys(chatUsers).filter(
            (item) => item !== loggedInUserId
          );
          return chat.users[userId];
        };

        header = {
          name: displayUser().name,
          image: displayUser().image,
          lastSeen: "Active now",
        };
      } else if (chat.type === "group") {
        header = {
          name: chat.chatName,
          image: chat.chatImage,
          lastSeen: "Active now",
        };
      }

      if (messages) {
        chatMessages = serializer.serializeMessages(messages);
      }
    }
    return { header, chatMessages };
  },

  // Actions
  fetchChats: async (loggedInUserId) => {
    const db = database;

    // Reference to the 'chats' node
    const chatsRef = ref(db, "chats");

    // Fetch all chats from the 'chats' node
    await getFirebase(chatsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const chats = snapshot.val();
          const serializedData = serializer.serializeChats(
            chats,
            loggedInUserId
          );

          // Set the serialized chats in the Zustand store
          set({ chats: serializedData });
        } else {
          console.log("No chats found.");
          set({ chats: [] });
        }
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  },

  findNewChat: async ({ chatName = "", users }) => {
    const db = database;

    const instanceRef = ref(db, "chats");
    const newChatRef = push(instanceRef);

    await setFirebase(newChatRef, {
      chatName: chatName,
      createdAt: serverTimestamp(),
      type: "private",
      users: users,
      messages: {},
      images: {},
      videos: {},
      links: {},
      documents: {},
    })
      .then((response) => {
        console.log("Chat created with ID: ", newChatRef.key);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error creating chat: ", error);
        throw new Error("Error creating chat!");
      });
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
          const updatedChats = state.chats.map((chat) => {
            if (chat.id === chatRef) {
              return { ...chat, messages: chatMessages };
            }
            return chat;
          });
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

  sendMessage: async (chatRef, { userKey, message, type, name }) => {
    const db = database;
    const allChats = get().chats;
    const chat = allChats.find((chat) => chat.id === chatRef);

    // Get the user's image
    const displayUser = () => {
      const [userId] = Object.keys(chat.users).filter(
        (item) => item === userKey
      );
      return chat.users[userId];
    };

    // Message data
    const messageData = {
      userKey: userKey,
      name: name,
      image: displayUser().image,
      message: message,
      createdAt: serverTimestamp(),
      type: type,
    };

    const messageRef = child(ref(db), `chats/${chatRef}/messages`);
    const newMessageRef = push(messageRef);

    const response = await setFirebase(newMessageRef, messageData)
      .then(() => {
        console.log("Message sent successfully:", newMessageRef.key);
        get().fetchChats(userKey);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        throw new Error("Error sending message!");
      });

    return response;
  },
}));
