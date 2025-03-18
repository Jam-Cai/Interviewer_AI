import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import SelectProblem from './components/pages/SelectProblem';
import ProblemPage from './components/pages/ProblemPage';
import PageNotFound from './components/pages/PageNotFound';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SelectProblem />} />
      <Route path="/problem/:id" element={<ProblemPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App
