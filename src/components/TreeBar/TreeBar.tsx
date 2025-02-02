import { FC, ComponentProps } from 'react';
import clsx from 'clsx';

import s from './TreeBar.module.css';

type PrimitiveProps = Omit<ComponentProps<'div'>, 'children'>;

interface TreeBarProps extends PrimitiveProps {
  // your props
}

const TreeBar: FC<TreeBarProps> = ({ ref, className, ...props }) => {
  return (
    <div ref={ref} className={clsx(s.treeBar, className)} {...props}>
      Layer 1
    </div>
  );
};

export default TreeBar;
export type { TreeBarProps };
