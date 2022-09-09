import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  AccountAvatar,
  Confirmation,
  ContextPopup,
  IconButton,
} from '../../../../atoms';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { IOrganizationMember, IUser } from '../../../../../types';
import {
  styles,
  deleteConfirmTweakStyles,
} from './MemberAccordionTitle.styles';

export interface IMemberAccordionTitleProps {
  member: IOrganizationMember;
  onDeleteUser?: (user: IUser) => void;
}

const MemberAccordionTitle: FC<IMemberAccordionTitleProps> = ({
  member,
  onDeleteUser,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'MemberAccordionTitle',
    styles,
    {},
  );
  const { t } = useTranslation();

  const { user, projects } = member;
  return (
    <div className={classes.root}>
      <div className={classes.userInfo}>
        <AccountAvatar name={user.userName} avatarUrl={user.avatarUrl} />
        <div className={classes.userName} title={user.userName}>
          {user.userName}
        </div>
      </div>
      <div className={classes.projects}>
        {projects.map(({ projectId, projectName }) => (
          <div key={projectId} className={classes.tag}>
            {projectName}
          </div>
        ))}
      </div>
      {onDeleteUser !== undefined && (
        <div className={classes.deleteButton}>
          <ContextPopup
            tweakStyles={deleteConfirmTweakStyles}
            popup={({ onClose }) => (
              <Confirmation
                onConfirm={() => onDeleteUser(user)}
                onCancel={() => onClose()}
                message={t('confirmToDeleteOrganizationMember')}
                buttonView="destructive"
                buttonText={t('delete')}
              />
            )}
          >
            {({ isOpen }) => (
              <div className={clsx(!isOpen && classes.actionButton)}>
                <IconButton icon="trash-can" />
              </div>
            )}
          </ContextPopup>
        </div>
      )}
    </div>
  );
};

export default MemberAccordionTitle;
