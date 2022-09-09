import { IFiltersPaneSearchPayload } from '@true-engineering/true-react-common-ui-kit';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type IFilterValuesConfig = {
  projectName: string;
};
export type IFilterValues = Partial<IFilterValuesConfig>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ISearchValuesConfig = {
  userName: string;
};
export type ISearchValues = IFiltersPaneSearchPayload<
  keyof ISearchValuesConfig
>;
