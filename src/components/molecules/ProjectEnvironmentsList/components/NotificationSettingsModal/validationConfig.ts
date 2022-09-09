import { INestedValidationConfig } from '@true-engineering/true-react-common-validator';
import { INotificationSettingsFields } from './types';

export const validationConfig: INestedValidationConfig<INotificationSettingsFields> = {
  emails: {
    validators: {
      allEmailsAreValid: {
        message: 'errors.emailsAreNotValid',
        validate: value => {
          const reg = /.+@.+\..+/;
          return value === undefined || value.every(email => reg.test(email));
        },
      },
    },
  },
};
