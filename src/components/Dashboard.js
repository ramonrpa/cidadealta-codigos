import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { getUser, setUser } from '../slices/userSlice'

const SideNavbar = styled.div`
    height: 100%;
    width: ${props => props.actived ? '250px' : '90px'};
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--secundary);
    transition: all 0.5s;
    color: #fff;
    overflow-x: hidden;

    @media (max-width: 700px){
        width: ${props => props.actived ? '150px' : '90px'};
    } 

`

const NavHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.actived ? 'left' : 'center'};
    padding: 20px 20px;
    border-bottom: 2px rgba(255, 255, 255, 0.1) solid;

    img {
        width: ${props => props.actived ? '35px' : '40px'};
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
        margin-left: 10px;
        display: ${props => props.actived ? 'block' : 'none'};
    }
`

const NavItens = styled.div`
    display: flex;
    flex-direction: column;

    a {
        display: flex;
        align-items: center;
        justify-content: ${props => props.actived ? 'left' : 'center'};
        color: #CCC;
        text-decoration: none;
        margin: 10px 0px;
        padding: 5px 15px;
        transition: all 0.3s;

        &.active,
        &:hover {
            border-left: 5px var(--primary) solid;
            color: #fff;
        }

        i {
            font-size: ${props => props.actived ? '10px' : '25px'};
            margin-right: 10px;
        }

        span {
            display: ${props => props.actived ? 'block' : 'none'};
        }
    }
`

const Content = styled.div`
    height: 100%;
    margin-left: ${props => props.actived ? '250px' : '90px'};
    background-color: #eee;
    transition: margin-left .5s;
    overflow-x: hidden;

    @media (max-width: 700px){
        margin-left: ${props => props.actived ? '150px' : '90px'};
    } 
`

const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff;

    .nav-button {
        color: #aaa;
        cursor: pointer;
        font-size: 1rem;

        &:hover {
            color: var(--primary);
        }
    }

    .nav-account {
        color: #aaa;
        cursor: pointer;
        font-size: 1rem;
        padding: 8px;
        border: 1px solid;
        border-radius: 50%;

        &:hover {
            color: var(--primary);

            i {
                border-color: var(--primary);
            }
        }
    }
`

const ContentChildren = styled.div`
    padding: 20px;
    overflow-x: auto;
`

const User = styled.div`
    position: relative;
    width: 100%;
    text-align: end;
`

const UserDropdown = styled.div`
    position: absolute;
    right: ${props => props.actived ? '0' : '-500px'};
    background-color: #aaa;
    color: #fff;
    margin: 5px 0px;
    padding: 0;
    z-index: 100;
    text-align: start;
    transition: right 0.2s;

    span {
        display: block;
        padding: .5rem 1.5rem;
        cursor: pointer;
        color: #eee;

        &:hover {
            color: #fff;
        }
    }
`

const Dashbaord = props => {

    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const [dropdownShow, setDropdownShow] = useState(false)

    return (
        <Fragment>
            <SideNavbar actived={props.actived}>
                <NavHeader actived={props.actived}>
                    <img src="/logo.png" alt="logo" />
                    <h2>{user.username}</h2>
                </NavHeader>
                <NavItens actived={props.actived}>
                    <Link to="/codigos" className={props.path === 'codes' ? 'active' : ''}><i className="fas fa-file-contract"></i> <span>Códigos Penais</span></Link>
                </NavItens>
            </SideNavbar>
            <Content actived={props.actived}>
                <ContentHeader>
                    <i className="nav-button fas fa-bars" onClick={props.onClick}></i>
                    <User>
                        <i className="nav-account fas fa-user" onClick={() => setDropdownShow(!dropdownShow)}></i>
                        <UserDropdown actived={dropdownShow}>
                            <span>Meu Perfil</span>
                            <span onClick={() => dispatch(setUser({ username: '', isLogged: false }))}>Sair</span>
                        </UserDropdown>
                    </User>
                </ContentHeader>
                <ContentChildren>
                    {props.children}
                </ContentChildren>
            </Content>
        </Fragment>)
}

export default Dashbaord
