import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './PageFooter.styles';

const PageFooter: FC = () => {
  const { t: localeT } = useTranslation('themed');
  const { classes } = useFeatureTogglesTheme('PageFooter', styles, {});

  const { frontendVersion, backendVersion } = useStore();

  return (
    <div className={classes.root}>
      <div className={classes.footerContent}>
        <div>
          {`${localeT(`developedBy`)}. `}
          {frontendVersion !== undefined && `Frontend: ${frontendVersion}. `}
          {backendVersion !== undefined && `Portal: ${backendVersion}.`}
        </div>
        <div>{`\u00a9 ${new Date().getFullYear()} ${localeT(
          `copyright`,
        )}`}</div>
      </div>
    </div>
  );
};

export default PageFooter;
