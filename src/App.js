

import React, { useState, useEffect } from 'react';
import './App.css';
import UserInput from './components/UserInput';
import ConversationalPrompt from './components/ConversationalPrompt';
import FinalOutput from './components/FinalOutput';

import './components/UserInput.css';
import './components/ConversationalPrompt.css';
import './components/FinalOutput.css';

const App = () => {
  const [aiResponse, setAiResponse] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [multipleChoiceReturn, setMultipleChoiceReturn] = useState('');
  const [processType, setProcesType] = useState('');

  const handleProcessType = (value) => {
    setProcesType(value);
  };

  const handleMultipleChoiceReturn = (value) => {
    setMultipleChoiceReturn(value);
  };


  const handleAiResponse = (response) => {
    setAiResponse(response);
  };


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div>
      <UserInput onAiResponse={handleAiResponse} aiResponse={aiResponse} multipleChoiceReturn={multipleChoiceReturn} processType={processType}/>
      <ConversationalPrompt onAiResponse={handleAiResponse} onMultipleChoiceReturn={handleMultipleChoiceReturn} onProcessType={handleProcessType}/>
      {windowWidth <= 430 ? null : <FinalOutput />}
    </div>
  );
}

export default App;
