import { useContext, useEffect } from 'react';

import { ListenerContext } from 'figura/contexts/ListenerProvider';

export const useListener = <T>(callback: T) => {
  const listenerHook = useContext(ListenerContext);

  if (!listenerHook) {
    throw new Error('ListenerProvider are missing! 👾');
  }

  const { listener } = listenerHook;

  useEffect(() => {
    const unsubscribe = listener.subscribe(callback);

    return () => {
      unsubscribe();
    };
  }, [listener, callback]);

  return listenerHook;
};
