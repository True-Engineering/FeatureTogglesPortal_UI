import React, { FC, useEffect } from 'react';
import { useStore } from '../../../../hooks';
import { IProjectId } from '../../../../types';

export interface IProjectAccordionContentWrapperProps {
  projectId: IProjectId;
  children: React.ReactNode;
}

const ProjectAccordionContentWrapper: FC<IProjectAccordionContentWrapperProps> = ({
  projectId,
  children,
}) => {
  const { refreshProject } = useStore();

  useEffect(() => {
    refreshProject(projectId);
  }, []);

  return <>{children}</>;
};

export default ProjectAccordionContentWrapper;
