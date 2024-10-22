import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ComponentCallBack  from './src/components/ComponentCallBack';
import { data } from './src/data/data';
import Card from './src/components/Card';

export default function App() {
  const handleEvent = () => {
    Alert.alert('Evento disparado pelo componente filho')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ComponentCallBack onEvent={handleEvent} />
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()} // Certifique-se de que o id seja uma string
          renderItem={({ item }) => (
            <Card>
              {item.name && (
                <Card.Header>
                  <Text>{item.name}</Text> {/* Corrigido para envolver a string dentro de <Text> */}
                </Card.Header>
              )}
              <Card.Body>
                <Text>{item.description}</Text> {/* Envolver descrição em <Text> */}
              </Card.Body>
              <Card.Footer>
                <Text>Rodapé do item {item.id}</Text> {/* Envolver rodapé em <Text> */}
              </Card.Footer>
            </Card>
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
  listContainer: {
    flex: 1,
    width: '100%',
  },
});