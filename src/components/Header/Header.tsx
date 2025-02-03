import type { FC, ComponentProps } from 'react';
import clsx from 'clsx';

import { DrawAction, DrawerType } from 'figura/models';
import { FiguraIcon } from '../FiguraIcon';

import typography from 'figura/assets/typography.svg';
import s from './Header.module.css';
import { useDrawer } from 'figura/hooks/useDrawer';

type PrimitiveProps = Omit<ComponentProps<'header'>, 'children'>;

interface HeaderProps extends PrimitiveProps {}

const Header: FC<HeaderProps> = ({ ref, className, ...props }) => {
  const { state, dispatch } = useDrawer();
  const { action } = state;

  const handleClick = (name: DrawAction) => () => {
    dispatch({ type: DrawerType.CHANGE_DRAW_ACTION, payload: name });
  };

  return (
    <header ref={ref} className={clsx(s.headerContainer, className)} {...props}>
      <div className={s.left}>
        <button
          className={clsx(s.actionButton, action === 'file' && s.focusedButton)}
          onClick={handleClick('file')}
        >
          <FiguraIcon name="HiMiniBolt" size={25} />
          <FiguraIcon name="HiChevronDown" size={10} />
        </button>
        <button
          className={clsx(s.actionButton, action === 'selection' && s.focusedButton)}
          onClick={handleClick('selection')}
        >
          <FiguraIcon name="HiArrowTopRightOnSquare" transform="scale(-1)" size={25} />
        </button>
        <button
          className={clsx(s.actionButton, action === 'hand-move' && s.focusedButton)}
          onClick={handleClick('hand-move')}
        >
          <FiguraIcon name="HiOutlineHandRaised" size={25} />
        </button>
        <button
          className={clsx(s.actionButton, action === 'frame' && s.focusedButton)}
          onClick={handleClick('frame')}
        >
          <FiguraIcon name="HiOutlineCubeTransparent" size={25} />
          <FiguraIcon name="HiChevronDown" size={10} />
        </button>
        <button
          className={clsx(s.actionButton, action === 'typography' && s.focusedButton)}
          onClick={handleClick('typography')}
        >
          <img width={25} height={25} src={typography} alt="typography-icon" />
        </button>
      </div>
      <div className={s.center}>
        <FiguraIcon name="HiMiniFingerPrint" />
      </div>
      <div className={s.right}>
        <button className={s.actionButton}>
          <FiguraIcon name="HiMiniPlay" />
        </button>
      </div>
    </header>
  );
};

export default Header;
export type { HeaderProps };
