/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { nullToUndef } from '@true-engineering/true-react-api-client';
import { apiClient } from '../../../transport';
import store, { Context } from '../../../store';
import * as fixtures from '../../../transport/mocks/fixtures';
import InviteMembersToProject from './InviteMembersToProject';

beforeEach(() => apiClient.clearLogs());

const organizations = nullToUndef(fixtures.organizations);
const projectMembers = nullToUndef(fixtures.projectMembers);

apiClient.setMocks({
  requestName: 'getProjectMembers',
  fixture: projectMembers,
});

apiClient.setMocks({
  requestName: 'loadOrganizations',
  fixture: organizations,
});

apiClient.setMocks({
  requestName: 'getInviteLinkForProject',
  fixture: nullToUndef('hello-link'),
});

describe('InviteMembersToProject рендерится', () => {
  test('Рендер на мок данных', async () => {
    const { container } = render(
      <Context.Provider value={store}>
        <InviteMembersToProject
          organization={organizations[0]}
          projectId={0}
          isEditable
        />
      </Context.Provider>,
    );

    await waitFor(() => apiClient.getOrganizationMembers);

    expect(apiClient.getLoggedRequests()).toContainEqual(
      expect.objectContaining({
        name: 'getProjectMembers',
        params: { organizationId: 0, projectId: 0 },
      }),
    );

    expect(container).toMatchSnapshot();
  });

  test('Рендер на мок данных, вкладка с ожидающими подтверждение', async () => {
    const { container, getByText } = render(
      <Context.Provider value={store}>
        <InviteMembersToProject
          organization={organizations[0]}
          projectId={0}
          isEditable
        />
      </Context.Provider>,
    );

    await waitFor(() => apiClient.getOrganizationMembers);

    expect(apiClient.getLoggedRequests()).toContainEqual(
      expect.objectContaining({
        name: 'getProjectMembers',
        params: { organizationId: 0, projectId: 0 },
      }),
    );

    const tabTitle = getByText('Ожидают подтверждения');
    fireEvent.click(tabTitle);

    expect(container).toMatchSnapshot();
  });
});
