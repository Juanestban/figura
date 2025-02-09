import { useContext, useEffect } from 'react';

import { ListenerContext } from 'figura/contexts/ListenerProvider';
import { ICommandName } from 'figura/models';

export const useListener = (callback: (command: ICommandName) => void) => {
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
