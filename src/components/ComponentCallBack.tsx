import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ComponentCallBackProps {
  onEvent: () => void; //Callback
}

const ComponentCallBack: React.FC<ComponentCallBackProps> = ({ onEvent }) => {
  return (
    <View>
      <Button title="Evento filho" onPress={onEvent} />
    </View>
  );
};


export default ComponentCallBack;

const styles = StyleSheet.create({});