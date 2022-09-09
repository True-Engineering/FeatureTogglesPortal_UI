import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { GlobalPreloader } from '../../components';
import { useStore } from '../../hooks';
import type { IRoute } from './types';

interface IRouteWrapperProps {
  component: React.FunctionComponent;
  route: IRoute;
}

const RouteWrapper: FC<IRouteWrapperProps> = props => {
  const { init } = useStore();
  const [isInitialized, setInitialized] = useState(false);

  const { component: Component, route, ...restProps } = props;

  useEffect(() => {
    if (route.isPublicPage) {
      setInitialized(true);
    } else {
      init().then(() => setInitialized(true));
    }
  }, []);

  return isInitialized ? <Component {...restProps} /> : <GlobalPreloader />;
};

export default observer(RouteWrapper);
