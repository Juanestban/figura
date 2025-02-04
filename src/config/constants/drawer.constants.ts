import type { DrawerState, HoverSelection, IPosition } from 'figura/models';

export const INITIALDRAWER_CONTEXT_STATE: DrawerState = {
  action: 'selection',
  figures: [],
};

export const INITIAL_POSITIONS: IPosition = {
  x: null,
  y: null,
};

export const DEFAULT_HOVER_SELECTION: HoverSelection = {
  x: 0,
  initX: 0,
  y: 0,
  initY: 0,
  width: 0,
  height: 0,
};
