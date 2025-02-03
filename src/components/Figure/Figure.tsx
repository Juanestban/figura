import { FC } from 'react';
import { Text, Rect, Circle } from 'react-konva';

import { Child, PrimitiveFigure } from 'figura/models/idrawer';

interface FigureProps extends Child {}

const Element: Record<Child['type'], PrimitiveFigure> = {
  Rect: Rect,
  Circle: Circle,
  Text: Text,
};

const Figure: FC<FigureProps> = ({ type, ...props }) => {
  const Figura = Element[type];

  return <Figura {...props} />;
};

export default Figure;
export type { FigureProps };
