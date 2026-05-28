import type {MouseEvent, SubmitEvent}from "react";
import {Button} from "@/components/Button";

import styles from "./mainPage.module.css"
import {useCallback} from "react";
import {LabeledInput} from "@/components/LabeledInput";
import {useModal} from "@/hooks/useModal.ts";
import {useRepository} from "@/hooks/useRepository.ts";
import {WordsRepository} from "@/database/WordsRepository.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export function MainPage() {
  const queryClient = useQueryClient()
  const [modalRef, closeModal, showModal] = useModal();

  const handleModalClick = useCallback((ev: MouseEvent) => {
    if (ev.currentTarget === ev.target)
      closeModal();
  }, [closeModal]);

  const wordsRepo = useRepository(WordsRepository)

  const { isPending, data: firsWords, error } = useQuery({
    queryKey: ["first_words"],
    queryFn: () => wordsRepo.getFirstN(20)
  })

  const handleNewWordFormSubmit = useCallback(async (ev: SubmitEvent) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);


    const word = formData.get("word");
    const translation = formData.get("translation");

    if (!word || !translation) {
      console.error(`Except form with named inputs with names: word, translation.\nHas word: ${!!word}. Has translation: ${!!translation}.`)
      return;
    }

    await wordsRepo.addNewWord(word as string, translation as string)

    closeModal()
    await queryClient.invalidateQueries({ queryKey: ["first_words"] })
    ev.target.reset()
  },  [closeModal, queryClient, wordsRepo]);

  return (
    <>
      <header className={styles.headerContainer}>
        <h2 className={styles.pageHeading}>Главная</h2>
        <Button
          view={"action"}
          onClick={showModal}
        >
          Добавить слово
        </Button>
      </header>
      <hr />
      <section style={{display: "flex", flexDirection: "column"}}>
        {
          isPending ?
            "loading"
            :
            error ?
              "got error"
              :
              firsWords.map(({word, translation, score}) =>
                <span key={word}>
                  {word} - {translation}; score - {parseFloat(score.toFixed(2))}
                  <button onClick={async () => {
                    await wordsRepo.putScore(word, score-0.01)
                    await queryClient.invalidateQueries({ queryKey: ["first_words"] })
                  }}>+</button>
                </span>
              )
        }
      </section>
      <dialog
        ref={modalRef}
        className={styles.addNewWordModal}
        onClick={handleModalClick}
      >
        <div className={styles.addNewWordModalContent}>
          <form style={{display:"flex", flexDirection: "column", gap: 8}} onSubmit={handleNewWordFormSubmit}>
            <LabeledInput name={"word"} id={"word"} label={"Слово"} autoComplete={"off"} required/>
            <LabeledInput name={"translation"} id={"translation"} label={"Перевод"} autoComplete={"off"} required />
            <div style={{display: "flex", justifyContent: "flex-end", gap: 4}}>
              <Button type={"button"} view={"normal"} onClick={closeModal}>Отмена</Button>
              <Button type={"submit"} view={"action"}>Добавить</Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
