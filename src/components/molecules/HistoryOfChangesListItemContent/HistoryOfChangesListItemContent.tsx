import React, { FC } from 'react';
import {
  FlagEdition,
  FlagCreation,
  FlagDeletion,
  FlagEnvironmentStatusChanges,
} from './components';
import { IHistoryOfChangesListItem } from '../../../types';

export interface IHistoryOfChangesListItemContentProps {
  listItem: IHistoryOfChangesListItem;
}

const HistoryOfChangesListItemContent: FC<IHistoryOfChangesListItemContentProps> = ({
  listItem,
  listItem: { action },
}) => (
  <>
    {(action === 'CREATE' || action === 'RESTORE') && (
      <FlagCreation listItem={listItem} />
    )}
    {action === 'EDIT' && <FlagEdition listItem={listItem} />}
    {action === 'DELETE' && <FlagDeletion listItem={listItem} />}
    {(action === 'ENABLE' || action === 'DISABLE') && (
      <FlagEnvironmentStatusChanges listItem={listItem} />
    )}
  </>
);

export default HistoryOfChangesListItemContent;
