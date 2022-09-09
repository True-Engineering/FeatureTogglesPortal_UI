import type {
  IFlag,
  IFlagTypeProp,
  IFlippingStrategyTypeProp,
} from '../../../types';

export type IFlagType = IFlagTypeProp | 'noType';

export type IFlippingStrategyType = IFlippingStrategyTypeProp | 'NoStrategy';

export interface IEditableFlag extends Omit<IFlag, 'type'> {
  type?: IFlagType;
}
