import { Dispatch, createContext } from 'react';
import Konva from 'konva';

import type { ActionReducerDrawer, DrawerState } from 'figura/models';
import { noop } from 'figura/utils/noop';

type Handler = (event: Konva.KonvaEventObject<MouseEvent>) => void;

interface DrawerContextType {
  state: DrawerState;
  handler: {
    mouseDown: Handler;
    mouseUp: Handler;
  };
  dispatch: Dispatch<ActionReducerDrawer>;
}

export const INITIAL_STATE: DrawerState = {
  action: 'selection',
  figures: [],
};

export const DrawerContext = createContext<DrawerContextType>({
  state: INITIAL_STATE,
  handler: {
    mouseDown: noop,
    mouseUp: noop,
  },
  dispatch: noop,
});
