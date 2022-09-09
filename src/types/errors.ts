export const ERROR_CODES = [
  'ORGANIZATION_NOT_FOUND',
  'ENVIRONMENT_NOT_FOUND',
  'PROJECT_NOT_FOUND',
  'UNABLE_TO_SAVE_PROJECT',
  'UNABLE_TO_SAVE_ENVIRONMENT',
  'UNABLE_TO_SAVE_FEATURE_FLAG',
  'ACCESS_DENIED',
  'INVALID_INPUT_DATA',
  'INTERNAL_ERROR',
  'FEATURE_FLAG_NOT_FOUND',
  'PROJECT_ALREADY_EXIST',
] as const;

type IErrorCode = typeof ERROR_CODES[number];

export interface IErrorResponse {
  errorCode: IErrorCode;
  errorMessage?: string;
}
