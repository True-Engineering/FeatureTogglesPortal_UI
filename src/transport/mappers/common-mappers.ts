import { parseISO } from 'date-fns';
import {
  IFlag,
  IFlagChanges,
  IHistoryOfChangesListItem,
  IOrganization,
  IProject,
  IProjectEnvironment,
  IProjectEnvironmentInstance,
} from '../../types';
import {
  IRawFlag,
  IRawFlagChanges,
  IRawHistoryOfChangesListItem,
  IRawOrganization,
  IRawProject,
  IRawProjectEnvironment,
} from './types';
import { mapperFlippingStrategyFromApi } from './mapper-flipping-strategy';

export const trimStringsInObject = <T extends Record<string, any>>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (typeof v === 'object' && !Array.isArray(v) && v !== null) {
        return [k, trimStringsInObject(v)];
      }
      if (typeof v === 'string') {
        return [k, v.trim()];
      }
      return [k, v];
    }),
  ) as T;

// 'true' -> true в остальных случаях 'value' -> false
const stringToBoolean = (value: string): boolean => value === 'true';

export const mapperOrganization = ({
  projects,
  ...rest
}: IRawOrganization): IOrganization<Date> => ({
  ...rest,
  projects: projects.map(mapperProject),
});

export const mapperProject = ({
  environments,
  ...rest
}: IRawProject): IProject<Date> => ({
  ...rest,
  environments: environments.map(mapperProjectEnvironment),
});

export const mapperProjectEnvironment = ({
  instances,
  properties,
  emails,
  ...rest
}: IRawProjectEnvironment): IProjectEnvironment<Date> => ({
  ...rest,
  instances: instances.map(mapperEnvironmentInstance),
  emails: emails ?? [],
  freezingEnable:
    properties?.FREEZING_ENABLE !== undefined
      ? stringToBoolean(properties?.FREEZING_ENABLE)
      : false,
  freezingUser: properties?.FREEZING_USER,
  freezingEndTime: properties?.FREEZING_END_TIME
    ? new Date(properties?.FREEZING_END_TIME)
    : undefined,
});

export const mapperEnvironmentInstance = ({
  updated,
  ...rest
}: IProjectEnvironmentInstance<string>): IProjectEnvironmentInstance<Date> => ({
  ...rest,
  updated: updated === undefined ? undefined : parseISO(updated),
});

export const mapperFlag = ({
  uid,
  description,
  type,
  tags,
  sprint,
  group,
  environments,
}: IRawFlag): IFlag => ({
  name: uid,
  description: description ?? '',
  sprint: sprint ?? '',
  type,
  tag: (tags ?? [])[0],
  group: group ?? '',
  environments: (environments ?? []).map(
    ({ flippingStrategy, enable, permissions = [], ...restEnv }) => ({
      ...restEnv,
      permissions,
      isEnabled: enable,
      flippingStrategy:
        flippingStrategy === undefined
          ? undefined
          : mapperFlippingStrategyFromApi(flippingStrategy),
    }),
  ),
});

const mapperChanges = ({
  uid,
  environments,
  tags,
  ...rest
}: IRawFlagChanges): IFlagChanges => ({
  tag:
    tags !== undefined
      ? {
          old: (tags.old ?? []).join(', '),
          new: (tags.new ?? []).join(', '),
        }
      : undefined,
  ...rest,
});

export const historyOfChangesListItemMapper = ({
  id,
  action,
  userName,
  featureFlag,
  environment,
  time,
  changes,
  creationInfo,
}: IRawHistoryOfChangesListItem): IHistoryOfChangesListItem => ({
  id,
  action,
  userName,
  featureFlag: {
    ...mapperFlag(featureFlag),
    tag: (featureFlag.tags ?? []).join(', '),
  },
  environment,
  time: new Date(time),
  changes: changes !== undefined ? mapperChanges(changes) : {},
  creationInfo:
    creationInfo !== undefined
      ? {
          ...mapperFlag(creationInfo),
          tag: (creationInfo.tags ?? []).join(', '),
        }
      : undefined,
});
