import { Dispatch } from 'react';
import Konva from 'konva';
import { type KonvaNodeComponent } from 'react-konva';

export enum DrawerType {
  NEW_FIGURE,
  CHANGE_DRAW_ACTION,
  HOVER_SELECTION,
  FIGURE_SELECTED,
}

export type PrimitiveFigure =
  | KonvaNodeComponent<Konva.Rect, Konva.RectConfig>
  | KonvaNodeComponent<Konva.Circle, Konva.CircleConfig>
  | KonvaNodeComponent<Konva.Text, Konva.TextConfig>;

export type DrawAction = 'file' | 'selection' | 'frame' | 'hand-move' | 'typography';

export interface Child {
  type: 'Rect' | 'Circle' | 'Text';
  props: any;
}

export interface Figure extends Child {
  id: string;
  name: string;
}

export interface DrawerState {
  action: DrawAction;
  figures: Figure[];
  isSelecting: boolean;
  selectedId: string | null;
}

type Handler = (event: Konva.KonvaEventObject<MouseEvent>) => void;

export interface HoverSelection {
  initX: number;
  initY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DrawerContextType {
  state: DrawerState;
  hoverSelection: HoverSelection;
  handler: {
    mouseDown: Handler;
    mouseUp: Handler;
  };
  dispatch: Dispatch<ActionReducerDrawer>;
  handleHoverSelection: (options: Partial<HoverSelection>) => void;
}

export type ActionReducerDrawer = {
  type: DrawerType;
  payload: any;
};

export type IPosition = {
  x: number | null;
  y: number | null;
};
