import { useState } from 'react';
import './App.css'

function App() {
  const [c, setC] = useState(0);

  function handleClick () {
    setC(prev => prev+1);
  }

  return (
    <div>
      Hello
      <button onClick={handleClick}>
        Click
      </button>
      <p>{c}</p>
    </div>
  )
}

export default App
