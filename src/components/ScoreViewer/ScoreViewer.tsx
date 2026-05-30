import styles from "./scoreViewer.module.css";
import {useMemo} from "react";
import clsx from "clsx";

interface ScoreViewerProps {
  score: number
}

const statuses: [number, string, string][] = [
  [0.29, "Новое", styles.scoreBar__dont_know],
  [0.59, "Учу", styles.scoreBar__barely_mem],
  [0.84, "Знаю", styles.scoreBar__know_well],
  [1, "Помню", styles.scoreBar__know_good],
];

export default function ScoreViewer({ score }: ScoreViewerProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, status, scoreBarColorClassName] = useMemo(() => {
    return statuses.find(([limit]) => score <= limit) ?? "Не знаю";
  }, [score])


  return (
    <div>
      <span>{status}</span>
      <div className={styles.scoreBarWrapper}>
        <div className={clsx(styles.scoreBar, scoreBarColorClassName)} style={{width: `${score*100}%`}}></div>
      </div>
    </div>
  );
}
