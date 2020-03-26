import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'

import api from '../../service/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const history = useHistory()

  const handleRegister = useCallback(async (event) => {
    event.preventDefault()

    try {
      const { data } = await api.post('ongs', {
        name,
        email,
        whatsapp,
        city,
        uf
      })
  
      alert(`Seu ID e acesso: ${data.id}`)
      history.push('/')
    } catch (err) {
      alert("Erro no caso, tente novamente")
    }

  },[city, email, history, name, uf, whatsapp])

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img alt="logo" src={logoImg} />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
        
          <Link className="back-link" to="/">
            <FiArrowLeft color="#E02041" size={16} />
            Já tenho cadastro
          </Link>
        </section>
      
        <form onSubmit={handleRegister}>
          <input
            onChange={e => setName(e.target.value)}
            placeholder="Nome da ONG"
            value={name}
          />
          <input
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            value={email}
          />
          <input
            onChange={e => setWhatsapp(e.target.value)}
            placeholder="WhatsApp"
            value={whatsapp}
          />

          <div className="input-group">
            <input
              onChange={e => setCity(e.target.value)}
              placeholder="Cidade"
              value={city}
            />
            <input
              onChange={e => setUf(e.target.value)}
              placeholder="UF" 
              value={uf}
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
