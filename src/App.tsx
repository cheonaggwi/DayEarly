import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHome from './MainHome';
import YearPage from './YearPage';
import MonthPage from './MonthPage';
import DayPage from './DayPage';
import DiaryPage from './DiaryPage';

import './cssfile/WorldStyle.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/Main/:id" element={<MainHome />} />
        <Route path="/year/:id" element={<YearPage />} />
        <Route path="/month/:id" element={<MonthPage />} />
        <Route path="/day/:id" element={<DayPage />} />
        <Route path="/diary/:id" element={<DiaryPage />} />
      </Routes>
    </BrowserRouter>
  )
}