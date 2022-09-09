import {
  nullToUndef,
  IRequestParams,
} from '@true-engineering/true-react-common-api-client';
import { NullAsUndefined } from './types';
import apiConfig from '../config';

export const mockTemplate = <Response>(
  name: keyof typeof apiConfig,
  fixture: Response | NullAsUndefined<Response>,
  ms = 300,
) => (args: {
  params?: IRequestParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}): Promise<Response> =>
  new Promise(resolve => {
    // eslint-disable-next-line no-console
    console.log(name, args, fixture);
    setTimeout(() => {
      resolve(nullToUndef(fixture));
    }, ms);
  });
