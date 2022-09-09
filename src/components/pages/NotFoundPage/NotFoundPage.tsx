import React from 'react';
import { useTranslation } from 'react-i18next';
import { NotFoundMessage } from '../../atoms';
import { PageHeader, PageFooter } from '../../organisms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './NotFoundPage.styles';

const NotFoundPage: React.FC = () => {
  const { classes } = useFeatureTogglesTheme('NotFoundPage', styles, {});
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <PageHeader hasMenu={false} />

      <div className={classes.content}>
        <NotFoundMessage
          code={404}
          header={t('pageNotFound')}
          description={t('pageNotFoundDescription')}
        />
      </div>
      <PageFooter />
    </div>
  );
};

export default NotFoundPage;
