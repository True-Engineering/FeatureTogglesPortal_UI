import React from 'react';
import { IStore } from './store';

export const Context = React.createContext<IStore>({} as IStore);
