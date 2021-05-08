import styled from 'styled-components'

const Table = styled.table`
    text-align: left;
    background-color: #fff;
    width: 100%;
    border-spacing: 0;

    th {
        padding: .75rem;
        color: var(--secundary);
        padding-bottom: 10px;
        border-bottom: 1px rgba(15, 15, 15, 0.1) solid;
        cursor: pointer;

        &.actived {
            color: var(--primary);

            &:after {
                font-family: 'Font Awesome 5 Free';
                margin-left: 10px;
            }

            &.up {
                &:after {
                    content: '\f106'
                }
            }

            &.down {
                &:after {
                    content: '\f107'
                }
            }
        }
    }

    td {
        padding: .75rem;
    }

    a {
        color: #000;
        text-decoration: none;

        &:hover {
            color: var(--primary);
        }
    }
`

export default Table