import React, { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './Tabs.styles';

type ITabKey = string | number;

interface ITab {
  key: ITabKey;
  text: string;
  count?: number;
  content: ReactNode;
  componentAfterTab?: ReactNode;
}

export interface ITabsProps {
  tabs: ITab[];
  initialActiveKey?: ITabKey;
  direction?: 'vertical' | 'horizontal';
  view?: 'primary' | 'second';
}

const Tabs: FC<ITabsProps> = ({
  tabs,
  initialActiveKey,
  direction = 'vertical',
  view = 'primary',
}) => {
  const { classes } = useFeatureTogglesTheme('Tabs', styles, {});
  const activeTabClass =
    view === 'primary' ? classes.activeTab : classes.activeSecondTab;
  const tabClass = view === 'primary' ? classes.tab : classes.secondTab;

  const [activeTabKey, setActiveTabKey] = useState<ITabKey>(
    initialActiveKey ?? tabs[0].key,
  );

  const activeTab = tabs.find(tab => tab.key === activeTabKey);

  return (
    <div className={clsx(classes.root, classes[direction])}>
      <div className={classes.segments}>
        {tabs.map(({ key, text, count, componentAfterTab }) => (
          <button
            key={key}
            className={key === activeTabKey ? activeTabClass : tabClass}
            onClick={() => setActiveTabKey(key)}
          >
            {text}
            {count !== undefined && (
              <div className={classes.count}>{count}</div>
            )}
            {componentAfterTab}
          </button>
        ))}
      </div>
      {activeTab !== undefined && (
        <div className={classes.content} key={activeTab.key}>
          {activeTab.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
