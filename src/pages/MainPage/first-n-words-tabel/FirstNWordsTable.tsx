import {useQuery} from "@tanstack/react-query";
import {useRepository} from "@/hooks/useRepository.ts";
import {WordsRepository} from "@/database/WordsRepository.ts";
import ScoreViewer from "@/components/ScoreViewer/ScoreViewer.tsx";

interface FirstNWordsTableProps {
  n: number
}

export function FirstNWordsTable({n}: FirstNWordsTableProps) {
  const wordsRepo = useRepository(WordsRepository);

  const { isPending, data, error } = useQuery({
    queryKey: ["first_words"],
    queryFn: async () => {
      const firstWords = await wordsRepo.getFirstN(n)
      const totalWords = await wordsRepo.count()

      return { firstWords, totalWords }
    }
  })

  if (error)
    return <div>Got error: {error.message}</div>
  else if (isPending)
    return <div>Loading...</div>

  const { firstWords, totalWords } = data

  return (
    <section>
      <div>Всего слов: {totalWords}</div>
      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th>Слово</th>
            <th>Перевод</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {
            firstWords.map(({ word, translation, score }) => <tr key={word}>
              <td>{word}</td>
              <td>{translation}</td>
              <td><ScoreViewer score={score} /></td>
            </tr>)
          }
        </tbody>
      </table>
    </section>
  );
}
