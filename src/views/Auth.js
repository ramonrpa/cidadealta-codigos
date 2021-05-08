import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../components/Card'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

import api from '../api'
import { setAlert, getAlert } from '../slices/alertSlice'
import { setUser, getUser } from '../slices/userSlice'

const Auth = props => {

    const alert = useSelector(getAlert)
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleInput = event => {
        switch (event.target.name) {
            case "username":
                setUsername(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
        }
    }

    const validForm = () => {
        const validations = []
        validations.push(username && username.length >= 3)
        validations.push(password && password.length >= 3)
        return validations.reduce((t, a) => t && a)
    }

    const signin = async () => {
        try {
            const response = await api(`usuarios?nome=${username}&senha=${password}`)
            if (response.data.length > 0) {
                dispatch(setUser({ username, isLogged: true }))
                dispatch(setAlert({
                    show: false,
                    message: '',
                    type: 'error'
                }))
            } else {
                dispatch(setAlert({
                    show: true,
                    message: 'Não conseguimos encontrar uma conta com essas credenciais.',
                    type: 'error'
                }))
            }
        } catch {
            dispatch(setAlert({
                show: true,
                message: 'Ocorreu um erro durante o login.',
                type: 'error'
            }))
        }
    }

    return (
        user.isLogged ?
            <Redirect to="/codigos" /> :
            <div className="auth">
                <Card style={{ textAlign: 'center', width: '300px' }}>
                    <img className="auth-logo" src="/logo.png" alt="logo" />
                    <h2 className="auth-title">Login</h2>
                    <TextInput
                        style={{ margin: '0.5rem 0px' }}
                        value={username}
                        onChange={handleInput}
                        name="username"
                        placeholder="Nome de usuário" />
                    <TextInput
                        style={{ margin: '0.5rem 0px' }}
                        value={password}
                        onChange={handleInput}
                        name="password"
                        type="password"
                        placeholder="Senha" />
                    <span className={`auth-message ${alert.show ? 'active' : ''} ${alert.type}`}>{alert.message}</span>
                    <Button onClick={signin}
                        disabled={!validForm()}>Acessar</Button>
                </Card>
            </div>
    )
}

export default Auth