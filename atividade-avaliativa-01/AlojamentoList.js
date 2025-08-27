import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';

export default function ALojamentoListScreen({ navigation }) {
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/c6ff69a34370c4c7c32b")
      .then(response => response.json())
      .then(json => {
        setData(json.alojamentos ?? []);
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
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
          <TouchableOpacity onPress={ () => navigation.navigate('AlojamentoDetails', {alojamento: item})}>
            <View>
              <Text style={styles.alojamento}>{item.nome || item.name}</Text>
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
  alojamento: {
    fontSize: 18,
    height: 44,
  }
})