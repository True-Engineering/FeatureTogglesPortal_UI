import React, { FC, useState } from 'react';
import {
  Input,
  Modal,
  IInputProps,
} from '@true-engineering/true-react-common-ui-kit';
import { inputTweakStyles } from './InputWithModalHint.styles';

export interface IInputWithModalHintProps extends IInputProps {
  hintTitle: string;
  hintContent: React.ReactNode;
}

const InputWithModalHint: FC<IInputWithModalHintProps> = ({
  label,
  value,
  isInvalid,
  isDisabled,
  errorMessage,
  hintTitle,
  hintContent,
  onChange,
  onBlur,
}) => {
  const [isModalHintOpen, setModalHintOpen] = useState(false);

  const handleOpen = (): void => setModalHintOpen(true);
  const handleClose = (): void => setModalHintOpen(false);

  return (
    <>
      <Input
        label={label}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        errorMessage={errorMessage}
        onBlur={onBlur}
        onIconClick={handleOpen}
        iconType="question"
        tweakStyles={inputTweakStyles}
      />
      <Modal isOpen={isModalHintOpen} title={hintTitle} onClose={handleClose}>
        {hintContent}
      </Modal>
    </>
  );
};

export default InputWithModalHint;
