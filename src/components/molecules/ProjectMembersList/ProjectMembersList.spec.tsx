/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, within } from '@testing-library/react';
import { nullToUndef } from '@true-engineering/true-react-api-client';
import { clickTextInPopper, customRender } from '../../../utils';
import mappers from '../../../transport/mappers';
import { projectMembers as fixture } from '../../../transport/mocks/fixtures';
import ProjectMembersList from './ProjectMembersList';

const allUsers = mappers.fetchGetProjectMembers(nullToUndef(fixture));
const activeUsers = allUsers.filter(({ user }) => user.status === 'ACTIVE');

describe('ProjectMembersList рендерится', () => {
  test('Рендер на мок данных', async () => {
    const { container } = render(
      <ProjectMembersList users={activeUsers} isEditable />,
    );

    expect(container).toMatchSnapshot();
  });

  test('Рендер на мок данных, без колонки с именем', async () => {
    const { container } = render(
      <ProjectMembersList
        users={activeUsers}
        hasNameColumn={false}
        isEditable
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test('Рендер на мок данных, без возможности редактировать', async () => {
    const { container } = render(
      <ProjectMembersList users={activeUsers} isEditable={false} />,
    );

    expect(container).toMatchSnapshot();
  });
});

describe('ProjectMembersList корректно отрабатывает основные сценарии', () => {
  test('Меняется роль на весь проект', async () => {
    const onChangeProjectPermission = jest.fn();
    const { container } = await customRender(
      <ProjectMembersList
        users={activeUsers}
        isEditable
        onChangeProjectPermission={onChangeProjectPermission}
      />,
    );

    const row = container.querySelectorAll('[class^="row"]')[0];
    const utils = within(row as HTMLElement);
    const dropdown = await utils.getByText('Админ');
    await clickTextInPopper(dropdown, 'Участник');
    expect(onChangeProjectPermission).toBeCalledTimes(1);
  });

  test('Меняется роль на конкретном окружении', async () => {
    const onChangeEnvironmentPermission = jest.fn();
    const { container } = await customRender(
      <ProjectMembersList
        users={activeUsers}
        isEditable
        onChangeEnvironmentPermission={onChangeEnvironmentPermission}
      />,
    );

    const row = container.querySelectorAll('[class^="row"]')[2];
    const utils = within(row as HTMLElement);
    const dropdown = await utils.getByTestId('dropdown-env-role-0');
    await clickTextInPopper(dropdown, 'Чтение');
    expect(onChangeEnvironmentPermission).toBeCalledTimes(1);
  });

  test('Происходит вызов функции удаления по клику на кнопку "Удалить"', async () => {
    const onDeleteUserFromProject = jest.fn();
    const { container } = await customRender(
      <ProjectMembersList
        users={activeUsers}
        isEditable
        onDeleteUserFromProject={onDeleteUserFromProject}
      />,
    );

    const row = container.querySelectorAll('[class^="row"]')[2];
    const utils = within(row as HTMLElement);
    const removeButton = await utils.getByTestId('button-remove');
    await clickTextInPopper(removeButton, 'Удалить');
    expect(onDeleteUserFromProject).toBeCalledTimes(1);
  });
});
