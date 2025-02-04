import { Dispatch, createContext } from 'react';
import Konva from 'konva';

import type { ActionReducerDrawer, DrawerState } from 'figura/models';
import { noop } from 'figura/utils/noop';

type Handler = (event: Konva.KonvaEventObject<MouseEvent>) => void;

export interface HoverSelection {
  initX: number;
  initY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DrawerContextType {
  state: DrawerState;
  isSelecting: boolean;
  hoverSelection: HoverSelection;
  handler: {
    mouseDown: Handler;
    mouseUp: Handler;
  };
  dispatch: Dispatch<ActionReducerDrawer>;
  handleHoverSelection: (options: Partial<HoverSelection>) => void;
}

export const INITIAL_STATE: DrawerState = {
  action: 'selection',
  figures: [],
};

export const DrawerContext = createContext<DrawerContextType>({
  state: INITIAL_STATE,
  isSelecting: false,
  hoverSelection: { initX: 0, initY: 0, x: 0, y: 0, width: 0, height: 0 },
  handler: {
    mouseDown: noop,
    mouseUp: noop,
  },
  dispatch: noop,
  handleHoverSelection: noop,
});
