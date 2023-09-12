import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const App = () => {
  // Declaração de Variaveis e funções do useState
  const [inputName, setInputName] = useState('');
  const [submittedName, setSubmittedName] = useState(null);

  const handleSubmit = () => {
    setSubmittedName(inputName);
  };

  return (
    <View>
      {submittedName !== null && submittedName !== '' ? (
        <Text>Olá {submittedName}, seja bem-vindo! </Text>
      ) : (
        <>
          <Text>Para começar, digite seu nome</Text>
        </>
      )}
      <TextInput
        value={inputName}
        onChangeText={setInputName}
        placeholder="nome"
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Enviar Nome</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
