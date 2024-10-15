import { useState, useEffect, useMemo } from "react";

export default function useListener({
  chats,
  chatRef,
  listenerFn,
  unsubscribeFn,
  getFn,
}) {
  const data = useMemo(() => {
    const ref = chatRef ?? null;
    return getFn(ref);
  }, [chatRef, chats]);

  useEffect(() => {
    if (chatRef) {
      listenerFn(chatRef);
    }

    return () => {
      unsubscribeFn(chatRef);
    };
  }, [chatRef]);

  return data;
}
