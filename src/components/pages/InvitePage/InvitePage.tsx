import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ThemedPreloader } from '@true-engineering/true-react-common-ui-kit';
import { useApi, useRoutes, useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './InvitePage.styles';

const InvitePage: FC = () => {
  const { classes } = useFeatureTogglesTheme('InvitePage', styles, {});
  const api = useApi();
  const {
    params: { uuid },
    routes,
    changeLocation,
  } = useRoutes<'invitePage'>();

  useEffect(() => {
    async function init() {
      try {
        await api.fetchInvite({ uuid });

        const urlToRedirect = routes.mainPage.getUrl();
        changeLocation(urlToRedirect);
      } catch (e) {
        console.error(e);
      }
    }

    init();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.preloader}>
        <ThemedPreloader type="logo" />
      </div>
    </div>
  );
};

export default observer(InvitePage);
