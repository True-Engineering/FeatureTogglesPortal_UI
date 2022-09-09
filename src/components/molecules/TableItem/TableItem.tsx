import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import { Icon } from '@true-engineering/true-react-common-ui-kit';
import {
  FlagEnvironmentsStates,
  IconButton,
  CopyToClipboardButton,
} from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { IFlag } from '../../../types';
import { useCollapseAnimationStyles } from '../../commonStyles';
import { styles } from './TableItem.styles';
import {
  FlagEnvironmentsList,
  IFlagEnvironmentsListProps,
} from '../FlagEnvironmentsList';

export interface ITableItemProps
  extends Omit<IFlagEnvironmentsListProps, 'flag'> {
  item: IFlag;
  isEditable?: boolean;
  editableFlagName?: string;
  onEdit: (flagName: string) => void;
}

const TableItem: FC<ITableItemProps> = ({
  item,
  isEditable = false,
  editableFlagName,
  onEdit,
  ...flagEnvironmentsListProps
}) => {
  const { classes } = useFeatureTogglesTheme('TableItem', styles, {});
  const collapseAnimationClasses = useCollapseAnimationStyles();

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <tr
        className={clsx(
          classes.root,
          classes.rowWithAction,
          editableFlagName === item.name && classes.activeRow,
        )}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen(v => !v);
        }}
      >
        <td>
          <div className={classes.sprintCell}>
            <div className={clsx(classes.arrow, isOpen && classes.open)}>
              <Icon type="chevron-right" />
            </div>
            <div>{item.sprint}</div>
          </div>
        </td>
        <td title={item.name}>
          <div className={classes.nameCell}>
            {item.description}
            <div className={classes.actionButton}>
              <CopyToClipboardButton
                tooltipText={`${t('copy')} ${t('featureFlag')}`}
                clipboardText={item.name}
              />
            </div>
          </div>
        </td>
        <td>{item.type ? t(item.type) : ''}</td>
        <td>{item.tag}</td>
        <td>
          <FlagEnvironmentsStates environments={item.environments} />
        </td>
        <td>
          {isEditable && (
            <div className={classes.actionButton}>
              <IconButton
                icon="pencil"
                onClick={event => {
                  event.stopPropagation();
                  onEdit(item.name);
                }}
              />
            </div>
          )}
        </td>
      </tr>

      <tr className={classes.expandedRow}>
        <td colSpan={6}>
          <CSSTransition
            in={isOpen}
            timeout={300}
            unmountOnExit
            classNames={collapseAnimationClasses}
          >
            <div>
              <div className={classes.expandedRowData}>
                <FlagEnvironmentsList
                  flag={item}
                  {...flagEnvironmentsListProps}
                />
              </div>
            </div>
          </CSSTransition>
        </td>
      </tr>
    </>
  );
};

export default TableItem;
