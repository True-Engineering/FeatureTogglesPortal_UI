import { IDatePeriod } from '@true-engineering/true-react-common-ui-kit';
import { IFliterPaneComplexValue } from '../../../types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type IFilterValuesConfig = {
  feature: IFliterPaneComplexValue<string>;
  user: IFliterPaneComplexValue<number>;
  period: IDatePeriod;
  tag: string;
};
export type IFilterValues = Partial<IFilterValuesConfig>;
