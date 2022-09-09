import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { copyToClipboard } from '../../../utils';
import { styles } from './CopyToClipboardButton.styles';
import { IconButton } from '../IconButton';

export interface ICopyToClipboardButtonProps {
  tooltipText?: string;
  clipboardText: string;
}

const CopyToClipboardButton: FC<ICopyToClipboardButtonProps> = ({
  tooltipText,
  clipboardText,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'CopyToClipboardButton',
    styles,
    {},
  );
  const { t } = useTranslation();

  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.tooltip}>
        <Tooltip
          view="hint"
          text={isCopied ? t('copied') : tooltipText ?? t('copy')}
        />
      </div>

      <IconButton
        icon="copy-outline"
        onClick={event => {
          event.stopPropagation();
          copyToClipboard(clipboardText);
          setIsCopied(true);
        }}
        onMouseLeave={() => {
          setIsCopied(false);
        }}
      />
    </div>
  );
};

export default CopyToClipboardButton;
