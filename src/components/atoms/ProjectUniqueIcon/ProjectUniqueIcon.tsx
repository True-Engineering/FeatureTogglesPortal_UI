import React, { FC } from 'react';
import { projectUniqueIcons, IProjectUniqueIconType } from './icons';

export interface IProjectUniqueIconProps {
  type: IProjectUniqueIconType;
}

const ProjectUniqueIcon: FC<IProjectUniqueIconProps> = ({ type }) => {
  const Icon = projectUniqueIcons[type];
  return <>{Icon !== undefined && <Icon />}</>;
};

export default ProjectUniqueIcon;
