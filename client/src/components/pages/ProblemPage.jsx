import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import ProblemDescription from '../components/ProblemDescription';
import CodeEditor from '../components/CodeEditor';
import StartOverlay from '../components/StartOverlay';

function ProblemPage() {
  const { id } = useParams(); 
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('Loading problem details...');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/problem/${id}`);
        setProblem(response.data);
      } catch (error) {
        setError("Unfortunately, this problem is not supported by our platform.");
      }
    };
    
    fetchProblem();
  }, [id]); 

  if (!problem) {
    return <div className="text-white mt-5 ml-5">{error}</div>;
  }

  return (
    <div className="flex flex-row h-screen">

      {/* SHOW OVERLAY IF NOT STARTED */}
      {!started && <StartOverlay onStart={() => setStarted(true)} />}

      {/* Problem Description */}
      <ProblemDescription problem={problem} />

      {/* Code Editor */}
      <CodeEditor hasStarted={started} />

    </div>
  );
}

export default ProblemPage;
