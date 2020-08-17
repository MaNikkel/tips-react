import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import styled, { css } from 'styled-components';



const TipStyledCss = ({ offsetTop, offsetLeft, offsetHeight, directionRule }) => css`
    background: red;
    display: inline-block;
    position: absolute;

    transition: all 0.3s ease;
    &.not-visible{
        top: ${directionRule.notVisible.vertical};
        left: ${directionRule.notVisible.horizontal};
        opacity: 0;
    }
    &.visible{
        opacity: 1;
        top: ${directionRule.visible.vertical};
        left: ${directionRule.visible.horizontal};
    }

`

const TipStyled = styled.div`${TipStyledCss}`

export const Tip = ({ reference, hide, delay, interval, direction } ) => {

    const [ visible, setVisible ] = useState(false);
    const [ directionRule, setDirectionRule ] = useState({
        notVisible: {
            vertical: "",
            horizontal: ""
        },
        visible: {
            vertical: "",
            horizontal: ""
        }
    });
    const [ currentOffsets, setCurrentOffsets ] = useState({
        offsetTop: 0,
        offsetLeft: 0,
        offsetHeight: 0,
        offsetWidth: 0
    })



    useEffect(() => {
        const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = reference.current;
        console.log(reference)
        setCurrentOffsets({offsetTop, offsetLeft, offsetHeight, offsetWidth});
        setTimeout(() => {
            setVisible(true);
        }, delay);

        if(interval > 0) {
            setTimeout(() => {
                setVisible(false);
            }, interval)
        }

    }, [ reference, delay, interval ]);

    useEffect(() => {
        switch(direction) {
            case "down":
                setDirectionRule({
                    notVisible: {
                        vertical: `${currentOffsets.offsetTop - currentOffsets.offsetHeight - 18}px`, 
                        horizontal: `${currentOffsets.offsetLeft}px`
                    },
                    visible: {
                        vertical: `${currentOffsets.offsetTop - currentOffsets.offsetHeight}px`,
                        horizontal: `${currentOffsets.offsetLeft}px`
                    }});
                break;
            default:
                setDirectionRule({
                    notVisible: {
                        vertical: `${currentOffsets.offsetTop + currentOffsets.offsetHeight + 18}px`, 
                        horizontal: `${currentOffsets.offsetLeft}px`
                    },
                    visible: {
                        vertical: `${currentOffsets.offsetTop + currentOffsets.offsetHeight}px`,
                        horizontal: `${currentOffsets.offsetLeft}px`
                    }});
                break;
        }
    }, [direction, currentOffsets])

    useEffect(() => {
        setVisible(false)
    }, [hide])


    return (
        <>
           <TipStyled 
                className={visible ? "visible" : "not-visible"}
                directionRule={directionRule}
                offsetTop={currentOffsets.offsetTop} 
                offsetLeft={currentOffsets.offsetLeft} 
                offsetHeight={currentOffsets.offsetHeight}
                offsetWidth={currentOffsets.offsetWidth}>
                teste
            </TipStyled>
        </>
    )
}

Tip.propTypes = {
    reference: PropTypes.any, 
    hide: PropTypes.bool, 
    delay: PropTypes.number, 
    interval: PropTypes.number,
    direction: PropTypes.string
}

Tip.defaultProps = {
    hide: false,
    delay: 1000,
    interval: 0,
    direction: "up"
}