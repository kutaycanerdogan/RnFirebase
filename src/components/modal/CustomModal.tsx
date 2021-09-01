import React, {FC, useEffect} from 'react';
import {Button, Modal} from 'native-base';
import {useState} from 'react';
import {IModalComponentType} from 'native-base/lib/typescript/components/composites/Modal/types';
import {GestureResponderEvent} from 'react-native';
interface Props {
  title?: string;
  modalProps?: IModalComponentType;
  onSave?: (e: GestureResponderEvent) => void;
  onCancel?: (e: GestureResponderEvent) => void;
  handleIsOpen?: (value: boolean) => void;
  isOpen: boolean;
}
const CustomModal: FC<Props> = ({
  title,
  modalProps,
  children,
  onSave,
  onCancel,
  isOpen,
  handleIsOpen,
}) => {
  return (
    <Modal
      {...modalProps}
      isOpen={isOpen}
      onClose={() => {
        handleIsOpen(false);
      }}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button
              onPress={e => {
                if (!!onSave) {
                  onSave(e);
                }
                handleIsOpen(false);
              }}>
              Kaydet
            </Button>
            <Button
              onPress={e => {
                if (!!onCancel) {
                  onCancel(e);
                }
                handleIsOpen(false);
              }}>
              Vazgeç
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
export default CustomModal;
