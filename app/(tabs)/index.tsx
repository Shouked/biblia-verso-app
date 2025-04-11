import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [verso, setVerso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarVerso = async () => {
    if (carregando) return;

    try {
      setCarregando(true);
      setVerso('');

      const response = await axios.post('https://seu-nome.repl.co/verso'); // 🔁 Substitua por sua URL pública
      const novoVerso = response.data.verso?.trim();
      setVerso(novoVerso || 'Erro: verso vazio');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar o verso.');
      setVerso('Erro ao buscar verso.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verso da Bíblia (IA)</Text>

      <Button
        title={carregando ? '⏳ Gerando verso...' : '✨ Novo Verso Bíblico'}
        onPress={buscarVerso}
        disabled={carregando}
      />

      {carregando && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {verso !== '' && !carregando && <Text style={styles.verso}>{verso}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  verso: {
    marginTop: 30,
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#333',
  },
});
