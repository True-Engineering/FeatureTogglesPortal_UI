import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { List } from '@true-engineering/true-react-common-ui-kit';
import { ContextPopup, LinkButton } from '../../../../atoms';
import { IProject, IProjectRolesInfo } from '../../../../../types';

export interface IAddToProjectButtonProps {
  projects: IProject[];
  memberProjects: IProjectRolesInfo[];
  onAddToProject: (project: IProject) => void;
}

const AddToProjectButton: FC<IAddToProjectButtonProps> = ({
  projects,
  memberProjects,
  onAddToProject,
}) => {
  const { t } = useTranslation();

  const memberProjectIds = memberProjects.map(pr => pr.projectId);

  const freeProjects = projects.filter(pr => !memberProjectIds.includes(pr.id));
  return (
    <ContextPopup
      hasWrapperStyle={false}
      popup={({ onClose }) => (
        <List
          onClick={onClose}
          items={
            freeProjects.length === 0
              ? [
                  {
                    item: t('noProjects'),
                    disabled: true,
                    onClick: () => null,
                  },
                ]
              : freeProjects.map(project => ({
                  item: project.name,
                  onClick: () => {
                    onAddToProject(project);
                  },
                }))
          }
        />
      )}
    >
      {({ isOpen }) => (
        <LinkButton
          icon="plus"
          text={t('addProject')}
          hasCircleUnderIcon
          isActive={isOpen}
          isBold
          size="small"
        />
      )}
    </ContextPopup>
  );
};

export default AddToProjectButton;
