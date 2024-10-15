export const serializer = {
  serializeMessages: (messages) => {
    return Object.keys(messages).map((messageId) => {
      const message = messages[messageId];
      const mediaTypes = ["image", "video", "document"];
      // const user = chatUsers[message.userId];

      if (message.type === "text") {
        return {
          id: messageId,
          userId: message.userKey,
          message: message.message,
          time: message.createdAt,
          type: message.type,
        };
      } else if (mediaTypes.includes(message.type)) {
        return {
          id: messageId,
          userId: message.userKey,
          fileURL: [message.fileURL],
          time: message.createdAt,
          type: message.type,
        };
      }
    });
  },
  serializeChats: (chats, loggedInUserId) => {
    // Filter the chats where the logged-in user exists in the users object
    const userChats = Object.keys(chats).filter((chatId) => {
      const chat = chats[chatId];
      // Check if the logged-in user exists in the users object
      return chat.users && chat.users.hasOwnProperty(loggedInUserId);
    });

    // Map filtered chat objects into an array
    const filteredChats = userChats.map((chatId) => ({
      id: chatId,
      ...chats[chatId],
    }));

    return filteredChats;
  },

  serializeChat: (chat) => {
    const chatKey = Object.keys(chat).filter((chatId) => {
      return chat[chatId];
    });

    // Map chat key objects into an array
    const serializedChat = chatKey.reduce((acc, chatId) => {
      acc = {
        id: chatId,
        ...chat[chatId],
      };
      return acc;
    }, {});

    return serializedChat;
  },

  serializeFileTypes: (messages) => {
    return Object.keys(messages).map((messageId) => {
      const message = messages[messageId];
      // const user = chatUsers[message.userId];

      return {
        id: messageId,
        ...message,
      };
    });
  },
};
