import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from '../styles/loginStyles';
import usePassword from '../states/usePassword';
import useEmail from '../states/useEmail';

const LoginScreen = ({ navigation }: any) => {
  const passwordRef = useRef('');
  const emailRef = useRef('');

  const {setPassword} = usePassword();
  const {setEmail} = useEmail();

  const handleLogin = () => {
    const email = emailRef.current
    const password = passwordRef.current;

    if (email && password) {
      setPassword(password);
      setEmail(email);
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => emailRef.current = text}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => (passwordRef.current = text)}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
