import { type FC, memo, useState } from 'react';
import Konva from 'konva';
import { Text, Rect, Circle } from 'react-konva';

import { Child, DrawerType, PrimitiveFigure } from 'figura/models/idrawer';
import { useDrawer } from 'figura/hooks/useDrawer';
import {
  MAX_RECT_SIZE_SELECTED,
  SELECTION_OF_FIGURE_PROPERTIES,
  STROKE_COLOR_HOVER,
  STROKE_WIDTH_HOVER,
} from 'figura/config/constants';

interface FigureProps extends Child {
  id?: string;
}

const Element: Record<Child['type'], PrimitiveFigure> = {
  Rect,
  Circle,
  Text,
};

const Figure: FC<FigureProps> = ({ id, type, props }) => {
  const Figura = Element[type];
  const { state, dispatch } = useDrawer();
  const [hovered, setHovered] = useState(false);
  const { isSelecting, selectedId } = state;
  const selected = selectedId === id;

  const hoverPositionX = props.x - MAX_RECT_SIZE_SELECTED / 2;
  const hoverPositionY = props.y - MAX_RECT_SIZE_SELECTED / 2;
  const xHover = props.x + props.width - MAX_RECT_SIZE_SELECTED / 2;
  const yHover = props.y + props.height - MAX_RECT_SIZE_SELECTED / 2;

  const handleClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    dispatch({ type: DrawerType.FIGURE_SELECTED, payload: id });
    props.onClick?.(event);
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!hovered && !isSelecting) {
      setHovered(true);
    }

    props.onMouseMove?.(event);
  };

  const handleMouseLeave = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (hovered) {
      setHovered(false);
    }

    props.onMouseLeave?.(event);
  };

  return (
    <>
      <Figura
        {...props}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        stroke={hovered || selected ? STROKE_COLOR_HOVER : props.stroke}
        strokeWidth={hovered ? STROKE_WIDTH_HOVER : props.strokeWidth}
      />
      {selected && (
        <>
          <Rect x={hoverPositionX} y={hoverPositionY} {...SELECTION_OF_FIGURE_PROPERTIES} />
          <Rect x={xHover} y={hoverPositionY} {...SELECTION_OF_FIGURE_PROPERTIES} />
          <Rect x={xHover} y={yHover} {...SELECTION_OF_FIGURE_PROPERTIES} />
          <Rect x={hoverPositionX} y={yHover} {...SELECTION_OF_FIGURE_PROPERTIES} />
        </>
      )}
    </>
  );
};

export default memo(Figure);
export type { FigureProps };
