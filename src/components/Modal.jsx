import React from "react";

import { Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalFooter, ModalContent, ModalHeader, Button } from '@chakra-ui/react';

export const ModalWrapper = ({ modalTitle, modelContent, modelCloseText, secondaryAction, secondaryActionText, isOpen, onClose, onPrimaryAction }) => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {modelContent}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onPrimaryAction}>
                {modelCloseText}
              </Button>
              {
                secondaryAction && secondaryActionText && (
                    <Button onSubmit={() => secondaryAction()}variant='ghost'>{secondaryActionText}</Button>
                )
              }
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }