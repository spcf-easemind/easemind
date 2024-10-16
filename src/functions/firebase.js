import {
  get as getFirebase,
  set as setFirebase,
  ref as databaseRef,
  push,
  serverTimestamp,
  child,
  query,
  equalTo,
  orderByChild,
  orderByKey,
} from "firebase/database";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { serializer } from "../utils/serializer";
import { format } from "date-fns";
import { generators } from "../utils/generators";

export async function listChats(db, loggedInUserId) {
  // Reference to the 'chats' node
  const chatsRef = databaseRef(db, "chats");

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
  const chatRef = databaseRef(db, "chats");
  const newChatRef = push(chatRef);

  const chatData = {
    chatName: chatName,
    createdAt: serverTimestamp(),
    type: "private",
    users: users,
    id: newChatRef.key,
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

export async function sendMessage(db, chatRef, { userKey, message, type }) {
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
    // name: name,
    // image: displayUser().image,
    message: message,
    createdAt: serverTimestamp(),
    type: type,
  };

  const messageRef = child(databaseRef(db), `chats/${chatRef}/messages`);
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

export function serializeChatPageData(chat, loggedInUserId, users) {
  let header = {};
  let chatMessages = [];

  const data = serializer.serializeChat(chat);
  const usersData = users;

  if (data) {
    const messages = data.messages;
    const chatUsers = data.users;

    if (data.type === "private") {
      const displayUser = () => {
        const [userId] = Object.keys(chatUsers).filter(
          (item) => item !== loggedInUserId
        );
        const targetUser = usersData.find((user) => user.key === userId);
        const formattedStatus =
          targetUser.data.status === "online"
            ? "Active now"
            : `Last seen ${format(targetUser.data.lastUpdated, "p")}`;
        const { name, image } = data.users[userId];
        return { name, image, lastSeen: formattedStatus };
      };

      header = {
        name: displayUser().name,
        image: displayUser().image,
        lastSeen: displayUser().lastSeen,
        type: data.type,
      };
    } else if (data.type === "group") {
      header = {
        name: data.chatName,
        image: data.chatImage,
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
    const mediaTypes = ["image", "document", "video"];
    const lastMessage = chat.messages
      ? serializer.serializeMessages(chat.messages).slice(-1)[0]
      : null;

    if (chat.type === "private") {
      const chatUsers = chat.users;
      const displayUsers = () => {
        const users = Object.keys(chatUsers);

        const loggedIn = users.filter((item) => item === loggedInUserId);
        const targetUser = users.filter((item) => item !== loggedInUserId);

        return {
          users: users,
          loggedIn: chatUsers[loggedIn],
          targetUser: chatUsers[targetUser],
        };
      };

      const isLastMessageResponse = () => {
        const whichUser = lastMessage
          ? displayUsers().users.filter((item) => item === lastMessage.userId)
          : null;

        const lastMessageUser = chatUsers[whichUser];

        if (mediaTypes.includes(lastMessage?.type)) {
          return `${lastMessageUser.name}: ${lastMessage.type}`;
        } else {
          return lastMessage
            ? `${lastMessageUser.name}: ${lastMessage.message}`
            : "Message now!";
        }
      };

      const isLastMessageTime = lastMessage ? lastMessage.time : chat.createdAt;

      privateChat.push({
        id: chat.id,
        userName: displayUsers().targetUser.name,
        userImage: displayUsers().targetUser.image,
        text: isLastMessageResponse(),
        type: chat.type,
        time: isLastMessageTime,
        unread: 0,
      });
    } else if (chat.type === "group") {
      groupChat.push({
        id: chat.id,
        userName: chat.chatName,
        userImage: chat.chatImage,
        text: isLastMessageResponse(),
        type: chat.type,
        time: isLastMessageTime,
        unread: 0,
      });
    }
  });

  return { privateChat, groupChat };
}

export function serializeUserData(allChats, chatRef) {
  const chat = allChats.find((chat) => chat.id === chatRef) ?? null;

  if (chat) {
    const chatUsers = chat.users;
    return chatUsers;
  }
  return [];
}

export function serializeAsideData(allChats, chatRef, loggedInUserId) {
  const chat = allChats.find((chat) => chat.id === chatRef) ?? null;
  let asideData = {
    type: "",
    header: {
      name: "",
      image: null,
    },
    members: [],
    images: [],
    videos: [],
    links: [],
    documents: [],
  };
  if (chat) {
    const chatUsers = chat.users;
    const [userId] = Object.keys(chatUsers).filter(
      (item) => item !== loggedInUserId
    );
    const displayUser = chatUsers[userId];

    asideData.type = chat.type;
    asideData.header = displayUser;

    return asideData;
  }
  return asideData;
}

// Media Storing

export async function uploadMedia(
  db,
  storage,
  chatRef,
  { file, userKey, type }
) {
  let messageData = {};
  const fileRef = storageRef(storage, `chats/${chatRef}/${file.name}`);

  if (type === "video") {
    const thumbnailUrl = await generators.generateThumbnail(file);
    const thumbnailRef = storageRef(
      storage,
      `thumbnails/thumbnails/${chatRef}/${file.name}_thumb.jpg`
    );

    // Convert Data URL to a Blob for upload
    const thumbnailBlob = await fetch(thumbnailUrl).then((res) => res.blob());

    // Upload thumbnail to Firebase Storage
    const snapshot = await uploadBytes(thumbnailRef, thumbnailBlob);
    const thumbnailURL = await getDownloadURL(snapshot.ref);

    messageData.thumbnailURL = thumbnailURL;
  }

  // Upload file to Firebase Storage
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  // Save metadata to Firebase Realtime Database
  const messageRef = child(databaseRef(db), `chats/${chatRef}/messages`);
  const newMessageRef = push(messageRef);

  messageData = {
    ...messageData,
    userKey: userKey,
    fileURL: downloadURL,
    fileName: file.name,
    type: type, // 'image', 'video', 'file', etc.
    createdAt: serverTimestamp(),
  };

  console.log(messageData)

  const response = await setFirebase(newMessageRef, messageData)
    .then(() => {
      return {
        status: 201,
        message: `${type} uploaded successfully!`,
        data: messageData,
      };
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      throw new Error(`Error uploading: ${messageType}!`);
    });
  return response;
}

// Queries
export async function queryChatData(db, chatRef) {
  const chatRefPath = databaseRef(db, `chats`);

  const chatQuery = query(chatRefPath, orderByKey(), equalTo(chatRef));

  const response = await getFirebase(chatQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // console.log("Chat data:", data);
        return data;
      } else {
        // console.log("Chat not found");
        return null;
      }
    })
    .catch((error) => {
      console.log("Error querying messages by chatRef", error);
      return null;
    });
  return response;
}
export async function queryMessagesByType(db, chatRef, type) {
  const messagesRef = databaseRef(db, `chats/${chatRef}/messages`); // Path to the messages under a specific chat
  const typeQuery = query(messagesRef, orderByChild("type"), equalTo(type)); // Querying messages where type == "image" (or other types)

  const response = await getFirebase(typeQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Returns only messages where type equals the value you are querying for
        const data = snapshot.val();
        // console.log(`Messages of type ${type}:`, data);
        return serializer.serializeFileTypes(data);
      } else {
        // console.log(`No messages of type ${type}`);
        return [];
      }
    })
    .catch((error) => {
      console.log("Error querying messages by type", error);
      return null;
    });

  return response;
}
