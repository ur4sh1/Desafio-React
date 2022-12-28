import { useState } from 'react';
import './App.css';

function App() {
  const [local, setLocal] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event)=> {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    console.log(newDot);
    setLocal((prev) => [...prev, newDot]);
    setUndid([]);
  };

  const handleUndo = (event)=>{
    event.stopPropagation();
    
    if(local.length === 0) return;

    const lastItem =  local[local.length -1];
    setUndid((prev)=>[...prev, lastItem]);

    setLocal((prev)=> {
      const newArrayDot = [...prev].slice(0,-1);
      return newArrayDot;
    })
  };

  const handleRedo = (event)=> {
    event.stopPropagation();

    const recovereDot = undid[undid.length-1];    

    setUndid((prev)=> {
      const newArrayDot = [...prev].slice(0,-1);
      return newArrayDot;
    });

    if(recovereDot.length === 0) return;

    setLocal((prev) => [...prev, recovereDot]);
  };

  return (
    <div id="page" onClick={handleClick}>
      <button id="button" onClick={handleUndo}>Desfazer</button>
      <button id="button" onClick={handleRedo}>Refazer</button>

      {local.map((item, index)=>(
        <span key={index} className="dot" style={{left: item.clientX, top: item.clientY}} />
      ))}
    </div>
  )
}

export default App
