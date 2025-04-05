import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SelectProblem() {
  const [link, setLink] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (slug) {
      try {
        const response = await axios.get('http://localhost:3000/leetcode/problems');
        const data = response?.data;
        const problem = data?.stat_status_pairs.find((p) => p.stat.question__title_slug === slug);
          
        if (problem) {
          navigate(`/problem/${problem.stat.question_id}`);
        } else {
          setError("Problem not found");
          setTimeout(() => setError(''), 2000);
        }
      } catch (error) {
        setError('Error fetching LeetCode API: ' + error.message);
        setTimeout(() => setError(''), 2000);
      }
    } else {
      setError("Please enter a valid problem URL");
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }


  const handleInputChange = (event) => {
    const input = event.target.value;
    setLink(input);
    const match = input.match(/leetcode.com\/problems\/([\w\d\-]+)(\/.*)?/);
    if (match) {
      setSlug(match[1]);
    } else {
      setSlug('');
    }
  };  

  return (
    <>
      {/* Top Navigation */}
      <a href="/">
        <div className="absolute top-0 left-0 w-full justify-center flex items-center px-8 py-6 cursor-pointer">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
          <div className="text-white text-xl font-semibold">MeetCode</div>
        </div>
      </a>
      

      {/* Main Content */}
      <div className="h-full w-full mt-[35vh]">
        
        <form className="flex justify-center flex-col items-center" onSubmit={(e) => e.preventDefault()}>
          {/* Select Interview Title */}
          <h1 className="text-white text-3xl font-bold">Select Interview</h1>

          {/* Input Box */}
          <input 
            type="text" 
            onChange={handleInputChange}
            placeholder="Paste Leetcode Link..." 
            className="w-100 mt-5 px-4 p-2 rounded-[50px] border-3 border-(--code-text) bg-(--background) text-(--code-text) placeholder-(--code-text)/70 focus:outline-none focus:ring-2 focus:ring-(--orange)"
          />

          {/* Start Interview Button */}
          <button 
            onClick={handleSubmit}
            className="mt-4 w-100 p-2 border-3 border-(--orange) rounded-[50px] bg-(--orange) text-(--background) transition duration-300 cursor-pointer"
          >
            Start Interview
          </button>

          {error && 
            <p className="mt-3 text-(--red)">{error}</p>
          }
        </form>
        

      </div>
    </>
  )
}

export default SelectProblem