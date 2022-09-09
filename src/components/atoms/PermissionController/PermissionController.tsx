import React from 'react';
import { hasPermissions } from '../../../utils';

export interface IPermissionControllerProps<T extends string[]> {
  permissions: T;
  allow: T[number] | Array<T[number]>;
  children: React.ReactNode;
  noPermissionMessage?: React.ReactNode;
}

function PermissionController<T extends string[]>({
  allow,
  permissions,
  children = null,
  noPermissionMessage = null,
}: IPermissionControllerProps<T>): JSX.Element {
  return (
    <>{hasPermissions(permissions, allow) ? children : noPermissionMessage}</>
  );
}

export default PermissionController;
