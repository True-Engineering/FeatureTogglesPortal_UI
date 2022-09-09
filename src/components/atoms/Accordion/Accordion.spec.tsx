import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';

const items = [
  {
    key: 1,
    title: 'Item 1',
    content: <div>Content 1</div>,
  },
  {
    key: 2,
    title: 'Item 2',
    content: <div>Content 2</div>,
  },
];

describe('Accordion корректно отрабатывает сценарии', () => {
  test('Рендер на мок данных', () => {
    const { container } = render(<Accordion items={items} />);

    expect(container).toMatchSnapshot();
  });

  test('Корректно отрабатывает клик', () => {
    const { getByText } = render(<Accordion items={items} />);

    fireEvent.click(getByText('Item 2'));
    expect(getByText('Content 2')).not.toBeNull();
  });
});
