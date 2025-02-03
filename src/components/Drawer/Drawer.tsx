import { type FC, type ComponentProps } from 'react';
import clsx from 'clsx';
import { Stage, Layer } from 'react-konva';

import { useDrawer } from 'figura/hooks/useDrawer';

import s from './Drawer.module.css';
import { Figure } from '../Figure';

type PrimitiveProps = Omit<ComponentProps<'div'>, 'children'>;

interface DrawerProps extends PrimitiveProps {}

const Drawer: FC<DrawerProps> = ({ ref, className, ...props }) => {
  const { state, handler } = useDrawer();
  const { figures } = state;
  const { mouseDown, mouseUp } = handler;
  const currentFigures = figures;

  return (
    <div ref={ref} className={clsx(s.container, className)} {...props}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      >
        <Layer>
          {(currentFigures ?? []).map(({ id, type, props }) => (
            <Figure key={id} type={type} {...props} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Drawer;
export type { DrawerProps };
