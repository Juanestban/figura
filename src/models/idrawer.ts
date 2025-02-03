import Konva from 'konva';
import { type KonvaNodeComponent } from 'react-konva';

export enum DrawerType {
  NEW_FIGURE,
  CHANGE_DRAW_ACTION,
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
}

export type ActionReducerDrawer = {
  type: DrawerType;
  payload: any;
};
