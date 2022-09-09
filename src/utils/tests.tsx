import React, { FC, ReactElement, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import {
  fireEvent,
  render,
  RenderOptions,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import store, { Context } from '../store';
import { TOOLTIP_CONTAINER_ID } from '../constants';
import i18n from '../i18nConfig';

export const selectOptionInDropdown = async (
  dropdown: HTMLElement,
  optionText: string,
) => {
  const wrapper = dropdown.parentElement?.parentElement?.parentElement;
  const selectRoot = wrapper?.parentElement;

  if (!wrapper || !selectRoot) {
    return;
  }

  fireEvent.click(wrapper);
  const utils = within(selectRoot);
  const classOption = await waitFor(() => utils.getByText(optionText));
  await waitFor(() => fireEvent.click(classOption));
};

export const clickTextInPopper = async (
  trigger: HTMLElement,
  targetText: string,
) => {
  await waitFor(() => fireEvent.click(trigger));
  const tooltips = await screen.findByTestId(TOOLTIP_CONTAINER_ID);
  if (!tooltips) {
    return;
  }
  const utils = within(tooltips as HTMLElement);
  const option = await waitFor(() => utils.getByText(targetText));
  await waitFor(() => fireEvent.click(option));
};

const AllTheProviders: FC<{ children?: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const portalNode = document.createElement('div');
    portalNode.id = TOOLTIP_CONTAINER_ID;
    portalNode.dataset.testid = TOOLTIP_CONTAINER_ID;
    document.body.appendChild(portalNode);

    return () => {
      if (portalNode.parentNode) {
        portalNode.parentNode.removeChild(portalNode);
      }
    };
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Context.Provider value={store}>{children}</Context.Provider>
    </I18nextProvider>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
