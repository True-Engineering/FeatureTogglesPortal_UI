import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { observer } from 'mobx-react-lite';
import { Toaster } from '@true-engineering/true-react-common-ui-kit';
import { useStore, useFeatureTogglesTheme } from '../../../hooks';
import { useSlideUpAnimationStyles } from '../../commonStyles';
import { styles } from './ToasterManager.styles';

const TOASTER_TIMEOUT = 300;

const ToasterManager: FC = () => {
  const { classes } = useFeatureTogglesTheme('ToasterManager', styles);
  const slideUpAnimationClasses = useSlideUpAnimationStyles();

  const { t } = useTranslation();

  const {
    techStore: { toastersList, removeToaster },
  } = useStore();

  if (toastersList.length === 0) {
    return null;
  }

  return (
    <TransitionGroup className={classes.root}>
      {toastersList.map(toaster => (
        <CSSTransition
          key={toaster.timestamp}
          timeout={TOASTER_TIMEOUT}
          classNames={slideUpAnimationClasses}
        >
          <div
            className={classes.toaster}
            onClick={() => removeToaster(toaster.timestamp)}
          >
            <Toaster
              {...toaster}
              onTimeEnd={() => {
                removeToaster(toaster.timestamp);
              }}
            >
              {toaster.errorResponse === undefined ? (
                toaster.children
              ) : (
                <>
                  <div className={classes.errorMessage}>
                    {t(
                      `errorCodes.${toaster.errorResponse.errorCode}`,
                      toaster.errorResponse.errorMessage,
                    )}
                  </div>

                  {toaster.children}
                </>
              )}
            </Toaster>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default observer(ToasterManager);
