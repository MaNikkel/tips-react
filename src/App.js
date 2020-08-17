import React, { useRef, useState } from 'react';
import styled from "styled-components";
import { Tip } from "./components/Tip.jsx";

const AppStyled = styled.div`
  position: absolute;
  left: 50%;
  top: 80%;

`


function App() {
  const tipRef = useRef(null);
  const [show, setShow] = useState(true);

  return (
    <div className="App">

      
      <AppStyled ref={tipRef} onClick={() => {setShow(!show)}}>
        teste
      </AppStyled>
      <Tip reference={tipRef} hide={show}/>
    </div>
  );
}

export default App;
