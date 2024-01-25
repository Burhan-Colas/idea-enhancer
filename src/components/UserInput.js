
//-----------------------------------------------------------

// import React, { useState, useEffect } from 'react';

// import logo from './assets/colas_logo.png';
// import idea from './assets/idea_icon.png';

// export default function UserInput() {
//   const [value, setValue] = useState('');
//   const [message, setMessage] = useState(null);
//   const [userInputs, setUserInputs] = useState([]);

//   const getMessages = async () => {
//     const options = {
//       method: 'POST',
//       body: JSON.stringify({
//         message: value,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     try {
//       const response = await fetch('http://localhost:8000/completions', options);
//       const data = await response.json();
//       setMessage(data.choices[0].message);
//     } catch (error) {
//       console.error(error);
//     }

//     // Store the user's input even if the response is not stored
//     setUserInputs((prevInputs) => [...prevInputs, { role: 'user', content: value }]);
//     setValue(''); // Clear the input field after sending the message
//   };

//   useEffect(() => {
//     console.log(value, message);
//   }, [message, value]);

//   return (
//     <div className='UserInput-input'>
//       <div className='colas-logo-input'>
//         <img src={logo} alt='' width={155} height={55} />
//       </div>

//       <div className='heading-and-logo-input'>
//         <div className='idea-logo-input'>
//           <img src={idea} alt='' width={45} height={45} />
//         </div>
//         <h3 className='middle-heading-input'>Idea!!!</h3>
//       </div>

//       <ul>
//         {userInputs.map((input, index) => (
//           <li key={index}>
//             <p>{input.role}</p>
//             <p>{input.content}</p>
//           </li>
//         ))}
//         {message && (
//           <li>
//             <p>Model</p>
//             <p>{message.role}</p>
//             <p>{message.content}</p>
//           </li>
//         )}
//       </ul>

//       <div className='input-field-input'>
//         <input
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           className='user-inputfield-input'
//           placeholder='Add your suggestion...'
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               getMessages();
//             }
//           }}
//         />
//         <div className='icon-input' id='submit' onClick={getMessages}>
//           ➢
//         </div>
//       </div>
//     </div>
//   );
// }


//-------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import logo from './assets/colas_logo.png';
import idea from './assets/idea_icon.png';

export default function UserInput({ onAiResponse }) {
  const [value, setValue] = useState('');
  const [userInputs, setUserInputs] = useState([]);

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      const aiMessage = data.choices[0].message;
      onAiResponse(aiMessage); // Pass AI response to App component
    } catch (error) {
      console.error(error);
    }

    setUserInputs((prevInputs) => [...prevInputs, { role: 'user', content: value }]);
    setValue('');
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className='UserInput-input'>
      <div className='colas-logo-input'>
        <img src={logo} alt='' width={155} height={55} />
      </div>

      <div className='heading-and-logo-input'>
        <div className='idea-logo-input'>
          <img src={idea} alt='' width={45} height={45} />
        </div>
        <h3 className='middle-heading-input'>Idea!!!</h3>
      </div>

        <div className='old-user-inputs'>
        {userInputs.map((input, index) => (
          <div key={index}>
            <p className='old-text-color-input'>{input.role} : {input.content}</p>
          </div>
        ))}
      </div>

      <div className='input-field-input'>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='user-inputfield-input'
          placeholder='Add your suggestion...'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              getMessages();
            }
          }}
        />
        <div className='icon-input' id='submit' onClick={getMessages}>
          ➢
        </div>
      </div>
    </div>
  );
}
