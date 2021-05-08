import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Card from './Card'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import TextArea from '../components/TextArea'
import SelectInput from '../components/SelectInput'

import { formatDate, formatMoney } from '../utils'
import api from '../api'

const Container = styled.div`
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
`

const InputGroup = styled.div`
    margin: 0.7rem;
    label {
        display: inline-block;
        margin-bottom: 10px;
        i {
            margin-right: 5px;
        }
    }
`

const CodeModel = props => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [penalty, setPenalty] = useState(0)
    const [time, setTime] = useState(0)
    const [status, setStatus] = useState(1)
    const [statusList, setStatusList] = useState({})

    useEffect(() => {
        getStatus()
        if (props.data) {
            setName(props.data.nome)
            setDescription(props.data.descricao)
            setDate(props.data.dataCriacao)
            setPenalty(props.data.multa)
            setTime(props.data.tempoPrisao)
            setStatus(props.data.status)
        } else {
            setName('')
            setDescription('')
            setDate('')
            setPenalty(0)
            setTime(0)
            setStatus(1)
        }
    }, [props])

    const getStatus = async () => {
        try {
            const response = await api(`status`)
            let newStatus = {}
            response.data.forEach(status => {
                newStatus[status.id] = status.descricao
            })
            setStatusList(newStatus)
        } catch { }
    }

    const validForm = () => {
        const validations = []
        validations.push(name && name.length >= 3)
        validations.push(time && time > 0)
        validations.push(description && description.length > 3)
        return validations.reduce((t, a) => t && a)
    }

    const handleInput = event => {
        const value = event.target.value
        switch (event.target.id) {
            case 'name':
                setName(value)
                break
            case 'status':
                setStatus(value)
                break
            case 'penalty':
                let newValue = value.replace(/[^\d,-]/g, '').replace(',', '.')
                newValue = parseFloat(newValue).toFixed(2)
                setPenalty(newValue)
                break
            case 'time':
                if (isNaN(value)) {
                    setTime(0)
                    break
                }
                setTime(parseInt(value))
                break
            case 'description':
                setDescription(value)
                break
        }
    }

    return (
        <Container actived={props.actived}>
            <Card style={{ minWidth: '500px' }}>
                <div style={{ display: 'flex' }}>
                    <InputGroup>
                        <label htmlFor="name"><i className="fas fa-tag"></i>Nome</label>
                        <TextInput
                            id="name"
                            value={name}
                            onChange={handleInput}
                            placeholder="Nome do Código Penal" />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="name"><i className="fas fa-toggle-on"></i>Status</label>
                        <SelectInput
                            style={{ minWidth: '200px' }}
                            id="status"
                            defaultValue={status}
                            onChange={handleInput}
                        >
                            {Object.keys(statusList).map(id => (<option key={id} value={id}>{statusList[id]}</option>))}
                        </SelectInput>
                    </InputGroup>
                </div>
                <div style={{ display: 'flex' }}>
                    <InputGroup>
                        <label htmlFor="penalty"><i className="fas fa-money-bill-wave"></i>Multa</label>
                        <TextInput
                            id="penalty"
                            value={penalty > 0 ? formatMoney(penalty) : ''}
                            onChange={handleInput}
                            placeholder="R$ 00,00" />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="time"><i className="fas fa-clock"></i>Tempo de Prisão</label>
                        <TextInput
                            id="time"
                            value={time}
                            onChange={handleInput}
                            placeholder="Tempo de Prisão para o Código Penal" />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="date"><i className="fas fa-clock"></i>Data de criação</label>
                        <TextInput
                            disabled
                            id="date"
                            value={date ? formatDate(date, true) : ''}
                            onChange={handleInput}
                            placeholder="Setado automaticamente" />
                    </InputGroup>
                </div>
                <InputGroup>
                    <label htmlFor="description"><i className="fas fa-align-left"></i>Descrição</label>
                    <TextArea
                        style={{ minWidth: 'calc(100% - (0.7rem + 10px))', minHeight: '150px' }}
                        id="description"
                        value={description}
                        onChange={handleInput}
                        placeholder="Descrição do Código Penal" />
                </InputGroup>
                <div style={{ display: 'flex', margin: '0px 0.7rem' }}>
                    <Button onClick={() => props.onSave({
                        nome: name,
                        descricao: description,
                        dataCriacao: new Date().toISOString(),
                        multa: isNaN(penalty) ? penalty : 0,
                        tempoPrisao: time,
                        status
                    })} disabled={!validForm()}>Salvar</Button>
                    <Button style={{ marginLeft: '0.7rem' }} type="error" onClick={props.onClose}>Fechar</Button>
                </div>
            </Card>
        </Container>
    )
}

export default CodeModel