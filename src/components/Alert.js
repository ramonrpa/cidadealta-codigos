import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import Button from './Button'
import Card from './Card'

import { getAlert } from '../slices/alertSlice'

const AlertStyled = styled.div`
    position: fixed;
    top: 0;
    left: ${props => props.actived ? '0' : '100%'};
    width: 100%;
    height: 100%;
    background-color: rgba(15, 15, 15, 0.2);
    opacity: ${props => props.actived ? '1' : '0'};
    transition: opacity 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    h2 {
        font-weight: 500;
    }

    button {
        margin-top: 20px;
    }
`

const AlertIcon = styled.div`
    color: ${props => props.type === 'error' ? '#700' : '#070'};
    font-size: 50px;
`

const Alert = props => {

    const alert = useSelector(getAlert)

    return (
        <AlertStyled actived={alert.show}>
            <Card style={{ textAlign: 'center', ...props.style }}>
                <AlertIcon type={alert.type}>
                    {alert.type === 'error' ? <i className="fas fa-times-circle"></i> : <i className="fas fa-check-circle"></i>}
                </AlertIcon>
                <h2>{alert.message}</h2>
                <div>
                    <Button type={alert.type} onClick={props.onClick}>Ok</Button>
                </div>
            </Card>
        </AlertStyled>
    )
}

export default Alert