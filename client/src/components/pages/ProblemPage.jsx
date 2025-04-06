import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import ProblemDescription from '../components/ProblemDescription';
import CodeEditor from '../components/CodeEditor';
import StartOverlay from '../components/StartOverlay';
import io from 'socket.io-client';

import { useCode } from '../context/useCode.jsx';
import { useHighlighted } from '../context/useHighlighted.jsx';

function ProblemPage() {
  const { id } = useParams(); 
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('Loading problem details...');
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Transcription useStates
  const [status, setStatus] = useState('Ready to record');
  const [averageVolume, setAverageVolume] = useState(0);
  const [recording, setRecording] = useState(false);

  // Context Hooks
  const { code } = useCode();
  const { highlighted } = useHighlighted();


  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const silenceTimerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);
  const analyzerRef = useRef(null);

  const silenceThreshold = 0.11; // Adjust based on microphone sensitivity
  const silenceDuration = 3000;

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io();
    socketRef.current = socket;
    console.log('Socket connected');
    socket.on('transcription', (data) => {
      console.log('Transcription:', data);
    });
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      socket.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(silenceTimerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const endTranscription = (analyser, dataArray) => {
    analyser.getByteFrequencyData(dataArray);
    const sum = dataArray.reduce((a, b) => a + b, 0);
    const avg = sum / dataArray.length;
    setAverageVolume(avg.toFixed(2));

    if (avg < silenceThreshold * 255) {
      if (!silenceTimerRef.current) {
        silenceTimerRef.current = setTimeout(() => {
          stopRecording();
        }, silenceDuration);
      }
    } else {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    animationFrameRef.current = requestAnimationFrame(() => endTranscription(analyser, dataArray));
  };

  const startRecording = async () => {
    if (status == 'Recording in progress...' || status == 'Processing audio...') {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyzerRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setRecording(true);
      setStatus('Recording in progress...');

      // Begin checking for silence
      endTranscription(analyser, dataArray);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setStatus('Error accessing microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setStatus('Processing audio...');
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      clearTimeout(silenceTimerRef.current);
      cancelAnimationFrame(animationFrameRef.current);

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        formData.append('code', code);
        formData.append('highlight', highlighted);
        try {
          // Set responseType to 'blob' so axios treats the response as binary data.

          // const test_res = await axios.post('http://localhost:3000/api/submit-code', formData, {
          //     headers: { "Content-Type": "multipart/form-data" },
          //     responseType: 'blob'
          //   });

          // console.log(code)

          const response = await axios.post(`/api/transcribe`, formData, {
            // headers: { "Content-Type": "multipart/form-data" },
            responseType: 'blob',
            withCredentials: true
          });
          
          // Create an object URL from the received blob.
          const mp3Blob = response.data;
          const audioUrl = URL.createObjectURL(mp3Blob);
          const audio = new Audio(audioUrl);

          audio.onended = () => {
            setStatus('Ready to record');
          };
          console.log("playing audio");
          


          audio.play();
        } catch (err) {
          console.error('Error sending audio:', err);
          setStatus('Error sending audio to server');
        }
      };
      
    }
  };




  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`/api/problem/${id}`);
        setProblem(response.data);
      } catch {
        setError("Unfortunately, this problem is not supported by our platform.");
      }
    };
    
    fetchProblem();
  }, [id]); 

  if (!problem) {
    return <div className="text-white mt-5 ml-5">{error}</div>;
  }

  const handleStartInterview = async () => {
    if (!problem || loading) return;
    setLoading(true);
  
    try {
      const response = await axios.post(`/api/start`, {
        title: problem.title,
        explanation: problem.explanation,
        examples: problem.examples
      }, {
        responseType: 'blob', // 👈 important: expecting audio
        withCredentials: true
      });

      setStatus('Processing audio...');
  
      console.log('AI Interview Started:', response.data);

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => {
        setStatus('Ready to record');
      };

      setStarted(true);
    } catch (err) {
      console.error('Failed to start the interview:', err);
      setError("Failed to start the interview. Please try again.");
    } finally {
      setLoading(false); // ✅ reset loading state
    }
  };
  

  return (
    <div className="flex flex-row h-screen">

      {/* SHOW OVERLAY IF NOT STARTED */}
      {!started && <StartOverlay isLoading={loading} onStart={() => {
        handleStartInterview();
      }} />}

      {/* Problem Description */}
      <ProblemDescription problem={problem} />
      
      {/* Code Editor */}
      <CodeEditor hasStarted={started} averageVolume={averageVolume} startRecording={startRecording} stopRecording={stopRecording} status={status} endTranscription={endTranscription}/>

    </div>
  );
}

export default ProblemPage;
