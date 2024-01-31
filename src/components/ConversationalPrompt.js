//---------------------------------------------------------------


import React, { useEffect, useState } from 'react';

export default function ConversationalPrompt({ aiResponse }) {

  const [data, setData] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8000/')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])

  const filteredData = data.filter(question => question.ProcessType==='Revenue Generating' && question.Step=== currentNumber);

  const getNextQuestion = () => {
    // Increment the current number by 1
    setCurrentNumber(prevNumber => prevNumber + 1);
  }


  return (
    <div className='ConversationalPrompt-prompt'>
      <h2 className='heading-prompt'>AI PROMPTS</h2>

      <div className='response-background-div-prompt'>
      {aiResponse && (
        <div>
          <p className='ai-response-prompt'>{aiResponse.role} : {aiResponse.content}</p>
        </div>
      )}

      {filteredData.map((question, index) => ( 
            <div key={index}>
            <p className='integrated-questions-prompt'>{question.Description}</p>
          </div>

        ))}
      </div>


      <div className='div-buttons-prompt'>
        <button className='button-submit-prompt' onClick={getNextQuestion}>Next</button>
        {/* <button className='button-quit-prompt'>Quit</button> */}
      </div>
      <p>Current Number: {currentNumber}</p>

    </div>
  );
}
