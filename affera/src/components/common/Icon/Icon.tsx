import React from 'react';
import { IconType } from 'react-icons';
import { IconBaseProps } from 'react-icons/lib';

interface IconProps extends IconBaseProps {
  icon: IconType;
}

const Icon: React.FC<IconProps> = ({ icon: IconComponent, ...props }) => {
  const element = React.createElement(IconComponent as React.ComponentType<IconBaseProps>, props);
  return element;
};

export default Icon;
