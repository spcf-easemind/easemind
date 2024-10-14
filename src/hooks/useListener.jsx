import { useState, useEffect } from "react";

export default function useListener({
  chatRef,
  listenerFn,
  unsubscribeFn,
  getFn,
}) {
  const [data, setData] = useState(getFn());
  useEffect(() => {
    if (chatRef) {
      setData(getFn(chatRef));
      listenerFn(chatRef);
    }

    return () => {
      unsubscribeFn(chatRef);
    };
  }, [chatRef]);

  return data;
}
