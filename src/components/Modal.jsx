import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Button,
} from '@chakra-ui/react'

export const ModalWrapper = ({
  modalTitle,
  modelContent,
  modelCloseText,
  onSecondaryAction,
  secondaryActionText,
  isOpen,
  onClose,
  onPrimaryAction,
  id,
}) => {
  return (
    <Modal id={id} data-testid={id} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-testid={id}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modelContent}</ModalBody>

        <ModalFooter>
          <Button
            data-testid='modal-primary-action'
            colorScheme='blue'
            mr={3}
            onClick={onPrimaryAction}
          >
            {modelCloseText}
          </Button>
          {onSecondaryAction && secondaryActionText && (
            <Button onClick={onSecondaryAction} variant='ghost'>
              {secondaryActionText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
