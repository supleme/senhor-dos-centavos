import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ComponentCallBack  from './src/components/ComponentCallBack';
import { data } from './src/data/data';

export default function App() {
  const handleEvent = () => {
    Alert.alert('Evento disparado pelo componente filho')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ComponentCallBack onEvent={handleEvent}/>
      <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name} - {item.description}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a1998e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
