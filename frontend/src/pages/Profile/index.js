import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'

import api from '../../service/api'

export default function Profile() {
  const [incidents, setIncidents] = useState([])
  
  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  const history = useHistory()

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const { data } = await api.get(`ongs/701396ec/incidents`)

        setIncidents(data)
      } catch (err) {
        alert('Falha ao buscar incidentes')
      }
    }

    loadIncidents()
  },[ongId])

  const handleLogout = useCallback(() => {
    localStorage.clear()

    history.push('/')
  },[history])

  const handleDeleteIncident = useCallback(async (incidentId) => {
    try {
      await api.delete(`incidents/${incidentId}`, {
        headers:{
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(item => item.id !== incidentId))
    } catch (err) {
      alert('Falha ao excluir incidente')
    }
  },[incidents, ongId])

  return (
    <div className="profile-container">
      <header>
        <img alt="logo" src={logoImg}/>
        <span>Bem vinda , {ongName}</span>

        <Link className="button" to="incidentes/novo">
          Cadastrar novo caso
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower color="#E02041" size={18} />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(item => (
          <li key={item.id}>
            <strong>CASO:</strong>
            <p>{item.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{item.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.value)}</p>

            <button onClick={() => handleDeleteIncident(item.id)} type="button">
              <FiTrash2 color="#A8A8B3" size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
