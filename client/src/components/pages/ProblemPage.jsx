import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import ProblemDescription from '../components/ProblemDescription';
import CodeEditor from '../components/CodeEditor';

function ProblemPage() {
  const { id } = useParams(); 
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('Loading problem details...');

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

      {/* Problem Description */}
      <ProblemDescription problem={problem} />

      {/* Code Editor */}
      <CodeEditor />

    </div>
  );
}

export default ProblemPage;
