/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { selectOptionInDropdown, customRender } from '../../../utils';
import FlagsTable from './FlagsTable';
import { flags } from './fixtures';

describe('FlagsTable корректно отрабатывает сценарии', () => {
  test('Рендер на мок данных обычный вид', () => {
    const { container } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test('Рендер на мок данных групповой вид', () => {
    const { container } = customRender(
      <FlagsTable
        isGroupView
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});

describe('FlagsTable корректно работает групировка', () => {
  test('Корректно работает группировка по фиче', async () => {
    const { getByRole } = customRender(
      <FlagsTable
        isGroupView
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const cells = getGroupNames(getByRole('table'));

    const expected = ['Sprint 67', 'todo-1', 'Без группы'];
    expect(cells).toEqual(expected);
  });
});

describe('FlagsTable корректно работают сортировки', () => {
  test('Корректно работает сортировка по описанию задачи', () => {
    const { getByText, getByRole } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const headCell = getByText('Задача');
    fireEvent.click(headCell);

    const cells = getFlagNames(getByRole('table'));

    const expected = [
      'C Flag 11',
      'C Flag 01',
      'C Flag 1',
      'C Flag 0',
      'B Flag 22',
      'B Flag 2',
      'B Flag 1',
      'B Flag',
      'A Flag 10',
      'A Flag 2',
      'A Flag 1',
    ];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает обратная сортировка по описанию задачи', () => {
    const { getByText, getByRole } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const headCell = getByText('Задача');
    fireEvent.click(headCell);
    fireEvent.click(headCell);

    const cells = getFlagNames(getByRole('table'));

    const expected = [
      'A Flag 1',
      'A Flag 2',
      'A Flag 10',
      'B Flag',
      'B Flag 1',
      'B Flag 2',
      'B Flag 22',
      'C Flag 0',
      'C Flag 01',
      'C Flag 1',
      'C Flag 11',
    ];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает сортировка по спринту', () => {
    const { getByText, getByRole } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const headCell = getByText('Спринт');
    fireEvent.click(headCell);

    const cells = getFlagNames(getByRole('table'));

    const expected = [
      'A Flag 2',
      'B Flag 2',
      'C Flag 1',
      'A Flag 1',
      'B Flag',
      'B Flag 1',
      'C Flag 0',
      'C Flag 11',
      'A Flag 10',
      'B Flag 22',
      'C Flag 01',
    ];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает сортировка по типу', () => {
    const { getAllByText, getByRole } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const headCell = getAllByText('Тип')[1];
    fireEvent.click(headCell);

    const cells = getFlagNames(getByRole('table'));

    const expected = [
      'B Flag 22',
      'A Flag 10',
      'A Flag 1',
      'C Flag 11',
      'C Flag 01',
      'B Flag',
      'B Flag 1',
      'C Flag 0',
      'A Flag 2',
      'B Flag 2',
      'C Flag 1',
    ];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает сортировка по тэгу', () => {
    const { getAllByText, getByRole } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const headCell = getAllByText('Тэг')[1];
    fireEvent.click(headCell);

    const cells = getFlagNames(getByRole('table'));
    const expected = [
      'A Flag 10',
      'B Flag 2',
      'B Flag 1',
      'B Flag',
      'C Flag 01',
      'B Flag 22',
      'A Flag 1',
      'C Flag 0',
      'C Flag 11',
      'A Flag 2',
      'C Flag 1',
    ];
    expect(cells).toEqual(expected);
  });
});

describe('FlagsTable корректно работает поиск', () => {
  test('Корректно работает поиск по имени', () => {
    const { getByRole, getByTestId } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const input = getByTestId('input-search');
    fireEvent.change(input, { target: { value: '9' } });

    const cells = getFlagNames(getByRole('table'));

    const expected = ['C Flag 1'];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает поиск по описанию', () => {
    const { getByRole, getByTestId } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const input = getByTestId('input-search');
    fireEvent.change(input, { target: { value: 'c' } });

    const cells = getFlagNames(getByRole('table'));

    const expected = ['C Flag 01', 'C Flag 0', 'C Flag 11', 'C Flag 1'];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает поиск по спринту', () => {
    const { getByRole, getByTestId } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const input = getByTestId('input-search');
    fireEvent.change(input, { target: { value: 'sprint 2' } });

    const cells = getFlagNames(getByRole('table'));

    const expected = ['C Flag 01', 'A Flag 10'];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает поиск по стратегии', () => {
    const { getByRole, getByTestId } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const input = getByTestId('input-search');
    fireEvent.change(input, { target: { value: 'he' } });

    const cells = getFlagNames(getByRole('table'));

    const expected = ['C Flag 01'];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает поиск по группе', () => {
    const { getByRole, getByTestId } = customRender(
      <FlagsTable
        isGroupView
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const input = getByTestId('input-search');
    fireEvent.change(input, { target: { value: 'to' } });

    const cells = getGroupNames(getByRole('table'));

    const expected = ['todo-1'];
    expect(cells).toEqual(expected);
  });
});

describe('FlagsTable корректно работает фильтр', () => {
  test('Корректно работает фильтр по типу', async () => {
    const { getByRole, getByTestId } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const select = getByTestId('select-type');
    await selectOptionInDropdown(select, 'Релизный');

    const cells = getFlagNames(getByRole('table'));

    const expected = ['A Flag 10', 'A Flag 1', 'C Flag 11'];
    expect(cells).toEqual(expected);
  });

  test('Корректно работает фильтр по тэгу', async () => {
    const { getByRole, getByTestId } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const select = getByTestId('select-tag');
    await selectOptionInDropdown(select, 'JFE');

    const cells = getFlagNames(getByRole('table'));

    const expected = ['B Flag 1'];
    expect(cells).toEqual(expected);
  });
});

describe('FlagsTable открывается флаг/группа', () => {
  test('По клику открывается стратегии флага', async () => {
    const { getByRole } = customRender(
      <FlagsTable
        items={flags}
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const table = getByRole('table');
    const mainRow = table.querySelector('tbody tr:nth-child(1)');
    const expandingRow = table.querySelector('tbody tr:nth-child(2)');
    if (!mainRow || !expandingRow) {
      throw new Error('no row');
    }

    expect(expandingRow.querySelector('[class^="expandedRowData"]')).toBeNull();
    fireEvent.click(mainRow);
    expect(
      expandingRow.querySelector('[class^="expandedRowData"]'),
    ).not.toBeNull();
  });

  test('По клику открывается группа флагов', async () => {
    const { getByRole } = customRender(
      <FlagsTable
        items={flags}
        isGroupView
        tableItemProps={{
          onFlagStateChange: () => {},
          onEdit: () => {},
          onEditFlagStrategy: () => {},
        }}
      />,
    );

    const table = getByRole('table');
    const mainRow = table.querySelector('tbody tr:nth-child(1)');
    if (!mainRow) {
      throw new Error('no row');
    }

    expect(mainRow.nextElementSibling?.className).toContain('groupRowHeader');
    fireEvent.click(mainRow);
    expect(mainRow.nextElementSibling?.className).toContain('rowWithAction');
  });
});

function getFlagNames(table: HTMLElement): Array<string | undefined> {
  const endText = 'Скопировать Feature Flag';

  return Array.from(table.querySelectorAll('tbody tr td:nth-child(2)')).map(c =>
    c.textContent?.slice(0, -endText.length),
  );
}

function getGroupNames(table: HTMLElement): Array<string | undefined> {
  return Array.from(table.querySelectorAll('tbody tr td:nth-child(1)')).map(
    c => c.textContent ?? undefined,
  );
}
