import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import usePassword from '../states/usePassword';
import useEmail from '../states/useEmail';

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

  const {password} = usePassword();
  const {email} = useEmail();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      <Text style={styles.title}> {email} </Text>
      <Text style={styles.title}> {password} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
