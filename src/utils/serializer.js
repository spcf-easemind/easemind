export const serializer = {
  serializeMessages: (messages) => {
    return Object.keys(messages).map((messageId) => {
      const message = messages[messageId];
      // const user = chatUsers[message.userId];
      return {
        id: messageId,
        userId: message.userKey,
        userImage: message.image,
        userName: message.name,
        message: message.message,
        time: message.createdAt,
        type: message.type,
      };
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
};
