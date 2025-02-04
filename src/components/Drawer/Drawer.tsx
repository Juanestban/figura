import { type FC, type ComponentProps } from 'react';
import clsx from 'clsx';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';

import { useDrawer } from 'figura/hooks/useDrawer';
import { Figure } from '../Figure';

import s from './Drawer.module.css';

type PrimitiveProps = Omit<ComponentProps<'div'>, 'children'>;

interface DrawerProps extends PrimitiveProps {}

const Drawer: FC<DrawerProps> = ({ ref, className, ...props }) => {
  const { state, isSelecting, hoverSelection, handler, handleHoverSelection } = useDrawer();
  const { figures } = state;
  const { mouseDown, mouseUp } = handler;
  const currentFigures = figures;

  const handleMouseMove = ({ evt }: Konva.KonvaEventObject<MouseEvent>) => {
    if (isSelecting) {
      const { initX, initY } = hoverSelection;
      const { clientX, clientY } = evt;

      const width = initX > clientX ? initX - clientX : clientX - initX;
      const height = initY > clientY ? initY - clientY : clientY - initY;
      const x = initX > clientX ? initX - width : initX;
      const y = initY > clientY ? initY - height : initY;

      handleHoverSelection({ x, y, width, height });
    }
  };

  return (
    <div ref={ref} className={clsx(s.container, className)} {...props}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {(currentFigures ?? []).map(({ id, type, props }) => (
            <Figure key={id} type={type} props={props} />
          ))}
          {isSelecting && (
            <Figure
              type="Rect"
              props={{
                ...hoverSelection,
                stroke: '#09f',
                strokeWidth: 1,
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Drawer;
export type { DrawerProps };
