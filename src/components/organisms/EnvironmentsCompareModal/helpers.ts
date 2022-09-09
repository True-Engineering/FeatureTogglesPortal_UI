import { IFlag } from '../../../types';
import { ICompareState, IFlagWithValue } from './types';

export const mapFlag = (flag: IFlag): IFlagWithValue => ({
  ...flag,
  isEnabled: true,
});

export const combineResult = ({
  enable,
  disable,
}: ICompareState): Record<string, boolean> =>
  [
    ...enable.filter(f => f.isEnabled),
    ...disable.filter(f => f.isEnabled).map(f => ({ ...f, isEnabled: false })),
  ].reduce((acc, cur) => {
    acc[cur.name] = cur.isEnabled;
    return acc;
  }, {} as Record<string, boolean>);
