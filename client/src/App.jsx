import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SelectProblem from './components/pages/SelectProblem';
import LandingPage from './components/pages/LandingPage';
import ProblemPage from './components/pages/ProblemPage';
import PageNotFound from './components/pages/PageNotFound';
import './App.css';
import { CodeProvider } from './components/context/CodeContext.jsx';
import { HighlightedProvider } from './components/context/HighlightedContext.jsx';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the window width is for mobile or iPad
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width <= 1150) { // you can adjust this threshold based on your needs
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkDevice(); // Check on initial load

    // Add event listener to check on window resize
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice); // Clean up the event listener
    };
  }, []);

  return (
    <HighlightedProvider>
      <CodeProvider>
        <Routes>
          <Route 
            path="/" 
            element={isMobile ? (
              <div className="px-10 justify-center flex items-center h-screen w-full text-xl text-center">Please open this site on a desktop for the best experience.</div>
            ) : (
              <LandingPage />
            )}
          />
          <Route path="/interview" element={<SelectProblem />} />
          <Route path="/problem/:id" element={<ProblemPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CodeProvider>
    </HighlightedProvider>
  );
}

export default App;
