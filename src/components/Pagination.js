import React from 'react'
import styled from 'styled-components'

const PageList = styled.ul`
    display: flex;
    justify-content: center;
    list-style-type: none;
    padding: 0;
`

const PageItem = styled.li`
    font-size: 1rem;
    cursor: pointer;
    margin: 0px 5px;

    &:hover,
    &.active {
        a {
            border-bottom: 1px var(--primary) solid;
        }
    }

    a {
        color: #000;
        border: 0px;
        border-radius: 0;
        padding: 10px 15px;
    }
`

const Pagination = props => (
    <nav aria-label="Pagination">
        <PageList>
            {props.pages.map((page, index) => {
                if (page === 'LEFT') return (
                    <PageItem key={index}
                        onClick={() => props.changePage(props.currentPage - 1)}>
                        <a aria-label="Previous">
                            <i className="fas fa-caret-left"></i>
                        </a>
                    </PageItem>
                )
                if (page === 'RIGHT') return (
                    <PageItem key={index}
                        onClick={() => props.changePage(props.currentPage + 1)}>
                        <a aria-label="Next">
                            <i className="fas fa-caret-right"></i>
                        </a>
                    </PageItem>
                )
                return (
                    <PageItem key={index} className={props.currentPage === page ? 'active' : ''}
                        onClick={() => props.changePage(page)}>
                        <a>{page}</a>
                    </PageItem>
                )
            })}
        </PageList>
    </nav>
)

export default Pagination