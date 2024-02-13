
// import React, { useState } from 'react';
// import './App.css';
// import UserInput from './components/UserInput';
// import ConversationalPrompt from './components/ConversationalPrompt';
// import FinalOutput from './components/FinalOutput';

// import './components/UserInput.css';
// import './components/ConversationalPrompt.css';
// import './components/FinalOutput.css';

// const App = () => {
//   const [aiResponse, setAiResponse] = useState(null);

//   const handleAiResponse = (response) => {
//     setAiResponse(response);
//   };

//   return (
//     <div>
//       <UserInput onAiResponse={handleAiResponse} />
//       <ConversationalPrompt aiResponse={aiResponse} />
//       <FinalOutput />
//     </div>
//   );
// }

// export default App;

//-------------------------------------------------------------------------------------------------------


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
      <UserInput onAiResponse={handleAiResponse} />
      <ConversationalPrompt aiResponse={aiResponse} onAiResponse={handleAiResponse}/>
      {windowWidth <= 430 ? null : <FinalOutput />}
    </div>
  );
}

export default App;
