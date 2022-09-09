import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  List,
  SearchInput,
  ThemedPreloader,
  useIsMounted,
} from '@true-engineering/true-react-common-ui-kit';
import { AccountAvatar, ContextPopup, Divider } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { IOrganizationMember, IUser } from '../../../types';
import {
  styles,
  buttonTweakStyles,
  searchTweakStyles,
  listTweakStyles,
} from './AddMemberToProjectButton.styles';

export interface IAddMemberToProjectButtonProps {
  onGetMembers: () => Promise<IOrganizationMember[]>;
  onAddToProject: (user: IUser) => void;
}

const AddMemberToProjectButton: FC<IAddMemberToProjectButtonProps> = ({
  onGetMembers,
  onAddToProject,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'AddMemberToProjectButton',
    styles,
    {},
  );

  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const [members, setMembers] = useState<IOrganizationMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const beforeOpen = async () => {
    setIsLoading(true);
    try {
      const response = await onGetMembers();

      if (isMounted()) {
        setMembers(response);
      }
    } finally {
      if (isMounted()) {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setSearch('');
  };

  const filteredMembers = filterMembers(members, search);

  return (
    <ContextPopup
      hasWrapperStyle={false}
      placement="bottom-start"
      popup={({ onClose }) => (
        <div className={classes.popup}>
          {isLoading ? (
            <ThemedPreloader type="dots" />
          ) : (
            <>
              <div className={classes.search}>
                <SearchInput
                  placeholder={t('search')}
                  value={search}
                  onChange={setSearch}
                  tweakStyles={searchTweakStyles}
                  shouldFocusOnMount
                />
              </div>
              <Divider />
              {members.length === 0 ? (
                <div className={classes.empty}>{t('noMembers')}</div>
              ) : filteredMembers.length === 0 ? (
                <div className={classes.empty}>{t('membersSearchEmpty')}</div>
              ) : (
                <List
                  tweakStyles={listTweakStyles}
                  items={filteredMembers.map(({ user }) => ({
                    item: user.userName,
                    icon: (
                      <AccountAvatar
                        avatarUrl={user.avatarUrl}
                        name={user.userName}
                      />
                    ),
                    onClick: () => {
                      onAddToProject(user);
                      onClose();
                    },
                  }))}
                />
              )}
            </>
          )}
        </div>
      )}
      beforeOpen={beforeOpen}
      onClose={handleClose}
    >
      {({ isOpen }) => (
        <Button
          size="s"
          isActive={isOpen}
          isLoading={isLoading}
          tweakStyles={buttonTweakStyles}
          icon="plus"
        >
          {t('add')}
        </Button>
      )}
    </ContextPopup>
  );
};

const filterMembers = (
  members: IOrganizationMember[],
  search: string,
): IOrganizationMember[] => {
  const str = search.toLowerCase();
  return members.filter(({ user: { userName } }) =>
    userName.toLowerCase().includes(str),
  );
};

export default AddMemberToProjectButton;
