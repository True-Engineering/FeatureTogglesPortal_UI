import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  ThemeContext,
  UiKitTheme,
} from '@true-engineering/true-react-common-ui-kit';
import '@true-engineering/true-react-common-ui-kit/dist/style.css';
import { CssBaseline, ToasterManager, ModalManager } from './components';
import store, { Context } from './store';
import { TOOLTIP_CONTAINER_ID } from './constants';
import Routes from './Routes';
import './i18nConfig';

interface IFeatureTogglesPortalProps {
  theme: UiKitTheme;
}

const FeatureTogglesPortal: FC<IFeatureTogglesPortalProps> = ({ theme }) => (
  <ThemeContext.Provider value={{ theme }}>
    <CssBaseline />
    <Context.Provider value={store}>
      <Routes>
        <ModalManager />
        <ToasterManager />
      </Routes>
    </Context.Provider>
    <div id={TOOLTIP_CONTAINER_ID} />
  </ThemeContext.Provider>
);

export default observer(FeatureTogglesPortal);
