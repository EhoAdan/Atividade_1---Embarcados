import * as React from 'react';
import { Image, Text, View, StyleSheet, Button, Linking, ScrollView } from 'react-native';
import { IMAGENS_ALOJ } from './images/Images';
import { Platform } from 'react-native';

const getMapUrl = (lat, lng) => {
  return Platform.select({
    ios: `maps:0,0?q=${lat},${lng}`,
    android: `geo:0,0?q=${lat},${lng}`,
  });
};

export default function AlojamentoDetailsScreen({ route, navigation }) {
  const { alojamento } = route.params;
  const img = IMAGENS_ALOJ[alojamento?.id] || IMAGENS_ALOJ.default;
  
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <Image source={img} style={styles.cover} resizeMode="cover" />

        <Text style={styles.alojamentoName}>Nome: {alojamento.nome}</Text>
        <Text style={styles.alojamentoDetails}>CEP: {alojamento.cep}</Text>
        <Text style={styles.alojamentoDetails}>Rua: {alojamento.rua}</Text>
        <Text style={styles.alojamentoDetails}>Número: {alojamento.numero}</Text>
        <Text style={styles.alojamentoDetails}>Bairro: {alojamento.bairro}</Text>
        <Text style={styles.alojamentoDetails}>Cidade: {alojamento.cidade}</Text>
        <Text style={styles.alojamentoDetails}>Estado: {alojamento.estado}</Text>
        <Text style={styles.alojamentoDetails}>
          Valor diária:{' '}
          {alojamento.valor_diaria?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

      <View style={styles.button} >
      <Button onPress={() => Linking.openURL(getMapUrl(alojamento.geo.lat, alojamento.geo.lng)) }
        title="Ver no Mapa" />
      </View>

      <View style={styles.actions}>
        <Button
          title="Enviar E-mail"
          onPress={() => Linking.openURL(`mailto:${alojamento.email}`)}
        />
      <View style={{ height: 10 }} />
        <Button
          title="Ligar"
          onPress={() => Linking.openURL(`tel:${alojamento.telefone}`)}
        />
      </View>

      <View style={styles.button}>
        <Button title="Voltar" onPress={() => navigation.navigate('AlojamentoList')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  container: { padding: 15 },
  alojamentoName: { fontSize: 18, fontWeight: 'bold', height: 44 },
  alojamentoDetails: { fontSize: 16, height: 44 },
  actions: { paddingHorizontal: 15, paddingTop: 10 },
  button: { padding: 15 },
  cover: { width: '100%', height: 200, borderRadius: 8 },
});
