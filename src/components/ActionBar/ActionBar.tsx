import { FC, ComponentProps } from 'react';
import clsx from 'clsx';

import s from './ActionBar.module.css';

type PrimitiveProps = ComponentProps<'div'>;

interface ActionBarProps extends PrimitiveProps {}

const ActionBar: FC<ActionBarProps> = ({ ref, className, children, ...props }) => {
  return (
    <div ref={ref} className={clsx(s.actionBar, className)} {...props}>
      {children}
    </div>
  );
};

export default ActionBar;
export type { ActionBarProps };
