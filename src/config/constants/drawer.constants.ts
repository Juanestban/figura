import type { DrawerState, HoverSelection, IPosition } from 'figura/models';

export const INITIALDRAWER_CONTEXT_STATE: DrawerState = {
  action: 'selection',
  figures: [],
  isSelecting: false,
  selectedId: null,
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

export const STROKE_WIDTH_HOVER = 3;

export const STROKE_COLOR_HOVER = '#09f';

export const MAX_RECT_SIZE_SELECTED = 10;

export const SELECTION_OF_FIGURE_PROPERTIES = {
  width: MAX_RECT_SIZE_SELECTED,
  height: MAX_RECT_SIZE_SELECTED,
  fill: '#ddd',
  stroke: STROKE_COLOR_HOVER,
  strokeWidth: 1,
};
