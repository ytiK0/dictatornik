import {type SubmitEvent, useCallback} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useRepository} from "@/hooks/useRepository.ts";
import {WordsRepository} from "@/database/WordsRepository.ts";

interface UseAddNewWordOptions {
  onSuccess?: () => void
}

export function useAddNewWord({ onSuccess }: UseAddNewWordOptions) {
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

    if (onSuccess) onSuccess()
    await queryClient.invalidateQueries({ queryKey: ["first_words"] })
    form.reset()
  },  [onSuccess, queryClient, wordsRepo]);

  return { handleFormSubmit }
}