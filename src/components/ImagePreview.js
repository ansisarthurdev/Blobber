import React from 'react'
import styled from 'styled-components'

import { selectPreview, setPreview } from '../app/appSlice'
import { useSelector, useDispatch } from 'react-redux'

//icons
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

const ImagePreview = () =>{

    const preview = useSelector(selectPreview);
    const dispatch = useDispatch();

    const closeImage = () => {
        dispatch(setPreview(null));
    }

    return(
        <Wrapper>
            <div style={{position: 'relative', zIndex: 100}}>
                <img src={preview} alt='' />
                <CloseOutline className='icon' onClick={() => closeImage()}/>
            </div>
            <BackgroundFader />
        </Wrapper>
    )
}

const Wrapper = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

.icon {
    width: 24px;
    position: absolute;
    top: -10px;
    right: -30px;
    color: white;
    cursor: pointer;
}

img {
max-width: 1200px;
max-height: 80vh;
}
`

const BackgroundFader = styled.div`
position: absolute;
z-index: 90;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: #1b1b1b80;
`

export default ImagePreview