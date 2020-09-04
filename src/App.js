import React, { useRef, useState } from 'react';
import styled from "styled-components";
import { Tip } from "./components/Tip";

const AppStyled = styled.div`
  position: absolute;
  left: 50%;
  top: 60%;

`

const StyledTip = styled.div`
  background: red;
  padding: 5px;
  transform: translate(-10px, -5px);
  /* padding: 10px;
  transform: translateY(-10px); */
`

function App() {
  const tipRef = useRef(null);
  const [show, setShow] = useState(true);

  return (
    <div className="App">
      <AppStyled ref={tipRef} onClick={() => {setShow(!show)}}>
        teste
      </AppStyled>
      <Tip reference={tipRef} hide={show} direction="right" interval={5000}>
        <StyledTip>
          teste
        </StyledTip>
      </Tip>
    </div>
  );
}

export default App;
