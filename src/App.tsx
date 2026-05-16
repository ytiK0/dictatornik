import { Route, Routes } from "react-router";
import { MainPage, StatisticPage, QuizPage } from "./pages";
import styles from "./App.module.css"
import AsideMenu from "./components/AsideMenu.tsx";

function App() {
  return (
    <div className={styles.appContainer}>
      <AsideMenu
        className={styles.asideMenuContainer}
        buttons={[
          { label: "Главная", href: "/" },
          { label: "Квиз", href: "/quiz" },
          { label: "Статистика", href: "/stats" },
        ]}
      />
      <div className={styles.contentContainer}>
        {/* page content */}
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
