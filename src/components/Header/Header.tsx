import { useState, type FC, type ComponentProps } from 'react';
import clsx from 'clsx';

import { FiguraIcon } from '../FiguraIcon';

import typography from 'figura/assets/typography.svg';
import s from './Header.module.css';

type PrimitiveProps = Omit<ComponentProps<'header'>, 'children'>;

interface HeaderProps extends PrimitiveProps {
  // your props
}

type Action = 'file' | 'selection' | 'box' | 'hand-move' | 'typography';

const Header: FC<HeaderProps> = ({ ref, className, ...props }) => {
  const [selected, setSelected] = useState<Action | undefined>('selection');

  const handleClick = (name: Action) => () => {
    setSelected(name);
  };

  return (
    <header ref={ref} className={clsx(s.headerContainer, className)} {...props}>
      <div className={s.left}>
        <button
          className={clsx(s.actionButton, selected === 'file' && s.focusedButton)}
          onClick={handleClick('file')}
        >
          <FiguraIcon name="HiMiniBolt" size={25} />
          <FiguraIcon name="HiChevronDown" size={10} />
        </button>
        <button
          className={clsx(s.actionButton, selected === 'selection' && s.focusedButton)}
          onClick={handleClick('selection')}
        >
          <FiguraIcon name="HiArrowTopRightOnSquare" transform="scale(-1)" size={25} />
        </button>
        <button
          className={clsx(s.actionButton, selected === 'hand-move' && s.focusedButton)}
          onClick={handleClick('hand-move')}
        >
          <FiguraIcon name="HiOutlineHandRaised" size={25} />
        </button>
        <button
          className={clsx(s.actionButton, selected === 'box' && s.focusedButton)}
          onClick={handleClick('box')}
        >
          <FiguraIcon name="HiOutlineCubeTransparent" size={25} />
          <FiguraIcon name="HiChevronDown" size={10} />
        </button>
        <button
          className={clsx(s.actionButton, selected === 'typography' && s.focusedButton)}
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
