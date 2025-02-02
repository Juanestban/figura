import { FC, ComponentProps } from 'react';
import clsx from 'clsx';
import { Stage, Layer, Text, Rect } from 'react-konva';

import s from './Drawer.module.css';

type PrimitiveProps = Omit<ComponentProps<'div'>, 'children'>;

interface DrawerProps extends PrimitiveProps {
  // your props
}

const Drawer: FC<DrawerProps> = ({ ref, className, ...props }) => {
  return (
    <div ref={ref} className={clsx(s.container, className)} {...props}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Texto!" x={290} y={50} fontSize={16} />
          <Rect x={290} y={70} width={100} height={100} fill="#09f" draggable />
        </Layer>
      </Stage>
    </div>
  );
};

export default Drawer;
export type { DrawerProps };
