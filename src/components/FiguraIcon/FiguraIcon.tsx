import { FC } from 'react';
import * as icons from 'react-icons/hi2';
import { IconBaseProps } from 'react-icons';

interface FiguraIconProps extends IconBaseProps {
  name: keyof typeof icons;
}

const FiguraIcon: FC<FiguraIconProps> = ({ name, size = 18, ...props }) => {
  const Icon = icons[name];

  return <Icon size={size} {...props} />;
};

export default FiguraIcon;
export type { FiguraIconProps };
