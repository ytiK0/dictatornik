import {useCallback, useEffect, useRef, useState} from "react";

export function useModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    if (dialogRef.current) {
      setIsModalOpen(false)
      dialogRef.current.close();
    }
  }, []);

  const showModal = useCallback(() => {
    if (dialogRef.current) {
      setIsModalOpen(true)
      dialogRef.current.showModal();
    }
  }, [])

  useEffect(() => {
    if (dialogRef.current)
      setIsModalOpen(dialogRef.current.open);
  }, []);

  return [dialogRef, closeModal, showModal, isModalOpen] as const;
}