import {useCallback, useRef} from "react";

export function useModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeModal = useCallback(() => {
    if (dialogRef.current)
      dialogRef.current.close();
  }, []);

  const showModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [])

  return [dialogRef, closeModal, showModal] as const;
}