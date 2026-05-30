import {Button} from "@/components/Button";
import {AddNewWord} from "./add-word/AddNewWord.tsx";

import styles from "./mainPage.module.css"
import {useState} from "react";
import {FirstNWordsTable} from "@/pages/MainPage/first-n-words-tabel/FirstNWordsTable.tsx";

export function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <FirstNWordsTable n={20} />
      <AddNewWord isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
