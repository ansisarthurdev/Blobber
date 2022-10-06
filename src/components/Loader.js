import React from 'react'
import styled from 'styled-components'
import Jump from 'react-reveal/Jump';

const Loader = () => {
  return (
    <Wrapper>
        <Jump>
            <h3>blobber.</h3>
        </Jump>
    </Wrapper>
  )
}

const Wrapper = styled.div`
color: var(--green);
display: flex;
width: 100vw;
height: 100vh;
align-items: center;
justify-content: center;

h3 {
    user-select: none;
}
`

export default Loader