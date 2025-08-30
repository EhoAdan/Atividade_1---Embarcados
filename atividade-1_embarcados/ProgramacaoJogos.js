import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconesModalidades = {
  "Atletismo": "walk-outline",
  "Badminton": "leaf-outline",
  "Futsal": "football-outline",
  "Luta Greco-Romana": "fitness-outline",
  "Nado Sincronizado": "water-outline",
};

export default function ProgramacaoJogosScreen({ navigation }) {
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState({});

  useEffect(() => {
    fetch("https://api.npoint.io/5ca63a1f5ee41a6bfa5b")
      .then(response => response.json())
      .then(json => {
        setData(json);
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Timeout de 2 segundos
      })
      .catch(error => {
        console.log("Erro ao carregar os dados", error);
        setLoading(false);
      });
    }, []);

    return(
      <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
        <FlatList
          data={data}
          renderItem={({item}) =>
          <TouchableOpacity onPress={ () => navigation.navigate('ModalidadeDetails', {modalidade: item})}>
            <View>
              <Ionicons name={iconesModalidades[item.nome]} size={24} color="black" />
              <Text style={styles.modalidade}>{item.nome}, dias {item.data1} e {item.data2}</Text>
            </View>
          </TouchableOpacity>}
        />
        <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
        </View>
      )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   padding: 15
  },
  modalidade: {
    fontSize: 18,
    height: 44,
    marginBottom: 12,
  }
})
