import { TOOLTIP_CONTAINER_ID } from '../constants';

export const useTooltipsContainer = (): HTMLElement =>
  document.getElementById(TOOLTIP_CONTAINER_ID) ?? document.body;
