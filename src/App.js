
// import './App.css';
// import UserInput from './components/UserInput';
// import ConversationalPrompt from './components/ConversationalPrompt';
// import FinalOutput from './components/FinalOutput';

// import './components/UserInput.css';
// import './components/ConversationalPrompt.css';
// import './components/FinalOutput.css';


// function App() {
//   return (
//     <div>
//     <UserInput/>
//     <ConversationalPrompt/>
//     <FinalOutput/>
//     </div>
    
//   );
// }

// export default App;



// import './App.css';
// import UserInput from './components/UserInput';
// import ConversationalPrompt from './components/ConversationalPrompt';
// import FinalOutput from './components/FinalOutput';

// import './components/UserInput.css';
// import './components/ConversationalPrompt.css';
// import './components/FinalOutput.css';


// const App = () => {
//   return (
//     <div>
//     <UserInput/>
//     <ConversationalPrompt/>
//     <FinalOutput/>
//     </div>
    
//   );
// }

// export default App;

//------------------------------------------------------------------------------------------

import React, { useState } from 'react';
import './App.css';
import UserInput from './components/UserInput';
import ConversationalPrompt from './components/ConversationalPrompt';
import FinalOutput from './components/FinalOutput';

import './components/UserInput.css';
import './components/ConversationalPrompt.css';
import './components/FinalOutput.css';

const App = () => {
  const [aiResponse, setAiResponse] = useState(null);

  const handleAiResponse = (response) => {
    setAiResponse(response);
  };

  return (
    <div>
      <UserInput onAiResponse={handleAiResponse} />
      <ConversationalPrompt aiResponse={aiResponse} />
      <FinalOutput />
    </div>
  );
}

export default App;
