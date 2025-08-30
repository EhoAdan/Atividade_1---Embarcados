import * as React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet, BackHandler, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [favoritos, setFavoritos] = React.useState([]);

  /* Da load nos favoritos */
  React.useEffect(() => {
    const loadFavoritos = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const favKeys = keys.filter(k => k.startsWith("favorito-"));
        const favs = await AsyncStorage.multiGet(favKeys);
        const parsed = favs.map(([key, value]) => JSON.parse(value));
        setFavoritos(parsed);
      } catch (error) {
        console.log("Erro ao carregar favoritos", error);
      }
    };

    loadFavoritos();

    /* reload quando a gente volta a página */
    const unsubscribe = navigation.addListener('focus', loadFavoritos);
    return unsubscribe;
  }, [navigation]);
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/jubs-atividade-01.png')} />
        <Text style={styles.title} >JUBs - 2025</Text>
        <Text style={styles.title} >Florianópolis</Text>
        <Text style={styles.title} >5 à 19 de Outubro</Text>
      </View>
      <View style={styles.button}>
        <Button title="Programação dos Jogos" onPress={() => navigation.navigate('ProgramacaoJogos')} />
      </View>

      <View style={styles.favoritosSection}>
        <Text style={styles.favoritosTitle}>⭐ Meus Favoritos</Text>
        {favoritos.length === 0 ? (
          <Text style={styles.noFavoritos}>Nenhum favorito ainda</Text>
        ) : (
          <FlatList
            data={favoritos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.favoritoItem}>
                <Text style={styles.favoritoNome}>{item.nome}</Text>
                <Button
                  title="Detalhes"
                  onPress={() => navigation.navigate('ModalidadeDetails', { modalidade: item })}
                />
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.button}>
        <Button title="Ver Alojamentos" onPress={() => navigation.navigate('AlojamentoList')} />
      </View>
      <View style={styles.button}>
        <Button title="Sair" onPress={() => BackHandler.exitApp() } />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  logo: {
    height: 160,
    width: 160,
  },
  title: {
    padding: 30,
    fontSize: 18,
  },
  button: {
    padding: 15
  },
  favoritosSection: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  favoritosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noFavoritos: {
    fontSize: 16,
    color: '#555',
  },
  favoritoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  favoritoNome: {
    fontSize: 16,
    fontWeight: '500',
  },
});
