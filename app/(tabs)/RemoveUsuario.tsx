import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function RemoverUsuarioScreen() {
  const navigation = useNavigation();

  const removerUsuario = async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      Alert.alert('Sucesso', 'Usuário removido!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Confirmar Remoção" onPress={removerUsuario} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
