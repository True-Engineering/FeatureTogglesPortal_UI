/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EditFlagForm from './EditFlagForm';

const initialFlag = {
  name: 'flag',
  description: 'text',
  environments: [],
  sprint: 'sprint 1',
};

describe('EditFlagForm корректно отрабатывает сценарии', () => {
  test('Рендер на мок данных', async () => {
    const { container } = render(
      <EditFlagForm isNewFlag onSaveChanges={() => {}} onCancel={() => {}} />,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  test('Сохраняет форму по клике на кнопку ', async () => {
    const onSaveChanges = jest.fn();
    const onCancel = jest.fn();
    const { getByText } = render(
      <EditFlagForm
        initialFlag={initialFlag}
        onSaveChanges={onSaveChanges}
        onCancel={onCancel}
      />,
    );

    fireEvent.click(getByText('Сохранить'));

    await waitFor(() => {
      expect(onSaveChanges).toBeCalledTimes(1);
      expect(onCancel).toBeCalledTimes(0);
    });
  });

  test('Отменяет сохраненение формы по клике на кнопку', async () => {
    const onSaveChanges = jest.fn();
    const onCancel = jest.fn();
    const { getByText } = render(
      <EditFlagForm
        initialFlag={initialFlag}
        onSaveChanges={onSaveChanges}
        onCancel={onCancel}
      />,
    );

    fireEvent.click(getByText('Отмена'));
    await waitFor(() => {
      expect(onSaveChanges).toBeCalledTimes(0);
      expect(onCancel).toBeCalledTimes(1);
    });
  });

  test('Не сохраняет форму, если не задано имя', async () => {
    const onSaveChanges = jest.fn();
    const onCancel = jest.fn();
    const { getByText, container } = render(
      <EditFlagForm
        isNewFlag
        onSaveChanges={onSaveChanges}
        onCancel={onCancel}
      />,
    );

    fireEvent.click(getByText('Сохранить'));

    expect(container).toMatchSnapshot();
    await waitFor(() => {
      expect(onSaveChanges).toBeCalledTimes(0);
      expect(onCancel).toBeCalledTimes(0);
    });
  });
});
