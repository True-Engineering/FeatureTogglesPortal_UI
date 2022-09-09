import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PermissionController from './PermissionController';

const allPermissions = ['READ', 'EDIT'] as const;
type IPermission = typeof allPermissions[number];

describe('PermissionController корректно отрабатывает сценарии', () => {
  test('Есть права', () => {
    const { queryByText } = render(
      <PermissionController
        allow="EDIT"
        permissions={['READ', 'EDIT'] as IPermission[]}
      >
        hello world
      </PermissionController>,
    );

    expect(queryByText('hello world')).toBeInTheDocument();
  });

  test('Нет прав', () => {
    const { queryByText } = render(
      <PermissionController
        allow="EDIT"
        permissions={['READ'] as IPermission[]}
      >
        bye world
      </PermissionController>,
    );

    expect(queryByText('bye world')).not.toBeInTheDocument();
  });
});
