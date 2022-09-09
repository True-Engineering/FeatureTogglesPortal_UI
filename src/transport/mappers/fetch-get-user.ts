import { parseISO } from 'date-fns';
import { IUser } from '../../types';

export type IFetchGetUserResponse = IUser;

export type IFetchGetUserResponseRaw = IUser<string>;

export const fetchGetUser = ({
  lastLogin,
  ...rest
}: IFetchGetUserResponseRaw): IFetchGetUserResponse => ({
  ...rest,
  lastLogin: lastLogin === undefined ? undefined : parseISO(lastLogin),
});
