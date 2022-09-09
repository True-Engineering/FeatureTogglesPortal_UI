import {
  fetchCreateEnvironment,
  fetchCreateEnvironmentRequestMapper,
} from './fetch-create-environment';
import {
  fetchCreateFlagRequestMapper,
  fetchCreateFlag,
} from './fetch-create-flag';
import {
  fetchCreateProject,
  fetchCreateProjectRequestMapper,
} from './fetch-create-project';
import {
  fetchEditEnvironment,
  fetchEditEnvironmentRequestMapper,
} from './fetch-edit-environment';
import { fetchEditFlagRequestMapper, fetchEditFlag } from './fetch-edit-flag';
import {
  fetchEditFlagStrategyRequestMapper,
  fetchEditFlagStrategy,
} from './fetch-edit-flag-strategy';
import { fetchEditMemberEnvironmentPermission } from './fetch-edit-member-environment-permission';
import { fetchEditMemberProjectPermission } from './fetch-edit-member-project-permission';
import {
  fetchEditProject,
  fetchEditProjectRequestMapper,
} from './fetch-edit-project';
import { fetchFreezeFeatureFlagsRequestParamsMapper } from './fetch-freeze-feature-flags';
import { fetchGetCompareEnvironmentsState } from './fetch-get-compare-environment-state';
import { fetchGetEnvironment } from './fetch-get-environment';
import { fetchGetFeatureFlagsForFilters } from './fetch-get-feature-flags-for-filters';
import {
  fetchGetHistoryOfChanges,
  fetchGetHistoryOfChangesParamsMapper,
} from './fetch-get-history-of-changes';
import { fetchGetOrganizationMembers } from './fetch-get-organization-members';
import { fetchGetProject } from './fetch-get-project';
import { fetchGetProjectMembers } from './fetch-get-project-members';
import { fetchGetTagsForFilters } from './fetch-get-tags-for-filters';
import { fetchGetUser } from './fetch-get-user';
import { fetchGetUsersForFilters } from './fetch-get-users-for-filters';
import { fetchLoadEnvironments } from './fetch-load-environments';
import { fetchLoadFlags } from './fetch-load-flags';
import { fetchLoadOrganizations } from './fetch-load-organizations';
import { fetchLoadProjects } from './fetch-load-projects';
import { fetchSyncEnvironmentsInfo } from './fetch-sync-environments-info';
import { fetchSyncEnvironmentsUpload } from './fetch-sync-environments-upload';
import { fetchSyncPortalsInfo } from './fetch-sync-portals-info';
import { fetchSyncPortalsUpload } from './fetch-sync-portals-upload';
import { fetchUpdateEnvironmentNotificationsBodyRequest } from './fetch-update-email-notifications';

const mappers = {
  fetchGetUser,
  fetchLoadFlags,
  fetchCreateFlagRequestMapper,
  fetchCreateFlag,
  fetchEditFlagRequestMapper,
  fetchEditFlag,
  fetchEditFlagStrategyRequestMapper,
  fetchEditFlagStrategy,
  fetchCreateEnvironmentRequestMapper,
  fetchCreateEnvironment,
  fetchCreateProjectRequestMapper,
  fetchCreateProject,
  fetchEditEnvironmentRequestMapper,
  fetchEditEnvironment,
  fetchEditProjectRequestMapper,
  fetchEditProject,
  fetchGetEnvironment,
  fetchGetProject,
  fetchLoadEnvironments,
  fetchLoadOrganizations,
  fetchLoadProjects,
  fetchGetOrganizationMembers,
  fetchGetProjectMembers,
  fetchEditMemberProjectPermission,
  fetchEditMemberEnvironmentPermission,
  fetchSyncPortalsInfo,
  fetchSyncPortalsUpload,
  fetchSyncEnvironmentsInfo,
  fetchSyncEnvironmentsUpload,
  fetchGetCompareEnvironmentsState,
  fetchUpdateEnvironmentNotificationsBodyRequest,
  fetchGetHistoryOfChanges,
  fetchGetFeatureFlagsForFilters,
  fetchGetUsersForFilters,
  fetchGetHistoryOfChangesParamsMapper,
  fetchGetTagsForFilters,
  fetchFreezeFeatureFlagsRequestParamsMapper,
};

export default mappers;

export * from './mapper-flipping-strategy';
export * from './fetch-load-flags';
export * from './fetch-create-flag';
export * from './fetch-edit-flag';
export * from './fetch-edit-flag-strategy';
export * from './fetch-get-user';
export * from './fetch-enable-flag';
export * from './fetch-delete-flag';
export * from './fetch-download-flags-file';
export * from './fetch-upload-flags-file';
export * from './fetch-load-organizations';
export * from './fetch-load-projects';
export * from './fetch-create-project';
export * from './fetch-get-project';
export * from './fetch-edit-project';
export * from './fetch-mark-default-project';
export * from './fetch-delete-project';
export * from './fetch-load-environments';
export * from './fetch-create-environment';
export * from './fetch-get-environment';
export * from './fetch-edit-environment';
export * from './fetch-delete-environment';
export * from './fetch-update-token';
export * from './fetch-delete-environment-instance';
export * from './fetch-invite-link-for-project';
export * from './fetch-invite';
export * from './fetch-get-organization-members';
export * from './fetch-get-project-members';
export * from './fetch-edit-member-project-permission';
export * from './fetch-edit-member-environment-permission';
export * from './fetch-delete-organization-member';
export * from './fetch-delete-project-member';
export * from './fetch-activate-user';
export * from './fetch-sync-portals-info';
export * from './fetch-sync-portals-upload';
export * from './fetch-sync-environments-info';
export * from './fetch-sync-environments-upload';
export * from './fetch-get-compare-environment-state';
export * from './fetch-update-email-notifications';
export * from './fetch-update-flags-state';
export * from './fetch-get-history-of-changes';
export * from './fetch-get-feature-flags-for-filters';
export * from './fetch-get-users-for-filters';
export * from './fetch-get-tags-for-filters';
export * from './fetch-freeze-feature-flags';
export * from './fetch-unfreeze-feature-flags';
