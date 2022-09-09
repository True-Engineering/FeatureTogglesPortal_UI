import { SetStateAction } from 'react';
import {
  IFormValuesBlurHandler,
  IFormValuesChangeHandler,
  IOrganization,
  IProject,
  IProjectEnvironment,
} from '../types';

export const uniqArray = <T>(arr: T[]): T[] => [...new Set(arr)];

export const sortById = <T extends { id: number }>(arr: T[]): T[] =>
  [...arr].sort((a, b) => a.id - b.id);

export const range = (n: number): number[] =>
  Array.from(Array(n)).map((_, index) => index);

export const checkIsOrganizationExist = (
  organization?: IOrganization,
): organization is IOrganization => {
  if (organization === undefined) {
    console.error('no organization');
    return false;
  }
  return true;
};

export const checkIsProjectExist = (
  project?: IProject,
): project is IProject => {
  if (project === undefined) {
    console.error('no project');
    return false;
  }
  return true;
};

export const getChangeFormHandler = <Values>(
  onChange: (v: SetStateAction<Values>) => void,
): IFormValuesChangeHandler<Values> => field => value => {
  onChange((prevValues: Values) => ({
    ...prevValues,
    [field]:
      typeof value === 'function'
        ? // TODO удалить unknown когда бампнешь TS
          ((value as unknown) as (
            prevValue: Values[keyof Values],
          ) => Values[keyof Values])(prevValues[field])
        : value,
  }));
};

export const getBlurFormHandler = <Values>(
  onBlur: (v: SetStateAction<Values>) => void,
): IFormValuesBlurHandler<Values> => field => () => {
  onBlur((prevValues: Values) => ({
    ...prevValues,
    [field]: true,
  }));
};

export const isStringNotEmpty = (value: string | undefined): value is string =>
  value !== undefined && value.trim() !== '';

export const isNotEmpty = <T>(val: T | null | undefined): val is T =>
  // Убрать когда обновится TS
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  val !== undefined && val !== null && val !== '';

export const isArrayNotEmpty = <T>(array?: T[]): array is T[] =>
  (array ?? []).length > 0;

export const convertEnvironmentToString = (
  v?: IProjectEnvironment,
): string | undefined => v?.name;

export const hasPermissions = <T extends string[]>(
  permissions: T,
  allow: T[number] | Array<T[number]>,
): boolean =>
  Array.isArray(allow)
    ? permissions.some(p => allow.includes(p))
    : permissions.includes(allow);
