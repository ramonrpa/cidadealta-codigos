import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Dashbaord from '../components/Dashboard'
import Table from '../components/Table'
import Pagination from '../components/Pagination'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import SelectInput from '../components/SelectInput'
import Alert from '../components/Alert'
import CodeModel from '../components/CodeModal'
import AlertYesOrNo from '../components/AlertYesOrNo'

import { formatDate, fetchPageNumbers } from '../utils'
import api from '../api'
import { setAlert } from '../slices/alertSlice'
import { clearPagination, setPage, setData, setTotal, setOrderBy, setSortBy, setFilterBy, setFilterValue, getPagination, setLimit } from '../slices/paginationSlice'

const Codes = props => {

    const pagination = useSelector(getPagination)
    const dispatch = useDispatch()
    const [navbarActived, setNavbarActived] = useState(true)
    const [status, setStatus] = useState({})
    const [pages, setPages] = useState([1])
    const [selected, setSelected] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [alertYesOrNo, setAlertYesOrNo] = useState({ show: false, message: '', codeId: 0 })

    useEffect(() => {
        dispatch(clearPagination())
        getStatus()
    }, [])

    useEffect(() => {
        getCodes()
    }, [pagination.currentPage, pagination.sortBy, pagination.orderBy, pagination.filterBy])

    const getCodes = useCallback(async () => {
        try {
            let url = `codigopenal?_limit=${pagination.limit}&_page=${pagination.currentPage}&_sort=${pagination.sortBy}&_order=${pagination.orderBy}`
            if (pagination.filterBy) {
                url += `&${pagination.filterBy}_like=${pagination.filterValue}`
            }
            const response = await api(url)
            dispatch(setData(response.data))
            dispatch(setTotal(response.headers['x-total-count']))
            setPages(fetchPageNumbers(response.headers['x-total-count'], pagination.limit, pagination.currentPage, 2))
        } catch { }
    }, [pagination.limit, pagination.currentPage, pagination.sortBy, pagination.orderBy, pagination.filterBy, pagination.filterValue])

    const getStatus = async () => {
        try {
            const response = await api(`status`)
            let newStatus = {}
            response.data.forEach(status => {
                newStatus[status.id] = status.descricao
            })
            setStatus(newStatus)
        } catch { }
    }

    const changeSortBy = event => {
        const name = event.target.id

        if (pagination.sortBy === name)
            dispatch(setOrderBy(pagination.orderBy === 'asc' ? 'desc' : 'asc'))
        else
            dispatch(setSortBy(name))

        dispatch(clearPagination())
    }

    const handleInput = event => {
        switch (event.target.name) {
            case 'filterBy':
                dispatch(setFilterBy(event.target.value))
                dispatch(setFilterValue(''))
                break
            case 'filterValue':
                dispatch(setFilterValue(event.target.value))
                break
            case 'limit':
                dispatch(setLimit(event.target.value))
                break
        }

        dispatch(clearPagination())
    }

    const deleteCode = async id => {
        try {
            await api.delete(`codigopenal/${id}`)
            getCodes()
            dispatch(setAlert({
                show: true,
                message: 'Codigo deletado com sucesso.',
                type: 'success'
            }))
        } catch {
            dispatch(setAlert({
                show: false,
                message: 'Não foi possivel deletar este código.',
                type: 'error'
            }))
        }
        setAlertYesOrNo({ show: false, message: '', codeId: 0 })
    }

    const dismissAlert = () => {
        dispatch(setAlert({
            show: false,
            message: '',
            type: 'success'
        }))
    }

    const save = async data => {
        let alert = {
            show: true,
            message: 'Código Penal atualizado com sucesso.',
            type: 'success'
        }
        if (selected) {
            try {
                await api.put(`/codigopenal/${selected.id}`, data)
                setShowModal(false)
            } catch (error) {
                alert.message = 'Ocorreu um erro ao tentar atualizar o Código Penal.'
                alert.type = 'error'
                console.log(error)
            }
        } else {
            try {
                await api.post('/codigopenal', data)
                alert.message = 'Novo Código Penal adicionado com sucesso.'
                setShowModal(false)
            } catch (error) {
                alert.message = 'Ocorreu um erro ao tentar adicionar um novo Código Penal.'
                alert.type = 'error'
                console.log(error)
            }
        }
        dispatch(setAlert(alert))
    }

    const getFilterByComponent = () => {
        switch (pagination.filterBy) {
            case 'nome':
            case 'multa':
                return <TextInput
                    style={{ marginLeft: '0.5rem', minWidth: '200px' }}
                    name="filterValue"
                    placeholder="Pesquise aqui..."
                    value={pagination.filterValue}
                    onChange={handleInput}
                />
            case 'status':
                return <SelectInput
                    style={{ marginLeft: '0.5rem', minWidth: '200px' }}
                    onChange={handleInput}
                    name="filterValue"
                >
                    {Object.keys(status).map(id => (<option key={id} value={id}>{status[id]}</option>))}
                </SelectInput>
            case 'dataCriacao':
                return <TextInput
                    style={{ marginLeft: '0.5rem', minWidth: '200px' }}
                    type="date"
                    name="filterValue"
                    value={pagination.filterValue}
                    onChange={handleInput}
                />
            default:
                return ''
        }
    }

    return (
        <Dashbaord actived={navbarActived} path='codes'
            onClick={() => setNavbarActived(!navbarActived)}>
            <AlertYesOrNo {...alertYesOrNo}
                style={{ maxWidth: '500px' }}
                onAccept={() => deleteCode(alertYesOrNo.codeId)}
                onDeny={() => setAlertYesOrNo({ show: false, message: '', codeId: 0 })} />
            <Alert style={{ maxWidth: '500px' }} onClick={dismissAlert} />
            <CodeModel actived={showModal} data={selected} onClose={() => setShowModal(false)} onSave={save} />
            <div style={{ display: 'flex', margin: '0.5rem 0px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Mostrando {(pagination.currentPage - 1) * pagination.limit + 1}-{(pagination.currentPage - 1) * pagination.limit + pagination.data.length} de {pagination.totalRecords}</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <SelectInput
                        style={{ minWidth: '200px' }}
                        onChange={handleInput}
                        name="filterBy"
                    >
                        <option value="">Selecione um filtro</option>
                        <option value="nome">Nome</option>
                        <option value="dataCriacao">Data</option>
                        <option value="multa">Multa</option>
                        <option value="status">Status</option>
                    </SelectInput>
                    {getFilterByComponent()}
                    {pagination.filterBy &&
                        <Button style={{ marginLeft: '0.5rem' }} onClick={getCodes}>Filtar</Button>}
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th id="nome" onClick={changeSortBy} className={`${pagination.sortBy === 'nome' ? (pagination.orderBy === 'asc' ? 'actived up' : 'actived down') : ''}`}>Nome</th>
                        <th id="dataCriacao" onClick={changeSortBy} className={`${pagination.sortBy === 'dataCriacao' ? (pagination.orderBy === 'asc' ? 'actived up' : 'actived down') : ''}`}>Data</th>
                        <th id="multa" onClick={changeSortBy} className={`${pagination.sortBy === 'multa' ? (pagination.orderBy === 'asc' ? 'actived up' : 'actived down') : ''}`}>Multa</th>
                        <th id="status" onClick={changeSortBy} className={`${pagination.sortBy === 'status' ? (pagination.orderBy === 'asc' ? 'actived up' : 'actived down') : ''}`}>Status</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {pagination.data.length > 0 ?
                        pagination.data.map(data => (
                            <tr key={data.id}>
                                <td>{data.nome}</td>
                                <td>{formatDate(data.dataCriacao)}</td>
                                <td>{data.multa}</td>
                                <td>{status[data.status]}</td>
                                <td className="edit-icon" onClick={() => {
                                    setSelected(data)
                                    setShowModal(true)
                                }}><i className="fas fa-edit"></i></td>
                                <td className="trash-icon" onClick={() =>
                                    setAlertYesOrNo({ show: true, message: 'Realmente deseja deletar este Código Penal?', codeId: data.id })}>
                                    <i className="fas fa-trash"></i>
                                </td>
                            </tr>
                        ))
                        :
                        <tr style={{ textAlign: 'center' }}>
                            <td colSpan="6">Nenhum resultado...</td>
                        </tr>}
                    <tr style={{ textAlign: 'center' }}>
                        <td colSpan="6" style={{ borderTop: '1px rgba(15, 15, 15, 0.1) solid' }}
                            onClick={() => {
                                setSelected(null)
                                setShowModal(true)
                            }}><Button>Adicionar um novo código</Button></td>
                    </tr>
                </tbody>
            </Table>
            <Pagination pages={pages} currentPage={pagination.currentPage} changePage={page =>
                dispatch(setPage(page))} />
        </Dashbaord>
    )
}

export default Codes