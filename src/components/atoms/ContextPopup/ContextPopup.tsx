import React, { FC, useRef, useState } from 'react';
import { Styles } from 'react-jss';
import { Portal } from 'react-overlays';
import { Placement } from 'react-overlays/cjs/usePopper';
import usePopper from 'react-overlays/usePopper';
import { CSSTransition } from 'react-transition-group';
import { useOnClickOutsideWithRef } from '@true-engineering/true-react-common-ui-kit';
import { useTooltipsContainer, useFeatureTogglesTheme } from '../../../hooks';
import { useSlideUpAnimationStyles } from '../../commonStyles';
import { styles } from './ContextPopup.styles';
import { IconButton } from '../IconButton';

export interface IContextPopupProps {
  children: JSX.Element | React.FC<{ isOpen: boolean }>; // trigger
  popup: React.FC<{ onClose: () => void }>;
  placement?: Placement;
  offset?: number[];
  isDisabled?: boolean;
  hasCloseButton?: boolean;
  hasWrapperStyle?: boolean;
  tweakStyles?: Styles;
  beforeOpen?: () => void | Promise<void>;
  beforeClose?: () => void | Promise<void>;
  onOpen?: () => void | Promise<void>;
  onClose?: () => void | Promise<void>;
}

const ContextPopup: FC<IContextPopupProps> = ({
  popup: Popup,
  children,
  tweakStyles,
  placement = 'bottom-end',
  offset = [0, 6],
  isDisabled = false,
  hasCloseButton = false,
  hasWrapperStyle = true,
  beforeOpen,
  beforeClose,
  onOpen,
  onClose,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'ContextPopup',
    styles,
    tweakStyles,
  );
  const slideUpAnimationClasses = useSlideUpAnimationStyles();

  const rootRef = useRef<HTMLDivElement>(null);
  const popupWrapperRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const container = useTooltipsContainer();

  const { styles: popperStyles, attributes, update } = usePopper(
    rootRef.current,
    popupWrapperRef.current,
    {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset,
          },
        },
      ],
    },
  );

  const handleOpen = async (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }

    if (beforeOpen) {
      await beforeOpen();
    }
    update();
    setIsOpen(true);
    if (onOpen) {
      await onOpen();
    }
  };

  const handleClose = async (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }

    if (beforeClose) {
      await beforeClose();
    }
    setIsOpen(false);
    if (onClose) {
      await onClose();
    }
  };

  const handleClick = isDisabled
    ? undefined
    : isOpen
    ? handleClose
    : handleOpen;

  useOnClickOutsideWithRef(popupRef, () => handleClose(), triggerRef);

  return (
    <div className={classes.root} ref={rootRef}>
      <div ref={triggerRef} onClick={handleClick} className={classes.trigger}>
        {typeof children === 'function' ? children({ isOpen }) : children}
      </div>
      <Portal container={container}>
        <div
          ref={popupWrapperRef}
          style={popperStyles.popper as Styles}
          className={classes.popupWrapper}
          {...attributes.popper}
        >
          <CSSTransition
            in={isOpen}
            timeout={150}
            classNames={slideUpAnimationClasses}
            unmountOnExit
          >
            <div
              className={hasWrapperStyle ? classes.popup : undefined}
              ref={popupRef}
              onClick={e => e.stopPropagation()}
            >
              <Popup onClose={handleClose} />

              {hasCloseButton && (
                <div className={classes.close}>
                  <IconButton icon="close" onClick={handleClose} />
                </div>
              )}
            </div>
          </CSSTransition>
        </div>
      </Portal>
    </div>
  );
};

export default ContextPopup;
