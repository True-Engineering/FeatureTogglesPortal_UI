import { initReactI18next } from 'react-i18next';
import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ILocale } from './types';
import { environments } from './environment-config';
import en from './locales/en-EN';
import ru from './locales/ru-RU';

export type nameSpace = 'common' | 'themed';

type IInitParams = {
  ns: nameSpace[];
  defaultNS: nameSpace;
  resources: {
    [keyLocales in ILocale]: {
      [keyNS in nameSpace]: object;
    };
  };
  lng?: ILocale;
  fallbackLng: ILocale;
} & InitOptions;

const initParams: IInitParams = {
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: en,
      themed: {},
    },
    ru: {
      common: ru,
      themed: {},
    },
  },
  lng: process.env.NODE_ENV === environments.TEST ? 'ru' : undefined,
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init(initParams);

export default i18n;
