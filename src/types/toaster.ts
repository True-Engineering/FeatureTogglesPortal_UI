import { IToasterProps } from '@true-engineering/true-react-common-ui-kit';
import { IErrorResponse } from './errors';

export interface IToasterPayload extends Omit<IToasterProps, 'onTimeEnd'> {
  // для глобальных тостеров из запросов api
  errorResponse?: IErrorResponse;
}

export interface IToaster extends IToasterPayload {
  timestamp: number;
}
