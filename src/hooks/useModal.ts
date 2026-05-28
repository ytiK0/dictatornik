import {useCallback, useEffect, useRef, useState} from "react";

export function useModal(onClose?: () => void) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      setIsModalOpen(false)
      modalRef.current.close();
      if (onClose)
        onClose()
    }
  }, [onClose]);

  const showModal = useCallback(() => {
    if (modalRef.current) {
      setIsModalOpen(true)
      modalRef.current.showModal();
    }
  }, [])

  useEffect(() => {
    if (modalRef.current)
      setIsModalOpen(modalRef.current.open);
  }, []);

  return {modalRef, closeModal, showModal, isModalOpen} as const;
}