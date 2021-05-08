import styled from 'styled-components'

const Button = styled.button`
    background-color: ${props => {
        switch (props.type) {
            case 'error':
                return '#700;'
            case 'success':
                return '#070;'
            default:
                return 'var(--primary);'
        }
    }};
    padding: 0.7rem;
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
    line-height: 1.5;
    cursor: pointer;

    &:focus,
    &:active,
    &:hover {
        outline: none;
        box-shadow: 0px 0px 20px 0px ${props => {
            switch (props.type) {
                case 'error':
                    return '#700;'
                case 'success':
                    return '#070;'
                default:
                    return 'var(--primary);'
            }
        }};;
    }

    &:disabled {
        outline: none;
        box-shadow: none;
        filter: brightness(85%);
    }
`
export default Button