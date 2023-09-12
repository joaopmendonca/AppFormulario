import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [inputName, setInputName] = useState('');
  const [submittedName, setSubmittedName] = useState(null);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setSubmittedName(storedName);
        }
      } catch (error) {
        Alert.alert('Erro ao carregar o nome', error.message);
      }
    };
    loadUserName();
  }, []);

  const saveUserName = async () => {
    try {
      await AsyncStorage.setItem('name', inputName.toString());
      Alert.alert('Nome de Usuário Salvo!');
    } catch (error) {
      Alert.alert('Erro ao salvar o valor', error.message);
    }
  };

  const deleteUserName = async () => {
    try {
      await AsyncStorage.removeItem('name');
      setSubmittedName(null);
      Alert.alert('Nome de Usuário Removido!');
    } catch (error) {
      Alert.alert('Erro ao remover o nome', error.message);
    }
  };

  const handleSubmit = () => {
    setSubmittedName(null);
    setSubmittedName(inputName);
    saveUserName();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Bem-vindo</Text>
      {submittedName !== null && submittedName !== '' ? (
        <Text style={styles.greeting}>Olá, {submittedName}!</Text>
      ) : (
        <Text style={styles.instructions}>Digite seu nome</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: '#3e4c67' }]} // Alterado para a cor de fundo desejada
          value={inputName}
          onChangeText={setInputName}
          placeholder="Nome"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteUserName}>
            <Text style={styles.buttonText}>Deletar Nome</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar Nome</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    backgroundColor: '#3e4c67', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
  greeting: {
    fontSize: 18,
    color: 'white', 
  },
  instructions: {
    fontSize: 18,
    color: 'white', 
  },
  inputContainer: {
    alignItems: 'center',
    width: "100%",
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#3e4c67', 
    color: 'white', 
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#fe5a76',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#0689aa', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
