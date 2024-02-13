

// import React, { useEffect, useState } from 'react';
// import Global from "../Global"


// export default function ConversationalPrompt({ aiResponse }) {

//   const [data, setData] = useState([]);
//   const [currentNumber, setCurrentNumber] = useState(0);
//   const [processType, setProcessType] = useState('');
//   const [question, setQuestion] = useState(null);
//   const [multipleChoiceReturn, setMultipleChoiceReturn] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:8000/')
//       .then(res => res.json())
//       .then(data => setData(data))
//       .catch(err => console.log(err));
//   }, []);

//   const getNextQuestion = () => {

//     if (processType) {
//       if ((question != null) && (question.IsMultipleChoice === 1)) {
//         // make sure they choose a multiple choice question, if so, then continue, otherwise send an alert:
//         if (!multipleChoiceReturn) {
//           alert('Please select an option before moving to the next question.');
//           return;
//         } 
        
//         setCurrentNumber(prevNumber => prevNumber + 1);
//         Global.answers.push(multipleChoiceReturn);
//         // Reset the selection for the next question
//         setMultipleChoiceReturn('');
//       }
//       else {
//         setCurrentNumber(prevNumber => prevNumber + 1);
//       }
//     } else {
//       alert('Please select a Process Type before moving to the next question.');
//     }
//   }

//   const storeMultipleChoiceAnswer = (aAnswer) => {
//     setMultipleChoiceReturn(aAnswer);    
//   }

  
//   const setButtons = (aSplit) => {
 
//     var buttonsText = [];    
 
//     if (aSplit == null) {
//       return buttonsText;
//     }

//     for (let i = 1; i < aSplit.length; i++) {
//       buttonsText.push(
//         <label>
//           <input type='radio' name={currentNumber} value={aSplit[i]}  checked={multipleChoiceReturn === aSplit[i]}
//           onChange={(e) => storeMultipleChoiceAnswer(e.target.value)} />
//           {aSplit[i]} </label>
//       );
//     }
    
  
//     return <div>{buttonsText}</div>
//   }

//   const submitAnswers = () => {
//     Global.answers.push(multipleChoiceReturn);
//     for (let i = 0; i < Global.answers.length; i++) {
//       console.log('answers[' + i + '] is:' + Global.answers[i])
//     }
    
//     alert('Your answer have been submitted to the database.');
//   }


//   useEffect(() => {
//     if (data.length > 0) {
//       const filteredQuestions = data.filter(question => question.ProcessType === processType && question.Step === currentNumber);
//       if (filteredQuestions.length > 0) {
//         setQuestion(filteredQuestions[0]);
//       }
//     }
//   }, [data, processType, currentNumber]);

  
//   if ((question != null) && (question.IsMultipleChoice === 1)) {
//     let sAnswers = question.ItemsToAnswer;
//     var split = sAnswers.split('.');
 
//     for (let i = 0; i < split.length; i++) {
//       // remove the number from the end of each string:
//       if (i < split.length -1) {
//         split[i] = split[i].substring(0, split[i].length - 2);
//       }
//     }
//   }
  
//   return (
    
//     <div className='ConversationalPrompt-prompt'>
//       <h2 className='heading-prompt'>AI PROMPTS</h2>

//       <h3 className='small-heading-prompt'>AI Generated Response:</h3>
//       <div className='response-background-AI-prompt'>

//         {aiResponse && (
//             <div>
//               <p className='ai-response-prompt'>{aiResponse.role} : {aiResponse.content}</p>
//             </div>
//           )}

//       </div>

//       <h3 className='small-heading-prompt'>Questions:</h3>
//       <div className='response-background-question-prompt'>
//         {currentNumber === 0 && (
//           <div className='question-display-prompt'>
//             <label>What is the Process Type of your idea?</label>
//             <label>
//               <input type='radio' name='firstQuestion' value='Revenue Generating' onChange={(e) => setProcessType(e.target.value)} /> Revenue Generating
//             </label>
//             <label>
//               <input type='radio' name='firstQuestion' value='Cost Reduction' onChange={(e) => setProcessType(e.target.value)} /> Cost Reduction
//             </label>
//           </div>
//         )}
      
//       {(question != null) && (question.IsMultipleChoice === 0) && (
//           <div className='question-display-prompt'>
//           <label>{question.Description}</label>
//           <textarea className='textarea-answer-prompt' type='text'></textarea>
//         </div>
//         )}

//         {(question != null) && (question.IsMultipleChoice === 1) && (
//           <div className='question-display-prompt'>
//             <label>{question.Description}</label>
//             <div className="Container"> {setButtons(split)}</div>
//           </div>
//         )}

//       </div>

//       {/* <div>{Global.answers[5]}</div> */}

//       <div className='div-buttons-prompt'>
//         {currentNumber < 10 ? (
//           <button className='button-next-prompt' onClick={getNextQuestion}>Next</button>
//         ) : (
//           <button className='button-submit-prompt' onClick={submitAnswers}>Submit</button>
//         )}
//       </div>
//       <p>Current Number: {currentNumber}</p>
//     </div>
//   );
// }

//------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import Global from "../Global"


export default function ConversationalPrompt({ aiResponse, onAiResponse }) {

  const [data, setData] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [processType, setProcessType] = useState('');
  const [question, setQuestion] = useState(null);
  const [multipleChoiceReturn, setMultipleChoiceReturn] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const getNextQuestion = () => {

    if (processType) {
      if ((question != null) && (question.IsMultipleChoice === 1)) {
        // make sure they choose a multiple choice question, if so, then continue, otherwise send an alert:
        if (!multipleChoiceReturn) {
          alert('Please select an option before moving to the next question.');
          return;
        } 
        
        setCurrentNumber(prevNumber => prevNumber + 1);
        Global.answers.push(multipleChoiceReturn);
        sendRequestToAI(question.Description, question.ItemsToAnswer, multipleChoiceReturn, question.AI_Instructions);
        // Reset the selection for the next question
        setMultipleChoiceReturn('');
      }
      else {
        setCurrentNumber(prevNumber => prevNumber + 1);
      }
    } else {
      alert('Please select a Process Type before moving to the next question.');
    }
  }

  const sendRequestToAI = async (description, itemsToAnswer, selectedOption,  AIinstructions) => {
    console.log(description);
    console.log(itemsToAnswer);
    console.log(selectedOption);
    console.log(AIinstructions);
    const options = {
      method: 'POST',
      body: JSON.stringify({
        description: description,
        itemsToAnswer: itemsToAnswer,
        selectedOption: selectedOption,
        AIinstructions: AIinstructions, // Include AI instructions in the request
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
  
      // Ensure data.choices is defined before accessing its properties
      if (data && data.choices && data.choices.length > 0) {
        const aiMessage = data.choices[0].message;
        onAiResponse(aiMessage);
      } else {
        console.error("Invalid response format from the OpenAI API");
      }
    } catch (error) {
      console.error(error);
    }
  }



  const storeMultipleChoiceAnswer = (aAnswer) => {
    setMultipleChoiceReturn(aAnswer);    
  }

  
  const setButtons = (aSplit) => {
 
    var buttonsText = [];    
 
    if (aSplit == null) {
      return buttonsText;
    }

    for (let i = 1; i < aSplit.length; i++) {
      buttonsText.push(
        <label>
          <input type='radio' name={currentNumber} value={aSplit[i]}  checked={multipleChoiceReturn === aSplit[i]}
          onChange={(e) => storeMultipleChoiceAnswer(e.target.value)} />
          {aSplit[i]} </label>
      );
    }
    
  
    return <div>{buttonsText}</div>
  }

  const submitAnswers = () => {
    Global.answers.push(multipleChoiceReturn);
    sendRequestToAI(multipleChoiceReturn);
    for (let i = 0; i < Global.answers.length; i++) {
      console.log('answers[' + i + '] is:' + Global.answers[i])
    }
    
    alert('Your answer have been submitted to the database.');
  }


  useEffect(() => {
    if (data.length > 0) {
      const filteredQuestions = data.filter(question => question.ProcessType === processType && question.Step === currentNumber);
      if (filteredQuestions.length > 0) {
        setQuestion(filteredQuestions[0]);
      }
    }
  }, [data, processType, currentNumber]);

  
  if ((question != null) && (question.IsMultipleChoice === 1)) {
    let sAnswers = question.ItemsToAnswer;
    var split = sAnswers.split('.');
 
    for (let i = 0; i < split.length; i++) {
      // remove the number from the end of each string:
      if (i < split.length -1) {
        split[i] = split[i].substring(0, split[i].length - 2);
      }
    }
  }
  
  return (
    
    <div className='ConversationalPrompt-prompt'>
      <h2 className='heading-prompt'>AI PROMPTS</h2>

      <h3 className='small-heading-prompt'>AI Generated Response:</h3>
      <div className='response-background-AI-prompt'>

        {aiResponse && (
            <div>
              <p className='ai-response-prompt'>{aiResponse.role} : {aiResponse.content}</p>
            </div>
          )}

      </div>

      <h3 className='small-heading-prompt'>Question: {currentNumber}/10</h3>
      <div className='response-background-question-prompt'>
        {currentNumber === 0 && (
          <div className='question-display-prompt'>
            <label>What is the Process Type of your idea?</label>
            <label>
              <input type='radio' name='firstQuestion' value='Revenue Generating' onChange={(e) => setProcessType(e.target.value)} /> Revenue Generating
            </label>
            <label>
              <input type='radio' name='firstQuestion' value='Cost Reduction' onChange={(e) => setProcessType(e.target.value)} /> Cost Reduction
            </label>
          </div>
        )}
      
      {(question != null) && (question.IsMultipleChoice === 0) && (
          <div className='question-display-prompt'>
          <label>{question.Description}</label>
          <textarea className='textarea-answer-prompt' type='text'></textarea>
        </div>
        )}

        {(question != null) && (question.IsMultipleChoice === 1) && (
          <div className='question-display-prompt'>
            <label>{question.Description}</label>
            <div className="Container"> {setButtons(split)}</div>
          </div>
        )}

      </div>

      {/* <div>{Global.answers[5]}</div> */}

      <div className='div-buttons-prompt'>
        {currentNumber < 10 ? (
          <button className='button-next-prompt' onClick={getNextQuestion}>Next</button>
        ) : (
          <button className='button-submit-prompt' onClick={submitAnswers}>Submit</button>
        )}
      </div>
    </div>
  );
}