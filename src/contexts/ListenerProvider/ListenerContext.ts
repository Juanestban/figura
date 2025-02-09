import { createContext } from 'react';

import { Observable } from 'figura/utils/observable';
import type { ListenerContextTypes } from 'figura/models';

const ListenerContext = createContext<ListenerContextTypes>({ listener: new Observable() });

export { ListenerContext };
