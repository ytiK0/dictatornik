import {type SubmitEvent, useCallback} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useRepository} from "@/hooks/useRepository.ts";
import {WordsRepository} from "@/database/WordsRepository.ts";

export function useAddNewWord(onSubmit?: () => void) {
  const queryClient = useQueryClient();
  const wordsRepo = useRepository(WordsRepository)

  const handleFormSubmit = useCallback(async (ev: SubmitEvent) => {
    ev.preventDefault();

    const form = ev.target;

    const formData = new FormData(form);

    const word = formData.get("word");
    const translation = formData.get("translation");

    if (!word || !translation) {
      console.error(`Except form with named inputs with names: word, translation.\nHas word: ${!!word}. Has translation: ${!!translation}.`)
      return;
    }

    await wordsRepo.addNewWord(word as string, translation as string)

    if (onSubmit) onSubmit()
    await queryClient.invalidateQueries({ queryKey: ["first_words"] })
    form.reset()
  },  [onSubmit, queryClient, wordsRepo]);

  return { handleFormSubmit }
}