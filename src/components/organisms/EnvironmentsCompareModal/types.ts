import { IFlag, IProjectEnvironment } from '../../../types';

export type IFlagWithValue = IFlag & { isEnabled: boolean };

export interface ICompareState {
  enable: IFlagWithValue[];
  disable: IFlagWithValue[];
}

export const ENABLED_ITEM_ID = 'enable' as const;
export const DISABLED_ITEM_ID = 'disable' as const;

export type IMenuItemId = typeof ENABLED_ITEM_ID | typeof DISABLED_ITEM_ID;

export interface IMenuItem {
  id: IMenuItemId;
  flags: IFlagWithValue[];
  count: number;
}

export type IFlagsChangeHandler = ({
  section,
  isSelected,
  value,
}: {
  section: IMenuItemId;
  isSelected: boolean;
  value: string;
}) => void;

export interface IEnvironmentsCompareFields {
  from?: IProjectEnvironment;
  to?: IProjectEnvironment;
}
