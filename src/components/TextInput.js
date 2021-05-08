import styled from 'styled-components'

const TextInput = styled.input`
    display: block; 
    padding: 0.7rem;
    outline: none;
    border: none;
    border-radius: 0;
    background-color: rgba(15, 15, 15, 0.08);

    &:focus,
    &:active {
        outline: none;
        border: none;
        box-shadow: inset 0 -2px 0 var(--primary);
        border-radius: 0;
    }

    &[type=date] {
        padding: 0px 0.7rem;
    }
`
export default TextInput