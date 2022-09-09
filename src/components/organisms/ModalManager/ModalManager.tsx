import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { observer } from 'mobx-react-lite';
import { Modal } from '@true-engineering/true-react-common-ui-kit';
import { useStore } from '../../../hooks';

const ModalManager: FC = () => {
  const history = useHistory();
  const { techStore } = useStore();
  const {
    modalsList,
    closeLastModal,
    hideModal,
    removeAllModals,
    showModal,
  } = techStore;

  useEffect(() => {
    const unlisten = history.listen(() => removeAllModals());

    return () => {
      unlisten();
    };
  }, []);

  return (
    <TransitionGroup component={null}>
      {modalsList.map(modalProps => {
        const { timestamp, ...props } = modalProps;

        return (
          <CSSTransition
            key={timestamp}
            timeout={0}
            onEnter={() => showModal(timestamp)}
          >
            <Modal
              {...props}
              onClose={() => {
                if (props.onClose !== undefined) {
                  props.onClose();
                }
                closeLastModal();
              }}
              onCompletelyHidden={() => {
                if (props.onCompletelyHidden !== undefined) {
                  props.onCompletelyHidden();
                }
                hideModal(timestamp);
              }}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default observer(ModalManager);
