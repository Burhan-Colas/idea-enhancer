//-------------------------------------------------------------------------------------------------------
// import React, { useEffect, useState } from 'react';

// export default function ConversationalPrompt({ aiResponse }) {

//   const [data, setData] = useState([]);
//   const [currentNumber, setCurrentNumber] = useState(0);
//   const [processType, setProcessType] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:8000/')
//       .then(res => res.json())
//       .then(data => setData(data))
//       .catch(err => console.log(err));
//   }, [])

//   const getNextQuestion = () => {
//     if (processType) {
//       setCurrentNumber(prevNumber => prevNumber + 1);
//     } else {
//       alert('Please select a Process Type before moving to the next question.');
//     }
//   }

//   return (
//     <div className='ConversationalPrompt-prompt'>
//       <h2 className='heading-prompt'>AI PROMPTS</h2>

//       <div className='response-background-div-prompt'>
//         {aiResponse && (
//           <div>
//             <p className='ai-response-prompt'>{aiResponse.role} : {aiResponse.content}</p>
//           </div>
//         )}

//         {data.filter(question => question.ProcessType === processType && question.Step === currentNumber)
//           .map((question, index) => (
//             <div key={index}>
//               <p className='integrated-questions-prompt'>{question.Description}</p>
//             </div>
//           ))}


//         {currentNumber === 0 && (
//           <div>
//             <p>What is the Process Type of your idea?</p>
//             <label>
//               <input type='radio' name='firstQuestion' value='Revenue Generating' onChange={(e) => setProcessType(e.target.value)} /> Revenue Generating
//             </label>
//             <label>
//               <input type='radio' name='firstQuestion' value='Cost Reduction' onChange={(e) => setProcessType(e.target.value)} /> Cost Reduction
//             </label>
//           </div>
//         )}

//         {currentNumber === 1 && (
//           <div>

//             <label>question2</label>
//             <input type='text'></input>
//           </div>
//         )}

//         {currentNumber === 2 && (
//           <div>
//             <label>question3</label>
//             <input type='text'></input>
//           </div>
//         )}
//       </div>

//       <div className='div-buttons-prompt'>
//         {currentNumber < 10 ? (
//           <button className='button-next-prompt' onClick={getNextQuestion}>Next</button>
//         ) : (
//           <button className='button-submit-prompt'>Submit</button>
//         )}
//       </div>
//       <p>Current Number: {currentNumber}</p>
//     </div>
//   );
// }

//---------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';

export default function ConversationalPrompt({ aiResponse }) {

  const [data, setData] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [processType, setProcessType] = useState('');
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const getNextQuestion = () => {
    if (processType) {
      setCurrentNumber(prevNumber => prevNumber + 1);
    } else {
      alert('Please select a Process Type before moving to the next question.');
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      const filteredQuestions = data.filter(question => question.ProcessType === processType && question.Step === currentNumber);
      if (filteredQuestions.length > 0) {
        setQuestion(filteredQuestions[0]);
      }
    }
  }, [data, processType, currentNumber]);

  return (
    <div className='ConversationalPrompt-prompt'>
      <h2 className='heading-prompt'>AI PROMPTS</h2>

      <div className='response-background-div-prompt'>
        {aiResponse && (
          <div>
            <p className='ai-response-prompt'>{aiResponse.role} : {aiResponse.content}</p>
          </div>
        )}

        {/* {question && (
          <div>
            <p className='integrated-questions-prompt'>{question.Description}</p>
          </div>
        )} */}

        {currentNumber === 0 && (
          <div>
            <p>What is the Process Type of your idea?</p>
            <label>
              <input type='radio' name='firstQuestion' value='Revenue Generating' onChange={(e) => setProcessType(e.target.value)} /> Revenue Generating
            </label>
            <label>
              <input type='radio' name='firstQuestion' value='Cost Reduction' onChange={(e) => setProcessType(e.target.value)} /> Cost Reduction
            </label>
          </div>
        )}

        {currentNumber === 1 && (
          <div>
            <label>{question && question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 2 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 3 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 4 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 5 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 6 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 7 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 8 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 9 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}

        {currentNumber === 10 && (
          <div>
            <label>{question.Description}</label>
            <input type='text'></input>
          </div>
        )}
      </div>

      <div className='div-buttons-prompt'>
        {currentNumber < 10 ? (
          <button className='button-next-prompt' onClick={getNextQuestion}>Next</button>
        ) : (
          <button className='button-submit-prompt'>Submit</button>
        )}
      </div>
      <p>Current Number: {currentNumber}</p>
    </div>
  );
}
