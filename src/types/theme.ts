import {
  UiKitTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';
import { ILocale } from './types';

export type FeatureTogglesComponentName =
  | 'Accordion'
  | 'AccountAvatar'
  | 'List'
  | 'Confirmation'
  | 'AutocompleteInput'
  | 'ContextPopup'
  | 'CopyToClipboardButton'
  | 'CssBaseline'
  | 'DeniedMessage'
  | 'Divider'
  | 'Dropdown'
  | 'EmptyContentMessage'
  | 'EmptyContentMessageEmoji'
  | 'FlagEnvironmentsStates'
  | 'FlippingStrategyParamsList'
  | 'GlobalPreloader'
  | 'HistoryOfChangesListItemContent'
  | 'IconButton'
  | 'LanguageDropdown'
  | 'LinkButton'
  | 'MultipleInput'
  | 'NotFoundMessage'
  | 'SortHead'
  | 'Tabs'
  | 'TextWithStatus'
  | 'Title'
  | 'AddMemberToProjectButton'
  | 'EditProjectEnvironmentForm'
  | 'EnvironmentInstancesList'
  | 'EnvironmentAction'
  | 'EnvironmentRoleDropdown'
  | 'FlagEnvironmentsList'
  | 'GroupRow'
  | 'InviteButton'
  | 'ProjectEnvironmentsList'
  | 'ProjectMembersList'
  | 'ProjectPendingMembersList'
  | 'TableItem'
  | 'UpdateEnvironmentTokenForm'
  | 'EditFlagForm'
  | 'AppVersionParams'
  | 'DarkLaunchParams'
  | 'ReleaseDateParams'
  | 'RequestContextParams'
  | 'EditProjectForm'
  | 'FlagsTable'
  | 'HeaderIconWithDropdown'
  | 'HistoryOfChanges'
  | 'InviteMembersToProject'
  | 'MemberAccordionTitle'
  | 'OrganizationUsersList'
  | 'PageFooter'
  | 'PageHeader'
  | 'ToasterManager'
  | 'FlagsPage'
  | 'InvitePage'
  | 'NotFoundPage'
  | 'OrganizationUsersPage'
  | 'ProjectUsersPage'
  | 'ProjectAccordionTitle'
  | 'ProjectsPage'
  | 'SyncEnvironmentsForm'
  | 'SyncPortalsForm'
  | 'EnvironmentsCompareModal'
  | 'EnvironmentsCompareModalCompareTable'
  | 'EnvironmentsCompareModalHeader'
  | 'NotificationSettingsModal'
  | 'formStyles'
  | 'tableStyles'
  | 'ListForInfiniteScroll'
  | 'EnableFreezeFeatureFlagsForm'
  | 'RadioGroup'
  | 'DisableFreezeFeatureFlagsModalContent'
  | 'FreezeNotification'
  | 'ComponentWithTooltip';

export type FeatureTogglesThemedLocaleKeys = 'headerAfterLogo' | 'copyright';

export type FeatureTogglesThemedLocale = {
  [keyLocales in ILocale]: {
    [key in FeatureTogglesThemedLocaleKeys]: string;
  };
};

export type FeatureTogglesThemedAssets = 'denied' | 'logo' | 'small-logo';

export interface FeatureTogglesUiTheme extends UiKitTheme {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Partial<
    Record<FeatureTogglesComponentName, ComponentStyles<any>>
  >;
  assets: Record<FeatureTogglesThemedAssets, () => JSX.Element>;
}
