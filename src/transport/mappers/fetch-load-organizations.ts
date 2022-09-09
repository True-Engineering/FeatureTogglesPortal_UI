import { IOrganization } from '../../types';
import { IRawOrganization } from './types';
import { mapperOrganization } from './common-mappers';

export type IFetchLoadOrganizationsResponse = IOrganization[];

export type IFetchLoadOrganizationsResponseRaw = IRawOrganization[];

export const fetchLoadOrganizations = (
  response: IFetchLoadOrganizationsResponseRaw,
): IFetchLoadOrganizationsResponse => response.map(mapperOrganization);
