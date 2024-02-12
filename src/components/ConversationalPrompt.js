
// import React, { useEffect, useState } from 'react';

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
//       setCurrentNumber(prevNumber => prevNumber + 1);
//     } else {
//       alert('Please select a Process Type before moving to the next question.');
//     }
//   }


//   const setButtons = (aSplit) => {
//     //let data = this.props.data.genres;
//     var buttonsText = [];    
  
//     console.log("setButtons was called.");
//     console.log("aSplit is:" + aSplit);
//     if (aSplit == null) {
//       return buttonsText;
//     }

//     //console.log('aSplit is:' + aSplit);
//     // ignore the first entry because its before 1., so start i at 1
//     for (let i = 1; i < aSplit.length; i++) {
//       buttonsText.push(
//         <label>
//           <input type='radio' name='firstQuestion' value={aSplit[i]}
//           onChange={(e) => setMultipleChoiceReturn(e.target.value)} />
//           {aSplit[i]} </label>
//       );
//     }
  
//     return <div>{buttonsText}</div>
//   }


//   useEffect(() => {
//     if (data.length > 0) {
//       const filteredQuestions = data.filter(question => question.ProcessType === processType && question.Step === currentNumber);
//       if (filteredQuestions.length > 0) {
//         setQuestion(filteredQuestions[0]);
//       }
//     }
//   }, [data, processType, currentNumber]);

//   //console.log('question is multiple choice value is:' + question.IsMultipleChoice);

  
//   if ((question != null) && (question.IsMultipleChoice === 1)) {
//     console.log('got into currentNumber =' + currentNumber);
//     let sAnswers = question.ItemsToAnswer;
//     console.log('sAnswers is: ' + sAnswers);
//     console.log('question.ItemsToAnswer is' + question.ItemsToAnswer);

//     var split = sAnswers.split('.');
 
//     console.log('array of split is now:' + split);

//     for (let i = 0; i < split.length; i++) {
//       // remove the number from the end of each string:
//       if (i < split.length -1) {
//         split[i] = split[i].substring(0, split[i].length - 1);
//       }
//       console.log('split[' + i + '] is' + split[i]);
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
//             <p>What is the Process Type of your idea?</p>
//             <label>
//               <input type='radio' name='firstQuestion' value='Revenue Generating' onChange={(e) => setProcessType(e.target.value)} /> Revenue Generating
//             </label>
//             <label>
//               <input type='radio' name='firstQuestion' value='Cost Reduction' onChange={(e) => setProcessType(e.target.value)} /> Cost Reduction
//             </label>
//           </div>
//         )}
      
//        {(question != null) && (question.IsMultipleChoice === 0) && (
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
        

//         {
//       }
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


//----------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import Global from "../Global"


export default function ConversationalPrompt({ aiResponse }) {

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
    console.log('getNextQuestion called');
    if (processType) {
      if ((question != null) && (question.IsMultipleChoice === 1)) {
        // make sure they choose a multiple choice question, if so, then continue, otherwise send an alert:
        if (!multipleChoiceReturn) {
          alert('Please select an option before moving to the next question.');
          return;
        } 

        console.log("multiple choice return is:" + multipleChoiceReturn);
        setCurrentNumber(prevNumber => prevNumber + 1);
        Global.answers.push(multipleChoiceReturn);
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

  const storeMultipleChoiceAnswer = (aAnswer) => {
    console.log("storeMultipleChoiceAnswer aAnswer is:" + aAnswer);
    // first set the context correctly, but also store the answer globally:
    setMultipleChoiceReturn(aAnswer);
    
  }

  /*
      setButtons: functions that grabs the multiple choice string from the database, and parses it.
      The string format MUST have 1. 2. - n. in its formatting otherwise this function will return an empty array
  */
  const setButtons = (aSplit) => {
    //let data = this.props.data.genres;
    var buttonsText = [];    
  
    // console.log("setButtons was called.");
    // console.log("aSplit is:" + aSplit);
    if (aSplit == null) {
      return buttonsText;
    }

    //console.log('aSplit is:' + aSplit);
    // ignore the first entry because its before 1., so start i at 1
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
    // console.log('got to submitAnswers');
    Global.answers.push(multipleChoiceReturn);
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

  //console.log('question is multiple choice value is:' + question.IsMultipleChoice);

  
  if ((question != null) && (question.IsMultipleChoice === 1)) {
    // console.log('got into currentNumber =' + currentNumber);
    let sAnswers = question.ItemsToAnswer;
    // console.log('sAnswers is: ' + sAnswers);
    // console.log('question.ItemsToAnswer is' + question.ItemsToAnswer);

    var split = sAnswers.split('.');
 
    // console.log('array of split is now:' + split);

    for (let i = 0; i < split.length; i++) {
      // remove the number from the end of each string:
      if (i < split.length -1) {
        split[i] = split[i].substring(0, split[i].length - 2);
      }
      // console.log('split[' + i + '] is' + split[i]);
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

      <h3 className='small-heading-prompt'>Questions:</h3>
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
      <p>Current Number: {currentNumber}</p>
    </div>
  );
}

