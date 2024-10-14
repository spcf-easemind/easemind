import {
  get as getFirebase,
  set as setFirebase,
  ref,
  push,
  serverTimestamp,
  child,
} from "firebase/database";



import { serializer } from "../utils/serializer";

export async function listChats(db, loggedInUserId) {
  // Reference to the 'chats' node
  const chatsRef = ref(db, "chats");

  // Fetch all chats from the 'chats' node
  const response = await getFirebase(chatsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const chats = snapshot.val();
        const serializedData = serializer.serializeChats(chats, loggedInUserId);

        return serializedData;
      } else {
        console.log("No chats found.");
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching chats:", error);
      return [];
    });
  return response;
}

export async function createNewChat(db, { chatName = "", users }) {
  const chatRef = ref(db, "chats");
  const newChatRef = push(chatRef);

  const chatData = {
    chatName: chatName,
    createdAt: serverTimestamp(),
    type: "private",
    users: users,
  };

  const response = await setFirebase(newChatRef, chatData)
    .then(() => {
      return {
        status: 201,
        message: "Chat created successfully!",
        data: { ...chatData, id: newChatRef.key },
      };
    })
    .catch((error) => {
      console.error("Error creating chat: ", error);
      throw new Error("Error creating chat!");
    });

  return response;
}

export async function sendMessage(
  db,
  chatRef,
  { userKey, message, type, name }
) {
  // // Boilerplate
  // const allChats = get().chats;
  // const chat = allChats.find((chat) => chat.id === chatRef);
  // // Get the user's image
  // const displayUser = () => {
  //   const [userId] = Object.keys(chat.users).filter(
  //     (item) => item === userKey
  //   );
  //   return chat.users[userId];
  // };

  // Message data
  const messageData = {
    userKey: userKey,
    name: name,
    // image: displayUser().image,
    message: message,
    createdAt: serverTimestamp(),
    type: type,
  };

  const messageRef = child(ref(db), `chats/${chatRef}/messages`);
  const newMessageRef = push(messageRef);

  const response = await setFirebase(newMessageRef, messageData)
    .then(() => {
      return {
        status: 201,
        message: "Message sent successfully!",
        data: messageData,
      };
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      throw new Error("Error sending message!");
    });

  return response;
}

export function serializeChatPageData(allChats, chatRef, loggedInUserId) {
  let header = {
    name: "",
    image: null,
    lastSeen: "",
  };
  let chatMessages = [];

  const chat = allChats.find((chat) => chat.id === chatRef) ?? null;

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
}

export function serializeNavData(allChats, loggedInUserId) {
  const privateChat = [];
  const groupChat = [];

  allChats.forEach((chat) => {
    const lastMessage = chat.messages
      ? serializer.serializeMessages(chat.messages).slice(-1)[0]
      : null;

    const isLastMessageResponse = lastMessage
      ? `${lastMessage.userName}: ${lastMessage.message}`
      : "Message now!";

    const isLastMessageTime = lastMessage ? lastMessage.time : chat.createdAt;

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
        text: isLastMessageResponse,
        type: chat.type,
        time: isLastMessageTime,
        unread: 0,
      });
    } else if (chat.type === "group") {
      groupChat.push({
        id: chat.id,
        userName: chat.chatName,
        userImage: chat.chatImage,
        text: isLastMessageResponse,
        type: chat.type,
        time: isLastMessageTime,
        unread: 0,
      });
    }
  });

  return { privateChat, groupChat };
}
