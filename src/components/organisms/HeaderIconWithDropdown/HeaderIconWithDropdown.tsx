import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Icon } from '@true-engineering/true-react-common-ui-kit';
import {
  ContextPopup,
  ThemedIcon,
  LinkButton,
  EmptyContentMessageEmoji,
} from '../../atoms';
import { useRoutes, useFeatureTogglesTheme } from '../../../hooks';
import { IProject } from '../../../types';
import {
  styles,
  contextTweakStyles,
  linkButtonTweakStyles,
} from './HeaderIconWithDropdown.styles';

export interface IHeaderIconWithDropdownProps {
  hasMenu?: boolean;
  hasBackButton?: boolean;
  hasMainLink?: boolean;
  projects?: IProject[];
  title?: string;
}

const HeaderIconWithDropdown: FC<IHeaderIconWithDropdownProps> = ({
  hasMenu = true,
  title,
  hasBackButton = false,
  hasMainLink = true,
  projects = [],
}) => {
  const { classes } = useFeatureTogglesTheme(
    'HeaderIconWithDropdown',
    styles,
    {},
  );
  const { t } = useTranslation();
  const { t: localeT } = useTranslation('themed');

  const history = useHistory();
  const { routes } = useRoutes();

  const handleBack = useCallback(() => history.goBack(), []);

  const noProjects = projects === undefined || projects.length === 0;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {hasBackButton && (
          <button
            className={clsx(classes.icon, classes.backButton)}
            onClick={handleBack}
          >
            <Icon type="arrow" />
          </button>
        )}
        {hasMenu && (
          <ContextPopup
            hasWrapperStyle={false}
            placement="bottom-start"
            tweakStyles={contextTweakStyles}
            popup={({ onClose }) => (
              <div className={classes.dropdown}>
                {noProjects ? (
                  <div className={classes.emptyContentMessage}>
                    <EmptyContentMessageEmoji text={t('noProjects')} />
                  </div>
                ) : (
                  <div className={classes.list}>
                    {projects.map(project => (
                      <Link
                        key={project.id}
                        to={routes.projectPage.getUrl({
                          projectId: project.id,
                        })}
                      >
                        <div
                          key={project.name}
                          className={classes.item}
                          onClick={() => onClose()}
                        >
                          {project.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {hasMainLink && (
                  <div className={classes.linkButton}>
                    <Link to={routes.projectsPage.getUrl()}>
                      <LinkButton
                        icon="chevron-right"
                        text={
                          noProjects ? t('createProject') : t('allProjects')
                        }
                        hasCircleUnderIcon
                        size="small"
                        isBold
                        iconPosition="right"
                        tweakStyles={linkButtonTweakStyles}
                      />
                    </Link>
                  </div>
                )}
              </div>
            )}
          >
            {({ isOpen }) => (
              <button
                className={clsx(
                  classes.icon,
                  classes.burger,
                  isOpen && classes.activeIcon,
                )}
              >
                <Icon type="burger-menu" />
              </button>
            )}
          </ContextPopup>
        )}
        <NavLink to={routes.mainPage.getUrl()}>
          <div className={classes.logo}>
            <ThemedIcon type="small-logo" />
          </div>
        </NavLink>
        <NavLink to={routes.mainPage.getUrl()}>
          <div className={classes.title}>
            {title ?? localeT('headerAfterLogo')}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderIconWithDropdown;
