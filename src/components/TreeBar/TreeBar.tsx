import { FC, ComponentProps } from 'react';
import clsx from 'clsx';

import { useDrawer } from 'figura/hooks/useDrawer';

import s from './TreeBar.module.css';

type PrimitiveProps = Omit<ComponentProps<'div'>, 'children'>;

interface TreeBarProps extends PrimitiveProps {}

const TreeBar: FC<TreeBarProps> = ({ ref, className, ...props }) => {
  const { state } = useDrawer();
  const { figures } = state;

  return (
    <div ref={ref} className={clsx(s.treeBar, className)} {...props}>
      <h4>Layers</h4>
      <div>
        {figures.map(({ id, name }, index) => (
          <div
            key={id}
            style={{
              backgroundColor: `var(${figures.length - 1 === index ? '--red' : '--soft-black'})`,
            }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeBar;
export type { TreeBarProps };
