import { useAuthenticationStore } from "../../store/authentication.js";
import { useChatStore } from "../../store/chat.js";

export async function ChatLoader() {
  const loggedUser = useAuthenticationStore.getState().user.data;
  const { fetchChats, getChatPageData } = useChatStore.getState((state) => ({
    fetchChats: state.fetchChats,
    getChatPageData: state.getChatPageData,
  }));

  let resObject = null;

  const response = await fetchChats(loggedUser.key);

  if (response) {
    resObject = {
      message: "Chats fetched successfully",
    };
  }
  return resObject;
}

