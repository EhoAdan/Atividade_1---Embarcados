import * as React from 'react';
import { Image, Text, View, StyleSheet, Button, Linking, ScrollView } from 'react-native';
import { IMAGENS_ALOJ } from './images/Images';
import { Platform } from 'react-native';


export default function AlojamentoDetailsScreen({ route, navigation }) {
  const { alojamento } = route.params;
  const img = IMAGENS_ALOJ[alojamento?.id] || IMAGENS_ALOJ.default;
  const mapsUrl =
    Platform.OS === 'android'
      ? `geo:${alojamento.geo.lat},${alojamento.geo.lng}?q=${alojamento.geo.lat},${alojamento.geo.lng}(${encodeURIComponent(alojamento.nome)})`
      : Platform.OS === 'ios'
      ? `http://maps.apple.com/?ll=${alojamento.geo.lat},${alojamento.geo.lng}&q=${encodeURIComponent(alojamento.nome)}`
      : `https://www.google.com/maps/search/?api=1&query=${alojamento.geo.lat},${alojamento.geo.lng}`;

  
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
      <Button onPress={() => Linking.openURL(mapUrl) }
        title="Ver no mapa" />
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
