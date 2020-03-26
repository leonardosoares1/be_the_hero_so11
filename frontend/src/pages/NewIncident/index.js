import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'

import api from '../../service/api'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  const handleCreateIncident = useCallback(async (event) => {
    event.preventDefault()

    try {
      await api.post('incidents', {
        title,
        description,
        value
      },
      {
        headers:{
          Authorization: ongId
        }
      })

      alert('Incidente criado com sucesso')
      history.push('/perfil')
    } catch (err) {
      alert('Falha ai cadastrar novo incidente')
    }
  },[description, history, ongId, title, value])

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img alt="logo" src={logoImg} />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
        
          <Link className="back-link" to="/perfil">
            <FiArrowLeft color="#E02041" size={16} />
            Voltar para home
          </Link>
        </section>
      
        <form onSubmit={handleCreateIncident}>
          <input
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do caso"
            value={title}
          />
          <textarea
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
            value={description}
          />
          <input
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"
            value={value}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
