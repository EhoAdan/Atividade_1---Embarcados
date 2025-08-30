import * as React from 'react';
import { Image, Text, View, StyleSheet, Button, Linking, ScrollView} from 'react-native';
import { IMAGENS_MOD } from './images/Images_Mod';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMapUrl = (lat, lng) => {
  return Platform.select({
    ios: `maps:0,0?q=${lat},${lng}`,
    android: `geo:0,0?q=${lat},${lng}`,
  });
};

export default function ModalidadeDetailsScreen ({ route, navigation }) {
  const {modalidade} = route.params;
  const img = IMAGENS_MOD[modalidade?.id] || IMAGENS_MOD.default;
  
  /* Botão de favorito */
  const [favorito, setFavorito] = React.useState(false);

  /* Carrega o estado de favorito ou não favorito */
  React.useEffect(() => {
    AsyncStorage.getItem(`favorito-${modalidade.id}`).then(value => {
      if (value) setFavorito(true);
    });
  }, [modalidade.id]);

  const toggleFavorito = async () => {
    if (favorito) {
      await AsyncStorage.removeItem(`favorito-${modalidade.id}`);
      setFavorito(false);
      Alert.alert("Removido dos favoritos");
    } else {
      await AsyncStorage.setItem(`favorito-${modalidade.id}`, JSON.stringify(modalidade));
      setFavorito(true);
      Alert.alert("Adicionado aos favoritos");
    }
  };
  
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <Image source={img} style={styles.cover} resizeMode="cover" />
        <Text style={styles.modalidadeName}>{modalidade.name}</Text>
        <Text style={styles.modalidadeDados}>Primeira Disputa: {modalidade.data1} {modalidade.horário1}</Text>
        <Text style={styles.modalidadeDados}>Segunda Disputa: {modalidade.data2} {modalidade.horário2}</Text>
      </View>
      <View style={styles.button} >
      <Button onPress={() => Linking.openURL(getMapUrl(modalidade.address.geo.lat, modalidade.address.geo.lng)) }
        title="Localização" />
      </View>
      <View style={styles.button} >
        <Button 
          onPress={toggleFavorito}
          title={favorito ? "Remover dos Favoritos" : "Favoritar"} 
        />
      </View>
      <View style={styles.button} >
        <Button title="Voltar" onPress={() => navigation.navigate('ProgramacaoJogos')} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  modalidadeName: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  modalidadeDados: {
    fontSize: 16,
    height: 44,
  },
  button: {
    padding: 15
  },
  cover: { width: '100%', height: 200, borderRadius: 8 },
  
});
