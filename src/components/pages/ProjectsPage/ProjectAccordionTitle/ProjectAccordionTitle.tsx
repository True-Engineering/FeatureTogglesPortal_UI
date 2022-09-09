import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon, Tooltip } from '@true-engineering/true-react-common-ui-kit';
import { YellowStarIcon } from './components';
import {
  IconButton,
  ITextWithStatusProps,
  LinkButton,
  PermissionController,
  TextWithStatus,
} from '../../../atoms';
import { useFeatureTogglesTheme } from '../../../../hooks';
import { IProject, IProjectStatus } from '../../../../types';
import { styles, linkButtonTweakStyles } from './ProjectAccordionTitle.styles';

export interface IProjectAccordionTitleProps {
  project: IProject;
  isDefaultProject: boolean;
  hasEditButton?: boolean;
  flagsLink: string;
  membersLink: string;
  onDefaultProjectClick: () => void;
  onEditClick: () => void;
}

const ProjectAccordionTitle: FC<IProjectAccordionTitleProps> = ({
  project,
  isDefaultProject,
  hasEditButton,
  flagsLink,
  membersLink,
  onDefaultProjectClick,
  onEditClick,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'ProjectAccordionTitle',
    styles,
    {},
  );
  const { t } = useTranslation();

  const {
    name,
    status,
    membersCount = 0,
    featureFlagsCount = 0,
    permissions,
  } = project;

  return (
    <div className={classes.root}>
      {isDefaultProject ? (
        <div className={classes.starDefault}>
          <YellowStarIcon />
        </div>
      ) : (
        <div
          className={classes.starNotDefault}
          onClick={event => {
            event.stopPropagation();
            onDefaultProjectClick();
          }}
        >
          <div className={classes.tooltip}>
            <Tooltip view="hint" text={t('setAsDefaultProject')} />
          </div>
          <Icon type="star" />
        </div>
      )}

      <div className={classes.projectName}>{name}</div>
      <div className={classes.projectInfo}>
        {status !== undefined && (
          <TextWithStatus
            color={statusColors[status]}
            text={t(`projectStatus.${status}`)}
          />
        )}
        <div className={classes.projectCounts}>
          <div className={classes.membersCount}>
            <PermissionController
              permissions={permissions}
              allow={['EDIT_MEMBERS', 'READ_MEMBERS']}
            >
              <Link to={membersLink} className={classes.linkButton}>
                <LinkButton
                  size="small"
                  view="cancel"
                  text={`${membersCount} ${t('member', {
                    count: membersCount,
                  }).toLowerCase()}`}
                  tweakStyles={linkButtonTweakStyles}
                  icon="chevron-right"
                  iconPosition="right"
                  hasCircleUnderIcon
                  isBold
                />
              </Link>
            </PermissionController>
          </div>
          <div className={classes.featureFlagsCount}>
            <Link to={flagsLink} className={classes.linkButton}>
              <LinkButton
                size="small"
                view="cancel"
                text={`${featureFlagsCount} ${t('flag', {
                  count: featureFlagsCount,
                }).toLowerCase()}`}
                tweakStyles={linkButtonTweakStyles}
                icon="chevron-right"
                iconPosition="right"
                hasCircleUnderIcon
                isBold
              />
            </Link>
          </div>
        </div>
      </div>

      {hasEditButton && (
        <div className={classes.editButton}>
          <IconButton
            icon="pencil"
            onClick={event => {
              event.stopPropagation();
              onEditClick();
            }}
          />
        </div>
      )}
    </div>
  );
};

const statusColors: Record<IProjectStatus, ITextWithStatusProps['color']> = {
  ACTIVE: 'green',
  OUT_OF_SYNC: 'grey',
  UNAVAILABLE: 'red',
  NOT_CONNECTED: 'orange',
};

export default ProjectAccordionTitle;
