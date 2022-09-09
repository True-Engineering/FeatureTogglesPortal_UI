import { FC } from 'react';
import {
  History,
  CrossedCircleCheck,
  Swap,
  Snowflake,
  Link,
} from './components';

export const projectUniqueIcons: Record<string, FC> = {
  history: History,
  'crossed-circle-check': CrossedCircleCheck,
  swap: Swap,
  snowflake: Snowflake,
  link: Link,
};

export type IProjectUniqueIconType = keyof typeof projectUniqueIcons;
