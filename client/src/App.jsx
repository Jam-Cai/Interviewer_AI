import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import SelectProblem from './components/pages/SelectProblem';
import ProblemPage from './components/pages/ProblemPage';
import PageNotFound from './components/pages/PageNotFound';
import './App.css'
import { CodeProvider } from './components/context/CodeContext.jsx';
import { HighlightedProvider } from './components/context/HighlightedContext.jsx';
function App() {
  return (
    <HighlightedProvider>
      <CodeProvider>
        <Routes>
          <Route path="/" element={<SelectProblem />} />
          <Route path="/problem/:id" element={<ProblemPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CodeProvider>
    </HighlightedProvider>
  );
}

export default App
