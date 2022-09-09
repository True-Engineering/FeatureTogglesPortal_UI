import { IRequestConfigItem } from '@true-engineering/true-react-common-api-client';

const apiConfig = checkConfig({
  getUser: {
    pathTemplate: '/api/session/user',
    method: 'GET',
  },

  activateUser: {
    pathTemplate: '/api/session/user/activate/:userId/:projectId',
    method: 'POST',
  },

  loadFlags: {
    pathTemplate: '/api/features/:organizationId/:projectId/',
    method: 'GET',
  },

  enableFlag: {
    pathTemplate: '/api/features/:organizationId/:projectId/enable/:flagName',
    method: 'POST',
  },

  disableFlag: {
    pathTemplate: '/api/features/:organizationId/:projectId/disable/:flagName',
    method: 'POST',
  },

  createFlag: {
    pathTemplate: '/api/features/:organizationId/:projectId/:flagName',
    method: 'POST',
  },

  editFlag: {
    pathTemplate: '/api/features/:organizationId/:projectId/:flagName',
    method: 'PUT',
  },

  editFlagStrategy: {
    pathTemplate: '/api/features/:organizationId/:projectId/:flagName/strategy',
    method: 'PUT',
  },

  deleteFlag: {
    pathTemplate: '/api/features/:organizationId/:projectId/:flagName',
    method: 'DELETE',
  },

  downloadFlagsFile: {
    pathTemplate: '/api/features/:organizationId/:projectId/download',
    method: 'GET',
  },

  uploadFlagsFile: {
    pathTemplate: '/api/features/:organizationId/:projectId/upload',
    method: 'POST',
  },

  syncPortalsInfo: {
    pathTemplate:
      '/api/features/:organizationId/:projectId/portals-synchronization/info',
    method: 'POST',
  },

  syncPortalsUpload: {
    pathTemplate:
      '/api/features/:organizationId/:projectId/portals-synchronization/upload',
    method: 'POST',
  },

  syncEnvironmentsInfo: {
    pathTemplate:
      '/api/features/:organizationId/:projectId/environments-synchronization/info',
    method: 'POST',
  },

  syncEnvironmentsUpload: {
    pathTemplate:
      '/api/features/:organizationId/:projectId/environments-synchronization/upload',
    method: 'POST',
  },

  loadOrganizations: {
    pathTemplate: '/api/organization/all',
    method: 'GET',
  },

  loadProjects: {
    pathTemplate: '/api/project/:organizationId/all',
    method: 'GET',
  },

  createProject: {
    pathTemplate: '/api/project/:organizationId',
    method: 'POST',
  },

  getProject: {
    pathTemplate: '/api/project/:organizationId/:projectId',
    method: 'GET',
  },

  editProject: {
    pathTemplate: '/api/project/:organizationId/:projectId',
    method: 'PUT',
  },

  markDefaultProject: {
    pathTemplate: '/api/project/:organizationId/:projectId/default',
    method: 'PATCH',
  },

  deleteProject: {
    pathTemplate: '/api/project/:organizationId/:projectId',
    method: 'DELETE',
  },

  getInviteLinkForProject: {
    pathTemplate: '/api/project/:organizationId/:projectId/invite',
    method: 'GET',
  },

  fetchInvite: {
    pathTemplate: '/api/invite/:uuid',
    method: 'PUT',
  },

  getOrganizationMembers: {
    pathTemplate: '/api/organization/:organizationId/members',
    method: 'GET',
  },

  getProjectMembers: {
    pathTemplate: '/api/project/:organizationId/:projectId/members',
    method: 'GET',
  },

  editMemberProjectPermission: {
    pathTemplate:
      '/api/project/:organizationId/:projectId/members/:userId/role',
    method: 'POST',
  },

  editMemberEnvironmentPermission: {
    pathTemplate: '/api/project/:organizationId/:projectId/members/:userId',
    method: 'POST',
  },

  deleteOrganizationMember: {
    pathTemplate: '/api/organization/:organizationId/members/:userId',
    method: 'DELETE',
  },

  deleteProjectMember: {
    pathTemplate: '/api/project/:organizationId/:projectId/members/:userId',
    method: 'DELETE',
  },

  loadEnvironments: {
    pathTemplate: '/api/environment/:projectId/all',
    method: 'GET',
  },

  createEnvironment: {
    pathTemplate: '/api/environment/:projectId',
    method: 'POST',
  },

  getEnvironment: {
    pathTemplate: '/api/environment/:projectId/:environmentId',
    method: 'GET',
  },

  editEnvironment: {
    pathTemplate: '/api/environment/:projectId/:environmentId',
    method: 'PUT',
  },

  deleteEnvironment: {
    pathTemplate: '/api/environment/:projectId/:environmentId',
    method: 'DELETE',
  },

  updateEnvironmentToken: {
    pathTemplate: '/api/environment/:projectId/:environmentId/token',
    method: 'POST',
  },

  deleteEnvironmentInstance: {
    pathTemplate:
      '/api/environment/:projectId/:environmentId/instance/:instanceId',
    method: 'DELETE',
  },

  updateEnvironmentNotifications: {
    pathTemplate:
      '/api/environment/notification/:projectId/:environmentId/update',
    method: 'POST',
  },

  getCompareEnvironmentsState: {
    pathTemplate: '/api/environment/:projectId/compare',
    method: 'GET',
  },

  updateFlagsState: {
    pathTemplate: '/api/environment/:projectId/compare/update/:environmentId',
    method: 'POST',
  },

  getHistoryOfChanges: {
    pathTemplate: '/api/history/:organizationId/:projectId',
    method: 'GET',
  },

  getFeatureFlagsForFilters: {
    pathTemplate: '/api/history/:organizationId/:projectId/filter/feature',
    method: 'GET',
  },

  getUsersForFilters: {
    pathTemplate: '/api/history/:organizationId/:projectId/filter/user',
    method: 'GET',
  },

  getTagsForFilters: {
    pathTemplate: '/api/history/:organizationId/:projectId/filter/tag',
    method: 'GET',
  },

  freezeFeatureFlags: {
    pathTemplate: '/api/environment/:projectId/freeze/:environmentId',
    method: 'POST',
  },

  unfreezeFeatureFlags: {
    pathTemplate: '/api/environment/:projectId/unfreeze/:environmentId',
    method: 'POST',
  },
});

export const SIGN_IN_PATHNAME = '/oauth2/sign_in';

export const SIGN_OUT_PATHNAME = '/oauth2/sign_out';

function checkConfig<P extends string>(config: Record<P, IRequestConfigItem>) {
  return config;
}

export default apiConfig;
