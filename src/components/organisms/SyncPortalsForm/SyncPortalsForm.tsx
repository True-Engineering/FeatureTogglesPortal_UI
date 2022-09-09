import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Button,
  RadioButton,
  TextWithTooltip,
} from '@true-engineering/true-react-common-ui-kit';
import { EmptyContentMessageEmoji, LinkButton, Tabs } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { IFlag, ISyncPortalsInfo } from '../../../types';
import {
  radioButtonTweakStyles,
  closeButtonTweakStyles,
  styles,
} from './SyncPortalsForm.styles';

interface ISyncPortalsFormProps {
  info: ISyncPortalsInfo;
  onSync: (args: { fileKey: string; shouldBeRemoved: boolean }) => void;
  onCancel: () => void;
}

const SyncPortalsForm: FC<ISyncPortalsFormProps> = ({
  info,
  onSync,
  onCancel,
}) => {
  const { classes } = useFeatureTogglesTheme('SyncPortalsForm', styles, {});

  const { t } = useTranslation();

  const newFlagsCount = info.featureFlagsToAdd?.length ?? 0;
  const removedFlagsCount = info.featureFlagsToRemove?.length ?? 0;
  const updatedFlagsCount = info.featureFlagsToUpdate?.length ?? 0;
  const totalFlagsCount = newFlagsCount + removedFlagsCount + updatedFlagsCount;

  const [isSyncing, setIsSyncing] = useState(false);
  // Должны ли отсутствующие в файлике (но присутствующие на портале) флаги быть удалены с портала
  const [shouldBeRemoved, setShouldBeRemoved] = useState<boolean>();

  const isWaitingForUserActions =
    removedFlagsCount > 0 && shouldBeRemoved === undefined;

  const handleSync = () => {
    if (isWaitingForUserActions) {
      return;
    }
    setIsSyncing(true);
    onSync({
      fileKey: info.key,
      shouldBeRemoved: shouldBeRemoved ?? false,
    });
  };

  const renderFeatureFlagsList = (flags: IFlag[]) =>
    flags.length === 0 ? (
      <div className={classes.noChanges}>{t('noChanges')}</div>
    ) : (
      <div className={classes.flagsTable}>
        {flags.map((flag: IFlag) => (
          <div key={flag.name} className={classes.flagRow} title={flag.name}>
            {flag.description}
          </div>
        ))}
      </div>
    );

  const renderSmallConfirmMessage = () => (
    <div
      className={clsx(
        classes.deleteConfirm,
        isWaitingForUserActions
          ? classes.deleteConfirmWarning
          : classes.deleteConfirmInfo,
      )}
    >
      {t('confirmRemovalOfFlagsFromPortal')}
      {':'}

      <div className={classes.radioList}>
        <RadioButton
          groupName="ffDelete"
          value="delete"
          isChecked={shouldBeRemoved === true}
          onChange={() => setShouldBeRemoved(true)}
          tweakStyles={radioButtonTweakStyles}
        >
          {t('delete')}
        </RadioButton>
        <RadioButton
          groupName="ffDelete"
          value="noDelete"
          isChecked={shouldBeRemoved === false}
          onChange={() => setShouldBeRemoved(false)}
          tweakStyles={radioButtonTweakStyles}
        >
          {t('noDelete')}
        </RadioButton>
      </div>
    </div>
  );

  if (totalFlagsCount === 0) {
    return (
      <div className={classes.portalsSynchronization}>
        <div className={classes.header}>
          <div className={classes.title}>{t('syncPortals')}</div>
          <div className={classes.subtitle}>
            <div className={classes.count}>{totalFlagsCount}</div>
            {t('featureFlagsChanges')}
          </div>
          <div className={classes.closeButton}>
            <LinkButton
              icon="close-large"
              iconPosition="right"
              isBold
              text={t('close')}
              size="small"
              view="cancel"
              onClick={onCancel}
              tweakStyles={closeButtonTweakStyles}
            />
          </div>
        </div>
        <div className={classes.emptyContent}>
          <div className={classes.emptyContent}>
            <EmptyContentMessageEmoji text={t('noChangesInFeatureFlags')} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.portalsSynchronization}>
      <div className={classes.header}>
        <div className={classes.title}>{t('syncPortals')}</div>
        <div className={classes.subtitle}>
          <div className={classes.count}>{totalFlagsCount}</div>
          {t('featureFlagsChanges')}
        </div>
      </div>

      <div className={classes.content}>
        <Tabs
          direction="horizontal"
          view="second"
          tabs={[
            {
              key: 0,
              text: t('newFeatureFlagsTab'),
              count: newFlagsCount,
              content: (
                <div className={classes.tabContent}>
                  <div className={classes.tabTitle}>
                    {newFlagsCount} {t('newFeatureFlagsTitle')}
                  </div>
                  {renderFeatureFlagsList(info.featureFlagsToAdd ?? [])}
                </div>
              ),
            },
            {
              key: 1,
              text: t('updatedFeatureFlagsTab'),
              count: updatedFlagsCount,
              content: (
                <div className={classes.tabContent}>
                  <div className={classes.tabTitle}>
                    {updatedFlagsCount} {t('updatedFeatureFlagsTitle')}
                  </div>
                  {renderFeatureFlagsList(
                    (info.featureFlagsToUpdate ?? []).map(
                      el => el.newFeatureFlag,
                    ),
                  )}
                </div>
              ),
            },
            {
              key: 2,
              text: t('removedFeatureFlagsTab'),
              count: removedFlagsCount,
              componentAfterTab: isWaitingForUserActions && (
                <div
                  className={clsx(
                    classes.deleteConfirmSmall,
                    classes.deleteConfirmWarning,
                  )}
                >
                  <div className={classes.deleteConfirmWarningCircleIcon} />
                  {t('confirmRemoval')}
                </div>
              ),
              content: (
                <div className={classes.tabContent}>
                  <div className={classes.tabTitle}>
                    {removedFlagsCount} {t('removedFeatureFlagsTitle')}
                  </div>
                  {removedFlagsCount > 0 && renderSmallConfirmMessage()}
                  {renderFeatureFlagsList(info.featureFlagsToRemove ?? [])}
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className={classes.footer}>
        <div className={classes.footerButton}>
          <Button view="secondary" size="xl" onClick={onCancel}>
            {t('cancel')}
          </Button>
        </div>
        <div className={classes.footerButton}>
          <TextWithTooltip
            tooltipText={t('confirmRemovalOfFlags')}
            isDisabled={!isWaitingForUserActions}
            tooltipView="hint"
            tooltipType="info"
          >
            <Button
              view="primary"
              size="xl"
              type="submit"
              isDisabled={isWaitingForUserActions || isSyncing}
              onClick={handleSync}
            >
              {t('sync')}
            </Button>
          </TextWithTooltip>
        </div>
      </div>
    </div>
  );
};

export default SyncPortalsForm;
