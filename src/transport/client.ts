import i18next from 'i18next';
import ApiClient, {
  IRequestOptions,
  RequestNames,
} from '@true-engineering/true-react-common-api-client';
import store from '../store';
import {
  IEnvironmentId,
  IFlag,
  IFlippingStrategy,
  IInviteUuid,
  IOrganizationId,
  IProjectId,
} from '../types';
import { environments, environmentConfig } from '../environment-config';
import apiConfig from './config';
import mappers, {
  IFetchCreateProject,
  IFetchDeleteFlagRequestParams,
  IFetchEnableFlagRequestParams,
  IFetchGetProjectRequestParams,
  IFetchLoadFlagsRequestParams,
  IFetchLoadProjectsRequestParams,
  IFetchDeleteProjectRequestParams,
  IFetchEditProject,
  IFetchLoadEnvironmentsRequestParams,
  IFetchCreateEnvironment,
  IFetchGetEnvironmentRequestParams,
  IFetchEditEnvironment,
  IFetchDeleteEnvironmentRequestParams,
  IFetchUpdateEnvironmentTokenRequestParams,
  IFetchUpdateEnvironmentTokenResponse,
  IFetchDeleteEnvironmentInstanceRequestParams,
  IFetchInviteLinkForProject,
  IFetchInviteLinkForProjectResponse,
  IFetchMarkDefaultProject,
  IFetchInvite,
  IFetchGetOrganizationMembersRequestParams,
  IFetchGetProjectMembersRequestParams,
  IFetchDeleteOrganizationMemberRequestParams,
  IFetchDeleteProjectMemberRequestParams,
  IFetchActivateUserRequestParams,
  IFetchEditMemberEnvironmentPermissionRequestParams,
  IFetchEditMemberEnvironmentPermissionRequestBody,
  IFetchEditMemberProjectPermissionRequestParams,
  IFetchEditMemberProjectPermissionRequestBody,
  IFetchDownloadFlagsFileRequestParams,
  IFetchGetCompareEnvironmentsStateRequest,
  IFetchGetCompareEnvironmentsStateResponse,
  IFetchUpdateEnvironmentNotificationsBodyRequestRaw,
  IFetchUpdateEnvironmentNotificationsQueryRequest,
  IFetchUpdateFlagsStateQueryRequest,
  IFetchUpdateFlagsStateBodyRequest,
  IFetchGetTagsForFilterParams,
  IFetchGetUsersForFilterParams,
  IFetchGetFeatureFlagsForFilterParams,
  IRawFetchGetHistoryRequestParams,
  IRawFetchFreezeFeatureFlagsRequestParams,
  IFetchUnfreezeFeatureFlagsRequestParams,
  IFetchFreezeFeatureFlagsResponseRaw,
  IFetchUnfreezeFeatureFlagsResponseRaw,
} from './mappers';
// #if process.env.NODE_ENV !== 'production'
import mocks from './mocks';

// #endif

const PORTAL_VERSION_HEADER_NAME = 'ff-portal-version';

export class FFClient extends ApiClient<typeof apiConfig> {
  public freezeFeatureFlags(
    params: IRawFetchFreezeFeatureFlagsRequestParams,
  ): Promise<IFetchFreezeFeatureFlagsResponseRaw> {
    return this.createRequestWithAuth({
      name: 'freezeFeatureFlags',
      params: mappers.fetchFreezeFeatureFlagsRequestParamsMapper(params),
    });
  }

  public unfreezeFeatureFlags(
    params: IFetchUnfreezeFeatureFlagsRequestParams,
  ): Promise<IFetchUnfreezeFeatureFlagsResponseRaw> {
    return this.createRequestWithAuth({
      name: 'unfreezeFeatureFlags',
      params,
    });
  }

  public getCompareEnvironmentsState(
    params: IFetchGetCompareEnvironmentsStateRequest,
  ): Promise<IFetchGetCompareEnvironmentsStateResponse> {
    return this.createRequestWithAuth({
      name: 'getCompareEnvironmentsState',
      params,
      mapper: mappers.fetchGetCompareEnvironmentsState,
    });
  }

  public updateEnvironmentNotifications(
    params: IFetchUpdateEnvironmentNotificationsQueryRequest,
    body: IFetchUpdateEnvironmentNotificationsBodyRequestRaw,
  ): Promise<void> {
    return this.createRequestWithAuth({
      name: 'updateEnvironmentNotifications',
      params,
      body: mappers.fetchUpdateEnvironmentNotificationsBodyRequest(body),
    });
  }

  public updateFlagsState(
    params: IFetchUpdateFlagsStateQueryRequest,
    body: IFetchUpdateFlagsStateBodyRequest,
  ): Promise<IFetchGetCompareEnvironmentsStateResponse> {
    return this.createRequestWithAuth({
      name: 'updateFlagsState',
      params,
      body,
    });
  }

  public getHistoryOfChanges(
    params: IRawFetchGetHistoryRequestParams,
  ): Promise<ReturnType<typeof mappers.fetchGetHistoryOfChanges>> {
    return this.createRequestWithAuth({
      name: 'getHistoryOfChanges',
      params: mappers.fetchGetHistoryOfChangesParamsMapper(params),
      mapper: mappers.fetchGetHistoryOfChanges,
    });
  }

  public getFeatureFlagsForFilters({
    organizationId,
    projectId,
    template,
    page,
    pageSize,
  }: IFetchGetFeatureFlagsForFilterParams): Promise<
    ReturnType<typeof mappers.fetchGetFeatureFlagsForFilters>
  > {
    return this.createRequestWithAuth({
      name: 'getFeatureFlagsForFilters',
      params: { organizationId, projectId, template, page, pageSize },
      mapper: mappers.fetchGetFeatureFlagsForFilters,
    });
  }

  public getUsersForFilters({
    organizationId,
    projectId,
    template,
    page,
    pageSize,
  }: IFetchGetUsersForFilterParams): Promise<
    ReturnType<typeof mappers.fetchGetUsersForFilters>
  > {
    return this.createRequestWithAuth({
      name: 'getUsersForFilters',
      params: { organizationId, projectId, template, page, pageSize },
      mapper: mappers.fetchGetUsersForFilters,
    });
  }

  public getTagsForFilters({
    organizationId,
    projectId,
    page,
    pageSize,
  }: IFetchGetTagsForFilterParams): Promise<
    ReturnType<typeof mappers.fetchGetTagsForFilters>
  > {
    return this.createRequestWithAuth({
      name: 'getTagsForFilters',
      params: { organizationId, projectId, page, pageSize },
      mapper: mappers.fetchGetTagsForFilters,
    });
  }

  public getUser = (): Promise<ReturnType<typeof mappers.fetchGetUser>> =>
    this.createRequestWithAuth({
      name: 'getUser',
      mapper: mappers.fetchGetUser,
    });

  public loadFlags = ({
    organizationId,
    projectId,
  }: IFetchLoadFlagsRequestParams): Promise<
    ReturnType<typeof mappers.fetchLoadFlags>
  > =>
    this.createRequestWithAuth({
      name: 'loadFlags',
      params: { organizationId, projectId },
      mapper: mappers.fetchLoadFlags,
    });

  public enableFlag = async ({
    organizationId,
    projectId,
    flagName,
    environmentId,
  }: IFetchEnableFlagRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'enableFlag',
      params: {
        organizationId,
        projectId,
        flagName,
        environmentId,
      },
    });
    return true;
  };

  public disableFlag = async ({
    organizationId,
    projectId,
    flagName,
    environmentId,
  }: IFetchEnableFlagRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'disableFlag',
      params: {
        organizationId,
        projectId,
        flagName,
        environmentId,
      },
    });
    return true;
  };

  public createFlag = ({
    organizationId,
    projectId,
    flag,
  }: {
    organizationId: IOrganizationId;
    projectId: IProjectId;
    flag: IFlag;
  }): Promise<ReturnType<typeof mappers.fetchCreateFlag>> =>
    this.createRequestWithAuth({
      name: 'createFlag',
      params: {
        organizationId,
        projectId,
        flagName: flag.name.trim(),
      },
      body: mappers.fetchCreateFlagRequestMapper(flag),
      mapper: mappers.fetchCreateFlag,
    });

  public editFlag = ({
    organizationId,
    projectId,
    flag,
  }: {
    organizationId: IOrganizationId;
    projectId: IProjectId;
    flag: IFlag;
  }): Promise<ReturnType<typeof mappers.fetchEditFlag>> =>
    this.createRequestWithAuth({
      name: 'editFlag',
      params: {
        organizationId,
        projectId,
        flagName: flag.name,
      },
      body: mappers.fetchEditFlagRequestMapper(flag),
      mapper: mappers.fetchEditFlag,
    });

  public editFlagStrategy = ({
    organizationId,
    projectId,
    flagName,
    environmentId,
    flippingStrategy,
  }: {
    organizationId: IOrganizationId;
    projectId: IProjectId;
    flagName: IFlag['name'];
    environmentId: IEnvironmentId;
    flippingStrategy?: IFlippingStrategy;
  }): Promise<ReturnType<typeof mappers.fetchEditFlagStrategy>> =>
    this.createRequestWithAuth({
      name: 'editFlagStrategy',
      params: {
        organizationId,
        projectId,
        flagName,
        environmentId,
      },
      body:
        flippingStrategy === undefined
          ? undefined
          : mappers.fetchEditFlagStrategyRequestMapper(flippingStrategy),
      mapper: mappers.fetchEditFlagStrategy,
    });

  public deleteFlag = async ({
    organizationId,
    projectId,
    flagName,
  }: IFetchDeleteFlagRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'deleteFlag',
      params: { organizationId, projectId, flagName },
    });
    return true;
  };

  public downloadFlagsFile = async ({
    organizationId,
    projectId,
  }: IFetchDownloadFlagsFileRequestParams): Promise<Blob> => {
    const response = await this.createRequestWithAuth({
      name: 'downloadFlagsFile',
      params: { organizationId, projectId },
    });

    const blob = new Blob([JSON.stringify(response)], {
      type: 'text/plain;charset=utf-8',
    });

    return blob;
  };

  public uploadFlagsFile = async ({
    organizationId,
    projectId,
    file,
  }: {
    organizationId: IOrganizationId;
    projectId: IProjectId;
    file: File;
  }): Promise<boolean> => {
    const formData = new FormData();
    formData.append('file', file);

    await this.createRequestWithAuth({
      name: 'uploadFlagsFile',
      params: { organizationId, projectId },
      body: formData,
    });
    return true;
  };

  public fetchSyncPortalsInfo = async ({
    organizationId,
    projectId,
    file,
  }: {
    organizationId: IOrganizationId;
    projectId: IProjectId;
    file: File;
  }): Promise<ReturnType<typeof mappers.fetchSyncPortalsInfo>> => {
    const formData = new FormData();
    formData.append('file', file);

    return this.createRequestWithAuth({
      name: 'syncPortalsInfo',
      params: { organizationId, projectId },
      body: formData,
      mapper: mappers.fetchSyncPortalsInfo,
    });
  };

  public fetchSyncPortalsUpload = async ({
    organizationId,
    projectId,
    fileKey,
    shouldBeRemoved,
  }: {
    organizationId: IOrganizationId;
    projectId: IProjectId;
    fileKey: string;
    shouldBeRemoved: boolean;
  }): Promise<ReturnType<typeof mappers.fetchSyncPortalsUpload>> =>
    this.createRequestWithAuth({
      name: 'syncPortalsUpload',
      params: {
        organizationId,
        projectId,
        key: fileKey,
        needToDelete: String(shouldBeRemoved),
      },
      mapper: mappers.fetchSyncPortalsUpload,
    });

  public fetchSyncEnvironmentsInfo = async ({
    organizationId,
    projectId,
    file,
  }: {
    organizationId: IOrganizationId;
    projectId: IProjectId;
    file: File;
  }): Promise<ReturnType<typeof mappers.fetchSyncEnvironmentsInfo>> => {
    const formData = new FormData();
    formData.append('file', file);

    return this.createRequestWithAuth({
      name: 'syncEnvironmentsInfo',
      params: { organizationId, projectId },
      body: formData,
      mapper: mappers.fetchSyncEnvironmentsInfo,
    });
  };

  public fetchSyncEnvironmentsUpload = async ({
    organizationId,
    projectId,
    fileKey,
    src,
    dest,
  }: {
    organizationId: IOrganizationId;
    projectId: IProjectId;
    fileKey: string;
    src: string;
    dest: string[];
  }): Promise<ReturnType<typeof mappers.fetchSyncEnvironmentsUpload>> =>
    this.createRequestWithAuth({
      name: 'syncEnvironmentsUpload',
      params: {
        organizationId,
        projectId,
        key: fileKey,
      },
      body: {
        src,
        dest,
      },
      mapper: mappers.fetchSyncEnvironmentsUpload,
    });

  public loadOrganizations = async (): Promise<
    ReturnType<typeof mappers.fetchLoadOrganizations>
  > =>
    this.createRequestWithAuth({
      name: 'loadOrganizations',
      mapper: mappers.fetchLoadOrganizations,
    });

  public loadProjects = async ({
    organizationId,
  }: IFetchLoadProjectsRequestParams): Promise<
    ReturnType<typeof mappers.fetchLoadProjects>
  > =>
    this.createRequestWithAuth({
      name: 'loadProjects',
      params: { organizationId },
      mapper: mappers.fetchLoadProjects,
    });

  public createProject = ({
    organizationId,
    project,
  }: {
    organizationId: IOrganizationId;
    project: IFetchCreateProject;
  }): Promise<ReturnType<typeof mappers.fetchCreateProject>> =>
    this.createRequestWithAuth({
      name: 'createProject',
      params: { organizationId },
      body: mappers.fetchCreateProjectRequestMapper(project),
      mapper: mappers.fetchCreateProject,
    });

  public getProject = async ({
    organizationId,
    projectId,
  }: IFetchGetProjectRequestParams): Promise<
    ReturnType<typeof mappers.fetchGetProject>
  > =>
    this.createRequestWithAuth({
      name: 'getProject',
      params: { organizationId, projectId },
      mapper: mappers.fetchGetProject,
    });

  public editProject = async ({
    organizationId,
    project: { id: projectId, ...body },
  }: {
    organizationId: IOrganizationId;
    project: IFetchEditProject & { id: IProjectId };
  }): Promise<ReturnType<typeof mappers.fetchEditProject>> =>
    this.createRequestWithAuth({
      name: 'editProject',
      params: { organizationId, projectId },
      body: mappers.fetchEditProjectRequestMapper(body),
      mapper: mappers.fetchEditProject,
    });

  public markDefaultProject = async ({
    organizationId,
    project: { id: projectId, ...body },
  }: {
    organizationId: IOrganizationId;
    project: IFetchMarkDefaultProject & { id: IProjectId };
  }): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'markDefaultProject',
      params: { organizationId, projectId },
      body,
    });
    return true;
  };

  public deleteProject = async ({
    organizationId,
    projectId,
  }: IFetchDeleteProjectRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'deleteProject',
      params: { organizationId, projectId },
    });
    return true;
  };

  public getInviteLinkForProject = async ({
    organizationId,
    projectId,
  }: IFetchInviteLinkForProject): Promise<IFetchInviteLinkForProjectResponse> => {
    const uuid: IInviteUuid = await this.createRequestWithAuth({
      name: 'getInviteLinkForProject',
      params: { organizationId, projectId },
    });
    return `${location.origin}/invite/${uuid}`;
  };

  public fetchInvite = async ({ uuid }: IFetchInvite): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'fetchInvite',
      params: { uuid },
    });

    return true;
  };

  public loadEnvironments = async ({
    projectId,
  }: IFetchLoadEnvironmentsRequestParams): Promise<
    ReturnType<typeof mappers.fetchLoadEnvironments>
  > =>
    this.createRequestWithAuth({
      name: 'loadEnvironments',
      params: { projectId },
      mapper: mappers.fetchLoadEnvironments,
    });

  public createEnvironment = ({
    projectId,
    environment,
  }: {
    projectId: IOrganizationId;
    environment: IFetchCreateEnvironment;
  }): Promise<ReturnType<typeof mappers.fetchCreateEnvironment>> =>
    this.createRequestWithAuth({
      name: 'createEnvironment',
      params: { projectId },
      body: mappers.fetchCreateEnvironmentRequestMapper(environment),
      mapper: mappers.fetchCreateEnvironment,
    });

  public getEnvironment = async ({
    projectId,
    environmentId,
  }: IFetchGetEnvironmentRequestParams): Promise<
    ReturnType<typeof mappers.fetchGetEnvironment>
  > =>
    this.createRequestWithAuth({
      name: 'getEnvironment',
      params: { projectId, environmentId },
      mapper: mappers.fetchGetEnvironment,
    });

  public editEnvironment = async ({
    projectId,
    environment: { id: environmentId, ...body },
  }: {
    projectId: IProjectId;
    environment: IFetchEditEnvironment & { id: IEnvironmentId };
  }): Promise<ReturnType<typeof mappers.fetchEditEnvironment>> =>
    this.createRequestWithAuth({
      name: 'editEnvironment',
      params: { projectId, environmentId },
      body: mappers.fetchEditEnvironmentRequestMapper(body),
      mapper: mappers.fetchEditEnvironment,
    });

  public deleteEnvironment = async ({
    projectId,
    environmentId,
  }: IFetchDeleteEnvironmentRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'deleteEnvironment',
      params: { projectId, environmentId },
    });
    return true;
  };

  public updateEnvironmentToken = async ({
    projectId,
    environmentId,
  }: IFetchUpdateEnvironmentTokenRequestParams): Promise<IFetchUpdateEnvironmentTokenResponse> =>
    this.createRequestWithAuth({
      name: 'updateEnvironmentToken',
      params: { projectId, environmentId },
    });

  public deleteEnvironmentInstance = async ({
    projectId,
    environmentId,
    instanceId,
  }: IFetchDeleteEnvironmentInstanceRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'deleteEnvironmentInstance',
      params: { projectId, environmentId, instanceId },
    });
    return true;
  };

  public getOrganizationMembers = async ({
    organizationId,
  }: IFetchGetOrganizationMembersRequestParams): Promise<
    ReturnType<typeof mappers.fetchGetOrganizationMembers>
  > =>
    this.createRequestWithAuth({
      name: 'getOrganizationMembers',
      params: { organizationId },
      mapper: mappers.fetchGetOrganizationMembers,
    });

  public getProjectMembers = async ({
    organizationId,
    projectId,
  }: IFetchGetProjectMembersRequestParams): Promise<
    ReturnType<typeof mappers.fetchGetProjectMembers>
  > =>
    this.createRequestWithAuth({
      name: 'getProjectMembers',
      params: { organizationId, projectId },
      mapper: mappers.fetchGetProjectMembers,
    });

  public deleteOrganizationMember = async ({
    organizationId,
    userId,
  }: IFetchDeleteOrganizationMemberRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'deleteOrganizationMember',
      params: { organizationId, userId },
    });
    return true;
  };

  public deleteProjectMember = async ({
    organizationId,
    projectId,
    userId,
  }: IFetchDeleteProjectMemberRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'deleteProjectMember',
      params: { organizationId, projectId, userId },
    });
    return true;
  };

  public editMemberProjectPermission = async ({
    organizationId,
    projectId,
    userId,
    role,
  }: IFetchEditMemberProjectPermissionRequestParams &
    IFetchEditMemberProjectPermissionRequestBody): Promise<
    ReturnType<typeof mappers.fetchEditMemberProjectPermission>
  > =>
    this.createRequestWithAuth({
      name: 'editMemberProjectPermission',
      params: { organizationId, projectId, userId },
      body: { role },
      mapper: mappers.fetchEditMemberProjectPermission,
    });

  public editMemberEnvironmentPermission = async ({
    organizationId,
    projectId,
    userId,
    environmentRole,
    environmentId,
  }: IFetchEditMemberEnvironmentPermissionRequestParams &
    IFetchEditMemberEnvironmentPermissionRequestBody): Promise<
    ReturnType<typeof mappers.fetchEditMemberEnvironmentPermission>
  > =>
    this.createRequestWithAuth({
      name: 'editMemberEnvironmentPermission',
      params: { organizationId, projectId, userId },
      body: { environmentRole, environmentId },
      mapper: mappers.fetchEditMemberEnvironmentPermission,
    });

  public activateUser = async ({
    userId,
    projectId,
  }: IFetchActivateUserRequestParams): Promise<boolean> => {
    await this.createRequestWithAuth({
      name: 'activateUser',
      params: { userId, projectId },
    });
    return true;
  };

  private createRequestWithAuth = <R, P>(
    body: IRequestOptions<typeof apiConfig, R, P>,
  ): Promise<P> =>
    // @ts-ignore (parameter) e: any
    this.createRequest(body).catch(e => {
      if (e.response && e.response.status === 401) {
        return this.auth().then(() => Promise.reject(e));
      }

      if (e.response && e.response.status === 403) {
        store.techStore.addToaster({
          type: 'error',
          text: i18next.t('operationNotAllow'),
          errorResponse: e.response?.data,
        });
      }

      return Promise.reject(e);
    });

  private auth = () => store.signIn();
}

// @ts-ignore TS6133
function checkMocks<P extends RequestNames<typeof apiConfig>, T>(
  mocksObject: Record<P, T>,
) {
  return mocksObject;
}

const apiClient = new FFClient({
  apiConfig,
  environmentConfig,
  environments,
  featureFlagsHeaderName: '',
  // #if process.env.NODE_ENV !== 'production'
  mocks: checkMocks(mocks),
  // #endif
  mockedEnvironments: [environments.DEV],
  getNodeEnv: () => process.env.NODE_ENV as string,
  processResponseHeaders: (headers: Record<string, unknown>) => {
    const backendVersion = headers[PORTAL_VERSION_HEADER_NAME];
    if (backendVersion !== undefined) {
      store.setBackendVersion(String(backendVersion));
    }
  },
});

export default apiClient;
