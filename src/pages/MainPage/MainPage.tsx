import {Button} from "@/components/Button";
import {useQuery, useQueryClient} from "@tanstack/react-query";

import {useRepository} from "@/hooks/useRepository.ts";
import {WordsRepository} from "@/database/WordsRepository.ts";
import {AddNewWord} from "./add-word/AddNewWord.tsx";

import styles from "./mainPage.module.css"
import {useState} from "react";

export function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient()

  const wordsRepo = useRepository(WordsRepository)

  const { isPending, data: firsWords, error } = useQuery({
    queryKey: ["first_words"],
    queryFn: () => wordsRepo.getFirstN(20)
  })


  return (
    <>
      <header className={styles.headerContainer}>
        <h2 className={styles.pageHeading}>Главная</h2>
        <Button
          view={"action"}
          onClick={() => setIsModalOpen(true)}
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
      <AddNewWord isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
