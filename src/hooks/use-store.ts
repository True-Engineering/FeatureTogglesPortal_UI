import { useContext } from 'react';
import { Context, IStore } from '../store';

export const useStore = (): IStore => useContext(Context);
