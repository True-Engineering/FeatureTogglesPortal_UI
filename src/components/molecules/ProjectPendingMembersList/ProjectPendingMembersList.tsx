import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Button } from '@true-engineering/true-react-common-ui-kit';
import { AccountAvatar } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { IProject, IProjectId, IProjectMember, IUser } from '../../../types';
import { tableStyles } from '../../commonStyles';
import { styles } from './ProjectPendingMembersList.styles';

export interface IProjectPendingMembersListProps {
  users: IProjectMember[];
  onAcceptUser: (args: {
    user: IUser;
    projectName: IProject['name'];
    projectId: IProjectId;
  }) => void;
  onRejectUser: (args: {
    user: IUser;
    projectName: IProject['name'];
    projectId: IProjectId;
  }) => void;
}

const ProjectPendingMembersList: FC<IProjectPendingMembersListProps> = ({
  users,
  onAcceptUser,
  onRejectUser,
}) => {
  const { classes: tableClasses } = useFeatureTogglesTheme(
    'tableStyles',
    tableStyles,
    {},
  );

  const { classes } = useFeatureTogglesTheme(
    'ProjectPendingMembersList',
    styles,
  );
  const { t } = useTranslation();

  if (users.length === 0) {
    return <div className={classes.empty}>{t('noMembers')}</div>;
  }

  return (
    <div className={clsx(tableClasses.table, classes.root)}>
      {users.map(({ user, projectId, projectName }) => {
        const { id: userId, userName, avatarUrl, email } = user;
        return (
          <div key={userId} className={tableClasses.row}>
            <div
              className={clsx(
                tableClasses.cell,
                classes.nameColumn,
                classes.nameCell,
              )}
            >
              <AccountAvatar name={userName} avatarUrl={avatarUrl} />
              <div className={classes.userName} title={userName}>
                {userName}
              </div>
            </div>
            <div className={clsx(tableClasses.cell, classes.emailColumn)}>
              <div className={classes.email} title={email}>
                {email}
              </div>
            </div>
            <div className={clsx(tableClasses.cell, classes.actionsColumn)}>
              <div className={classes.actionsCell}>
                <Button
                  onClick={() => onRejectUser({ user, projectId, projectName })}
                  view="secondary"
                  size="s"
                >
                  {t('reject')}
                </Button>
                <Button
                  onClick={() => onAcceptUser({ user, projectId, projectName })}
                  view="primary"
                  size="s"
                >
                  {t('accept')}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectPendingMembersList;
