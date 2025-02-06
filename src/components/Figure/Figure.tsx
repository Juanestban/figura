import { type FC, memo } from 'react';
import { Text, Rect, Circle } from 'react-konva';

import type { Child, PrimitiveFigure } from 'figura/models/idrawer';

interface FigureProps extends Child {}

const Element: Record<Child['type'], PrimitiveFigure> = {
  Rect,
  Circle,
  Text,
};

const Figure: FC<FigureProps> = ({ type, props }) => {
  const Figura = Element[type];

  return <Figura {...props} />;
};

export default memo(Figure);
export type { FigureProps };
