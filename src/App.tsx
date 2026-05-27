import { Route, Routes } from "react-router";
import { MainPage, StatisticPage, QuizPage } from "./pages";
import styles from "./App.module.css"
import { AsideMenu } from "./components/AsideMenu";
import {House, Check, ChartColumn} from '@gravity-ui/icons';

const asideButtons = [
  {label: "Главная", href: "/", icon: <House /> },
  {label: "Квиз", href: "/quiz", icon: <Check />},
  {label: "Статистика", href: "/stats", icon: <ChartColumn />}
]

function App() {
  return (
    <div className={styles.appContainer}>
      <AsideMenu
        className={styles.asideMenuContainer}
        buttons={asideButtons}
      />
      <div className={styles.contentContainer}>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path={"/quiz"} element={<QuizPage />} />
          <Route path={"/stats"} element={<StatisticPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
