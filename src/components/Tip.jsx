import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';



const TipStyledCss = ({ offsetTop, offsetLeft, offsetHeight }) => css`
    background: red;
    display: inline-block;
    position: absolute;
    opacity: 0;
    top: ${offsetTop + offsetHeight + 18}px;
    left: ${offsetLeft}px;
    transition: all 0.3s ease;
    &.not-visible{
        top: ${offsetTop + offsetHeight + 18}px;
        opacity: 0;
    }
    &.visible{
        opacity: 1;
        top: ${offsetTop + offsetHeight}px;
    }

`

const TipStyled = styled.div`${TipStyledCss}`

export const Tip = ({ reference, hide = false, delay = 1000, interval = 5000 } ) => {

    const [ visible, setVisible ] = useState(false);
    const [ currentOffsets, setCurrentOffsets ] = useState({
        offsetTop: 0,
        offsetLeft: 0,
        offsetHeight: 0
    })



    useEffect(() => {
        const { offsetTop, offsetLeft, offsetHeight } = reference.current;
        setCurrentOffsets({offsetTop, offsetLeft, offsetHeight});
        setTimeout(() => {
            setVisible(true);
        }, delay);

        setTimeout(() => {
            setVisible(false);
        }, interval)

    }, [ reference, delay, interval ]);

    useEffect(() => {
        setVisible(false)
    }, [hide])


    return (
        <>
           <TipStyled 
                className={visible ? "visible" : "not-visible"}
                offsetTop={currentOffsets.offsetTop} 
                offsetLeft={currentOffsets.offsetLeft} 
                offsetHeight={currentOffsets.offsetHeight}>
                teste
            </TipStyled>
        </>
    )
}