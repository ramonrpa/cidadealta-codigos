import React from 'react'
import styled from 'styled-components'

const Select = styled.div`
    position: relative;

    div {
        position: absolute;
        right: 12px;
        top: calc(50% - 12px);
    }

    select {
        -webkit-appearance: none;
        padding: 0.7rem 2rem 0.7rem 0.7rem;
        outline: none;
        border: none;
        border-radius: 0;
        background-color: rgba(15, 15, 15, 0.08);

        &:focus {
            outline: none;
            border: none;
            border-radius: 0;
            box-shadow: 0px 0px 4px 0px var(--primary);
        }
    }
`

const SelectInput = props => (
    <Select>
        <select {...props}>
            {props.children}
        </select>
        <div>
            <i className="fas fa-angle-down"></i>
        </div>
    </Select>
)

export default SelectInput