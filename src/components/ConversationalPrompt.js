
import React from 'react';

export default function ConversationalPrompt({ aiResponse }) {
  return (
    <div className='ConversationalPrompt-prompt'>
      <h2 className='heading-prompt'>AI PROMPTS</h2>

      <div className='response-background-div-prompt'>
      {aiResponse && (
        <div>
          <p className='ai-response-prompt'>{aiResponse.role} : {aiResponse.content}</p>
        </div>
      )}

      </div>


      <div className='div-buttons-prompt'>
        <button className='button-submit-prompt'>Submit</button>
        <button className='button-quit-prompt'>Quit</button>
      </div>

    </div>
  );
}
