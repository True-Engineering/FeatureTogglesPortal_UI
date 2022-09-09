import { makeAutoObservable } from 'mobx';
import {
  IModalProps,
  ToasterType,
} from '@true-engineering/true-react-common-ui-kit';
import { IToaster, IToasterPayload } from '../types';

const MAX_TOASTERS_COUNT = 4;

export interface IModal extends IModalProps {
  timestamp: number;
}

export interface ITechStore {
  toastersList: IToaster[];
  modalsList: IModal[];

  addModal: (modalProps: IModalProps) => void;
  closeLastModal: () => void;
  hideModal: (id: number) => void;
  removeAllModals: () => void;
  showModal: (id: number) => void;

  addToaster: (payload: IToasterPayload) => void;
  fetchWithToaster: (args: {
    fetch: () => Promise<unknown>;
    successMessage?: string;
    errorMessage?: string;
    toasterType?: ToasterType;
  }) => void;
  removeToaster: (timestamp: number) => void;
}

export class TechStore implements ITechStore {
  public toastersList: IToaster[];
  public modalsList: IModal[];

  constructor() {
    this.modalsList = [];
    this.toastersList = [];

    makeAutoObservable(this);
  }

  public addModal = (modalProps: IModalProps) => {
    this.modalsList = [
      ...this.modalsList,
      { ...modalProps, isOpen: false, timestamp: Date.now() },
    ];
  };

  public showModal = (id: number) => {
    this.modalsList = this.modalsList.map(modal =>
      modal.timestamp === id ? { ...modal, isOpen: true } : modal,
    );
  };

  public closeLastModal = () => {
    const lastOpenIndex = this.modalsList
      .map(modal => modal.isOpen)
      .lastIndexOf(true);

    this.modalsList = this.modalsList.map((modal, i) =>
      i === lastOpenIndex ? { ...modal, isOpen: false } : modal,
    );
  };

  public hideModal = (id: number) => {
    this.modalsList = this.modalsList.filter(
      ({ timestamp }) => timestamp !== id,
    );
  };

  public removeAllModals = () => {
    this.modalsList = [];
  };

  public addToaster = (payload: IToasterPayload) => {
    const newToaster = { ...payload, timestamp: Date.now() };
    this.toastersList = [
      ...this.toastersList.slice(-MAX_TOASTERS_COUNT + 1),
      newToaster,
    ];
  };

  public removeToaster = (timestamp: number) => {
    this.toastersList = this.toastersList.filter(
      toaster => toaster.timestamp !== timestamp,
    );
  };

  public fetchWithToaster = async ({
    fetch,
    successMessage,
    errorMessage,
    toasterType,
  }: {
    fetch: () => Promise<unknown>;
    successMessage?: string;
    errorMessage?: string;
    toasterType?: ToasterType;
  }): Promise<unknown> => {
    try {
      const result = await fetch();

      if (successMessage !== undefined) {
        this.addToaster({
          type: toasterType ?? 'ok',
          text: successMessage,
        });
      }

      return result;
    } catch (e) {
      this.addToaster({
        type: 'error',
        text: errorMessage,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorResponse: (e as any).response?.data,
      });

      return Promise.resolve();
    }
  };
}

export default TechStore;
