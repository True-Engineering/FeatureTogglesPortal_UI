import { IFlag, IProjectEnvironment } from './types';

export interface ISyncPortalsInfo {
  key: string;
  featureFlagsToAdd?: IFlag[];
  featureFlagsToRemove?: IFlag[];
  featureFlagsToUpdate?: Array<{
    newFeatureFlag: IFlag;
    currentFeatureFlag: IFlag;
  }>;
}

export interface ISyncEnvironmentsInfo {
  key: string;
  envSynchronizedStatus: boolean;
  srcEnvironments: IProjectEnvironment[];
  destEnvironments: IProjectEnvironment[];
}
