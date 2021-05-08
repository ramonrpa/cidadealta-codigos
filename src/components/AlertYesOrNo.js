import React from 'react'
import styled from 'styled-components'

import Button from './Button'
import Card from './Card'

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
    color: #ffc107;
    font-size: 50px;
    margin-bottom: 20px;
`

const AlertYesOrNo = props => {

    return (
        <AlertStyled actived={props.show}>
            <Card style={{ textAlign: 'center', ...props.style }}>
                <AlertIcon>
                    <i className="fas fa-exclamation-triangle"></i>
                </AlertIcon>
                <h2>{props.message}</h2>
                <div>
                    <Button type='success' onClick={props.onAccept}>Sim</Button>
                    <Button style={{ marginLeft: '1rem' }} type='error' onClick={props.onDeny}>Não</Button>
                </div>
            </Card>
        </AlertStyled>
    )
}

export default AlertYesOrNo