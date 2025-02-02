import { FC, ComponentProps } from 'react';
import clsx from 'clsx';

import s from './TreeBar.module.css';

type PrimitiveProps = ComponentProps<'div'>;

interface TreeBarProps extends PrimitiveProps {
  // your props
}

const TreeBar: FC<TreeBarProps> = ({ ref, className, children, ...props }) => {
  return (
    <div ref={ref} className={clsx(s.container, className)} {...props}>
      {children}
    </div>
  );
};

export default TreeBar;
export type { TreeBarProps };
