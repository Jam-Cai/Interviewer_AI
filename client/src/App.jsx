import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import SelectProblem from './components/pages/SelectProblem';
import ProblemPage from './components/pages/ProblemPage';
import PageNotFound from './components/pages/PageNotFound';
import './App.css'
import { CodeProvider } from './components/context/CodeContext.jsx';
function App() {
  return (
    <CodeProvider>
      <Routes>
        <Route path="/" element={<SelectProblem />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CodeProvider>
  );
}

export default App
