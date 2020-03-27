import React, { useState, useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Details() {
  const navigation = useNavigation()
  const route = useRoute();

  const incident = route.params.incident
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat(
    'pt-Br',
    {
      style: 'currency',
      currency: 'BRL'
    }).format(incident.value)}`

  const handleBack = useCallback(() => {
    navigation.goBack()
  },[])

  const handleSendWhatsapp = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`)
  },[])

  const handleSendMail = useCallback(() => {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      email: [incident.email],
      body: message
    })
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={handleBack}>
          <Feather color="#E02041" name="arrow-left" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG: </Text>
          <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

          <Text style={styles.incidentProperty}>Caso: </Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Descrição: </Text>
          <Text style={styles.incidentValue}>{incident.description}</Text>

          <Text style={styles.incidentProperty}>Valor: </Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat(
              'pt-Br',
              {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
          </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso</Text>

        <Text style={styles.herDescription}>Entre em contato</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleSendWhatsapp} style={styles.action}>
            <Text style={styles.actionText}>WhastApp</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSendMail} style={styles.action}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}