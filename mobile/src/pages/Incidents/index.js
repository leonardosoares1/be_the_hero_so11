import React, { useState, useEffect, useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo.png'
import api from '../../service/api'

import styles from './styles'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const loadIncidents = async () => {
    if(loading) {
      return
    }

    if(total > 0 && incidents.length === total) {
      return
    }

    setLoading(true);

    const { data, headers } = await api.get('incidents', { params: { page }})

    setIncidents([...incidents, ...data])
    setTotal(headers['x-total-count'])

    setLoading(false);
    setPage(page + 1);
  }

  useEffect(() => {
    

    loadIncidents()
  },[])

  const handleNavigate = useCallback((incident) => {
    navigation.navigate('Details', { incident })
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

      <FlatList
        data={incidents}
        keyExtractor={item => String(item.id)}
        style={styles.incidentList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG: </Text>
            <Text style={styles.incidentValue}>{item.name}</Text>

            <Text style={styles.incidentProperty}>Caso: </Text>
            <Text style={styles.incidentValue}>{item.title}</Text>

            <Text style={styles.incidentProperty}>Valor: </Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat(
                'pt-Br',
                {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.value)}
            </Text>

            <TouchableOpacity onPress={() => handleNavigate(item)} style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>
                Ver mais detalhes
              </Text>
              <Feather color="#E02041" name="arrow-right" size={16} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}