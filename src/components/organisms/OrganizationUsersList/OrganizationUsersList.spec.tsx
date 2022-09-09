/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { nullToUndef } from '@true-engineering/true-react-api-client';
import { clickTextInPopper, customRender } from '../../../utils';
import { apiClient } from '../../../transport';
import store, { Context } from '../../../store';
import * as fixtures from '../../../transport/mocks/fixtures';
import OrganizationUsersList from './OrganizationUsersList';

beforeEach(() => apiClient.clearLogs());

const organizations = nullToUndef(fixtures.organizations);
const members = nullToUndef(fixtures.organizationMembers);

apiClient.setMocks({
  requestName: 'getOrganizationMembers',
  fixture: members,
});

apiClient.setMocks({
  requestName: 'loadOrganizations',
  fixture: organizations,
});

apiClient.setMocks({
  requestName: 'deleteOrganizationMember',
  fixture: true,
});

describe('OrganizationUsersList рендерится', () => {
  test('Рендер на мок данных', async () => {
    const { container } = await render(
      <Context.Provider value={store}>
        <OrganizationUsersList organizationId={0} projects={[]} />
      </Context.Provider>,
    );

    await waitFor(() => apiClient.getOrganizationMembers);

    expect(apiClient.getLoggedRequests()).toContainEqual(
      expect.objectContaining({
        name: 'getOrganizationMembers',
      }),
    );

    expect(container).toMatchSnapshot();
  });
});

describe('OrganizationUsersList корректно отрабатывает сценарии', () => {
  test('Корректно фильтруется по имени', async () => {
    const { getByTestId, container } = render(
      <Context.Provider value={store}>
        <OrganizationUsersList organizationId={0} projects={[]} />
      </Context.Provider>,
    );

    await waitFor(() => apiClient.getOrganizationMembers);

    const input = getByTestId('filterspane-search-input-input');
    fireEvent.change(input, { target: { value: 'се' } });

    const names = Array.from(
      container.querySelectorAll('[class^="userName"]'),
    ).map(cell => cell.innerHTML);
    const expected = ['Семен Гусев', 'Сергей Антонов'];

    expect(names).toEqual(expected);
  });

  test('Корректно фильтруется по проекту', async () => {
    const { getByTestId, container } = await customRender(
      <OrganizationUsersList organizationId={0} projects={[]} />,
    );

    await waitFor(() => apiClient.getOrganizationMembers);

    const select = getByTestId('filterspane-filter-projectName');
    fireEvent.click(select.childNodes[0]);

    const utils = within(select);
    const option = await utils.getByText('NBA');
    fireEvent.click(option);

    const expected = ['Кент Кларк', 'Сергей Антонов'];
    const names = Array.from(
      container.querySelectorAll('[class^="userName"]'),
    ).map(cell => cell.innerHTML);

    expect(names).toEqual(expected);
  });

  // Тест падает с ошибкой в пайплайне и на некоторых версиях библиотек (не выявлено на каких)
  test.skip('Отправляет запрос на удаление по нажатию на кнопку удалить', async () => {
    const { container } = await customRender(
      <OrganizationUsersList organizationId={0} isEditable projects={[]} />,
    );

    await waitFor(() => apiClient.getOrganizationMembers);

    const row = container.querySelectorAll('[class^="header"]')[0];
    const utils = within(row as HTMLElement);
    const removeButton = utils.getByRole('button');
    await clickTextInPopper(removeButton, 'Удалить');

    await waitFor(() => apiClient.deleteOrganizationMember);

    const lastLogRequest = apiClient.getLoggedRequests().slice(-1)[0];
    expect(lastLogRequest.name).toBe('deleteOrganizationMember');
  });

  test('Корректная работа кнопки "Добавить проект"', async () => {
    const { getByText } = await customRender(
      <OrganizationUsersList
        organizationId={0}
        projects={organizations[0].projects}
        isEditable
      />,
    );

    await waitFor(() => apiClient.getOrganizationMembers);

    const name = await getByText('Сергей Антонов');
    fireEvent.click(name);

    const addButton = await getByText('Добавить проект');
    await clickTextInPopper(addButton, 'Cool project');

    await waitFor(() => apiClient.editMemberProjectPermission);

    const lastLogRequest = apiClient.getLoggedRequests().slice(-1)[0];
    expect(lastLogRequest.name).toBe('editMemberProjectPermission');
  });
});
