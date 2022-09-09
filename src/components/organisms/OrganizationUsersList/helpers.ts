import { uniqArray } from '../../../utils';
import { IOrganizationMember } from '../../../types';
import { IFilterValues, ISearchValues } from './types';

export const getProjectNameOptions = (members: IOrganizationMember[]) =>
  uniqArray(
    members
      .map(({ projects }) =>
        projects.map(({ projectName }) => projectName).flat(),
      )
      .flat(),
  );

export const filterMembers = ({
  members,
  searchValue,
  filterValues,
}: {
  members: IOrganizationMember[];
  searchValue?: ISearchValues;
  filterValues?: IFilterValues;
}): IOrganizationMember[] => {
  const filterProjectNameValue = filterValues?.projectName?.toUpperCase();
  const filteredByProjectName =
    filterProjectNameValue === undefined
      ? members
      : members.filter(({ projects }) =>
          projects.some(
            ({ projectName }) =>
              projectName.toUpperCase() === filterProjectNameValue,
          ),
        );

  const searchUserNameValue = searchValue?.value?.toUpperCase();
  const filteredByUserName =
    searchUserNameValue === undefined
      ? filteredByProjectName
      : filteredByProjectName.filter(({ user }) =>
          user.userName.toUpperCase().includes(searchUserNameValue),
        );

  return filteredByUserName;
};
