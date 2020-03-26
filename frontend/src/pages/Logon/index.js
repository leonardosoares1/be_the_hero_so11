import React, { useState, useCallback } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

import api from '../../service/api'

export default function Logon() {
  const [id, setId] = useState('')

  const history = useHistory()

  const handleLogon = useCallback(async (event) => {
    event.preventDefault()

    try {
      const { data } = await api.post('sessions', { id })

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', data.name)

      history.push('/perfil')
    } catch (err) {
      alert('Falha na autenticação, tente novamente')
    }
  },[history, id])

  return (
    <div className="logon-container">
      <section className="form">
        <img alt="logo" src={logoImg} />

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"
            value={id}
          />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/cadastro">
            <FiLogIn color="#E02041" size={16} />
            Não tenho Cadastro
          </Link>
        </form>
      </section>

      <img alt="heroes" src={heroesImg} />
    </div>
  );
}
