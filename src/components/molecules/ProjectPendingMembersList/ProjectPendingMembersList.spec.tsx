/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { nullToUndef } from '@true-engineering/true-react-api-client';
import mappers from '../../../transport/mappers';
import { projectMembers as fixture } from '../../../transport/mocks/fixtures';
import ProjectPendingMembersList from './ProjectPendingMembersList';

const allUsers = mappers.fetchGetProjectMembers(nullToUndef(fixture));
const pendingUsers = allUsers.filter(({ user }) => user.status === 'PENDING');

describe('ProjectPendingList рендерится', () => {
  test('Рендер на мок данных', () => {
    const { container } = render(
      <ProjectPendingMembersList
        users={pendingUsers}
        onAcceptUser={() => {}}
        onRejectUser={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});

describe('ProjectPendingList корректно отрабатывает сценарии', () => {
  test('Вызывается onAcceptUser по клику на кнопку "Принять"', async () => {
    const onAcceptUser = jest.fn();
    const { findAllByText } = render(
      <ProjectPendingMembersList
        users={pendingUsers}
        onAcceptUser={onAcceptUser}
        onRejectUser={() => {}}
      />,
    );

    const acceptButton = await findAllByText('Принять');
    fireEvent.click(acceptButton[0]);

    expect(onAcceptUser).toBeCalledTimes(1);
  });

  test('Вызывается onRejectUser по клику на кнопку "Отклонить"', async () => {
    const onRejectUser = jest.fn();
    const { findAllByText } = render(
      <ProjectPendingMembersList
        users={pendingUsers}
        onAcceptUser={() => {}}
        onRejectUser={onRejectUser}
      />,
    );

    const acceptButton = await findAllByText('Отклонить');
    fireEvent.click(acceptButton[0]);

    expect(onRejectUser).toBeCalledTimes(1);
  });
});
