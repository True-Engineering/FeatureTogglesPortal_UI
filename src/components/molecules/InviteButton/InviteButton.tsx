import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from '@true-engineering/true-react-common-ui-kit';
import { ProjectUniqueIcon } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { copyToClipboard } from '../../../utils';
import { styles, buttonTweakStyles } from './InviteButton.styles';

export interface IInviteButtonProps {
  onGetInviteLink: () => Promise<string>;
}

const InviteButton: FC<IInviteButtonProps> = ({ onGetInviteLink }) => {
  const { classes } = useFeatureTogglesTheme('InviteButton', styles, {});
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsLoading(true);
    try {
      const inviteLink = await onGetInviteLink();
      copyToClipboard(inviteLink);
      setIsCopied(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <div onMouseLeave={() => setIsCopied(false)}>
        <Button
          size="s"
          view="outline"
          tweakStyles={buttonTweakStyles}
          isLoading={isLoading}
          onClick={handleClick}
        >
          <div className={classes.icon}>
            <ProjectUniqueIcon type="link" />
          </div>
          {t('copyLink')}
        </Button>
      </div>
      {isCopied && (
        <div className={classes.tooltip}>
          <Tooltip view="hint" text={t('copied')} />
        </div>
      )}
    </div>
  );
};

export default InviteButton;
