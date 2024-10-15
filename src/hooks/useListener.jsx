import { useState, useEffect, useMemo } from "react";

export default function useListener({
  chat,
  chatRef,
  queryFn,
  listenerFn,
  unsubscribeFn,
}) {
  const data = useMemo(() => {
    return chat;
  }, [chat]);

  useEffect(() => {
    // Call the Query
    queryFn(chatRef);

    // Add the listener
    if (chatRef) {
      listenerFn(chatRef);
    }

    return () => {
      unsubscribeFn(chatRef);
    };
  }, [chatRef]);

  return data;
}
