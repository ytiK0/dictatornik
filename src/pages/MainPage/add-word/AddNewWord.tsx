import {type MouseEvent, useCallback, useEffect} from "react";
import {useModal} from "@/hooks/useModal.ts";
import {LabeledInput} from "@/components/LabeledInput";
import {Button} from "@/components/Button";


import styles from "./addNewWord.module.css";
import {useAddNewWord} from "@/pages/MainPage/add-word/useAddNewWord.ts";

interface AddNewWordProps {
  isOpen: boolean,
  onClose?: () => void
}

export function AddNewWord({ isOpen, onClose }: AddNewWordProps) {
  const {modalRef, closeModal, showModal} = useModal(onClose);
  const { handleFormSubmit } = useAddNewWord(onClose)

  const handleModalClick = useCallback((ev: MouseEvent) => {
    if (ev.currentTarget === ev.target)
      closeModal();
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) showModal()
    else closeModal()
  }, [isOpen, closeModal, showModal]);

  return (
    <dialog
      ref={modalRef}
      className={styles.addNewWordModal}
      onClick={handleModalClick}
    >
      <div className={styles.addNewWordModalContent}>
        <form style={{display:"flex", flexDirection: "column", gap: 8}} onSubmit={handleFormSubmit}>
          <LabeledInput name={"word"} id={"word"} label={"Слово"} autoComplete={"off"} required/>
          <LabeledInput name={"translation"} id={"translation"} label={"Перевод"} autoComplete={"off"} required />
          <div style={{display: "flex", justifyContent: "flex-end", gap: 4}}>
            <Button type={"button"} view={"normal"} onClick={closeModal}>Отмена</Button>
            <Button type={"submit"} view={"action"}>Добавить</Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
