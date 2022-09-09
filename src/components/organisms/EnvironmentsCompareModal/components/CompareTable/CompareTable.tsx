import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Checkbox,
  ICheckboxProps,
} from '@true-engineering/true-react-common-ui-kit';
import { EmptyContentMessage } from '../../../../atoms';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import {
  DISABLED_ITEM_ID,
  ENABLED_ITEM_ID,
  ICompareState,
  IEnvironmentsCompareFields,
  IFlagsChangeHandler,
  IMenuItem,
  IMenuItemId,
} from '../../types';
import { styles } from './CompareTable.styles';

export interface ICompareTableProps {
  compareState: ICompareState;
  values: IEnvironmentsCompareFields;
  onFlagsChange: IFlagsChangeHandler;
  onAllFlagsChange: (section: IMenuItemId, isSelected: boolean) => void;
}

export const CompareTable: FC<ICompareTableProps> = ({
  compareState,
  values,
  onFlagsChange,
  onAllFlagsChange,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'EnvironmentsCompareModalCompareTable',
    styles,
    {},
  );
  const { t } = useTranslation();

  const [activeMenuItemId, setActiveMenuItemId] = useState<IMenuItemId>(
    ENABLED_ITEM_ID,
  );

  const menu: IMenuItem[] = [
    {
      id: ENABLED_ITEM_ID,
      flags: compareState?.enable,
      count: compareState?.enable.length,
    },
    {
      id: DISABLED_ITEM_ID,
      flags: compareState.disable,
      count: compareState.disable.length,
    },
  ];

  const handleCheckboxSelect: ICheckboxProps<string>['onSelect'] = v =>
    onFlagsChange({ ...v, section: activeMenuItemId });

  const handleAllCheckboxesSelect: ICheckboxProps<string>['onSelect'] = v =>
    onAllFlagsChange(activeMenuItemId, v.isSelected);

  const activeMenuItem = menu.find(item => item.id === activeMenuItemId);
  const filteredMenu = menu.filter(item => item.count > 0);

  const everyFlagChecked = useMemo(
    () => activeMenuItem?.flags.every(f => f.isEnabled),
    [compareState, activeMenuItem?.id],
  );

  const someFlagChecked = useMemo(() => {
    const firstVal = activeMenuItem?.flags[0]?.isEnabled;
    return (
      activeMenuItem !== undefined &&
      firstVal !== undefined &&
      activeMenuItem.flags.some(item => item.isEnabled !== firstVal)
    );
  }, [compareState, activeMenuItem?.id]);

  const allCheckboxLabel = `compareModal.${
    activeMenuItem?.id === ENABLED_ITEM_ID
      ? 'enableAllCheckboxDescription'
      : 'disableAllCheckboxDescription'
  }${(activeMenuItem?.count ?? 0) > 1 ? '_many' : ''}`;

  useEffect(() => {
    if (activeMenuItem?.count === 0) {
      setActiveMenuItemId(filteredMenu[0]?.id);
    }
  }, [compareState]);

  return (
    <div className={classes.root}>
      <div className={classes.aside}>
        <ul className={classes.menu}>
          {filteredMenu.map(item => (
            <li key={item.id} className={classes.menuItemWrapper}>
              <div
                className={clsx(
                  classes.menuItem,
                  item.id === activeMenuItemId && classes.menuItemActive,
                )}
                onClick={() => setActiveMenuItemId(item.id)}
              >
                <span>{t(`compareModal.${item.id}`)}</span>
                <span>{item.count}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.content}>
        {activeMenuItem === undefined ? (
          <div className={classes.emptyMessage}>
            <EmptyContentMessage text={t('compareModal.allFlagsSynced')} />
          </div>
        ) : (
          <>
            <div className={classes.header}>
              <div className={classes.headerInner}>
                <Checkbox
                  onSelect={handleAllCheckboxesSelect}
                  value="all"
                  alignItems="top"
                  isChecked={everyFlagChecked || someFlagChecked}
                  isSemiChecked={someFlagChecked}
                >
                  <div className={classes.headerLabelWrapper}>
                    <div className={classes.headerLabel}>
                      {t(`compareModal.${activeMenuItem.id}`)}
                    </div>
                    <div className={classes.headerLabelInfo}>
                      {t(allCheckboxLabel, {
                        count: activeMenuItem.count,
                        from: values.from?.name,
                        to: values.to?.name,
                      })}
                    </div>
                  </div>
                </Checkbox>
              </div>
            </div>
            <div className={classes.flags}>
              {activeMenuItem.flags.map(flag => (
                <div key={flag.name} className={classes.flag}>
                  <Checkbox
                    onSelect={handleCheckboxSelect}
                    value={flag.name}
                    alignItems="top"
                    isChecked={flag.isEnabled}
                  >
                    <div className={classes.label}>{flag.description}</div>
                  </Checkbox>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
