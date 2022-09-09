import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountInfo } from '@true-engineering/true-react-common-ui-kit';
import { AccountAvatar, LanguageDropdown } from '../../atoms';
import { useStore, useFeatureTogglesTheme } from '../../../hooks';
import { sortById } from '../../../utils';
import { ILocale } from '../../../types';
import { styles } from './PageHeader.styles';
import {
  HeaderIconWithDropdown,
  IHeaderIconWithDropdownProps,
} from '../HeaderIconWithDropdown';

export interface IPageHeaderProps
  extends Omit<IHeaderIconWithDropdownProps, 'projects' | 'onProjectClick'> {
  children?: React.ReactNode;
}

const PageHeader: FC<IPageHeaderProps> = ({ children, ...headerProps }) => {
  const { classes } = useFeatureTogglesTheme('PageHeader', styles, {});
  const { t, i18n } = useTranslation();

  const { currentOrganization, isInitializing, user, signOut } = useStore();

  const sortedProjects =
    currentOrganization === undefined
      ? []
      : sortById(currentOrganization.projects);

  return (
    <div className={classes.root}>
      <HeaderIconWithDropdown {...headerProps} projects={sortedProjects} />
      <div className={classes.headerRightSide}>
        {children}
        {!isInitializing && user !== undefined && (
          <div className={classes.account}>
            <AccountInfo
              accountName={user.userName}
              avatar={
                <div className={classes.avatar}>
                  <AccountAvatar
                    name={user.userName}
                    avatarUrl={user.avatarUrl}
                  />
                </div>
              }
              options={[{ item: t('logOut'), onClick: () => signOut() }]}
            />
          </div>
        )}
        <div className={classes.lang}>
          <LanguageDropdown
            value={i18n.language as ILocale}
            onChange={(lang: ILocale) => {
              i18n.changeLanguage(lang);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
