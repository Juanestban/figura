import { type PropsWithChildren, useState, useEffect } from 'react';

import { ICommandName } from 'figura/models';
import { COMMANDS } from 'figura/config/constants';
import { Observable } from 'figura/utils/observable';
import { ListenerContext } from './ListenerContext';

const observable = new Observable();

function ListenerProvider({ children }: PropsWithChildren) {
  const [keyPressed, setkeyPressed] = useState<Set<string>>(new Set());

  const listeners = (event: KeyboardEvent) => {
    let newKeyPress = new Set<string>();

    setkeyPressed((prevKeyPress) => {
      newKeyPress = new Set(prevKeyPress).add(event.key);
      return newKeyPress;
    });

    Object.entries(COMMANDS).forEach(([command, keys]) => {
      if (keys.every((key) => newKeyPress.has(key))) {
        event.preventDefault();
        observable.notify(command as ICommandName);
      }
    });
  };

  const cleanner = (event: KeyboardEvent) => {
    setkeyPressed((prev) => {
      const newKeys = new Set(prev);
      newKeys.delete(event.key);

      return newKeys;
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', listeners);
    document.addEventListener('keyup', cleanner);

    return () => {
      document.removeEventListener('keydown', listeners);
      document.removeEventListener('keyup', cleanner);
    };
  }, [keyPressed]);

  return (
    <ListenerContext.Provider value={{ listener: observable }}>{children}</ListenerContext.Provider>
  );
}

export default ListenerProvider;
