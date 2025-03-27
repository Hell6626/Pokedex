import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [nomes, setNomes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [consulta, setConsulta] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarNomes();
  }, [isFocused]);

  async function carregarNomes() {
    const nomesSalvos = await AsyncStorage.getItem('nomes');
    if (nomesSalvos) setNomes(JSON.parse(nomesSalvos));
  }

  async function salvarNome() {
    if (nome.trim() === '') return Alert.alert('Erro', 'Por favor, insira um nome.');

    const novaLista = editIndex !== null ? [...nomes.slice(0, editIndex), nome, ...nomes.slice(editIndex + 1)] : [...nomes, nome];

    setNomes(novaLista);
    await AsyncStorage.setItem('nomes', JSON.stringify(novaLista));
    setNome('');
    setEditIndex(null);
  }

  async function excluirNome(index) {
    const novaLista = nomes.filter((_, i) => i !== index);
    setNomes(novaLista);
    await AsyncStorage.setItem('nomes', JSON.stringify(novaLista));
  }

  function editarNome(index) {
    setNome(nomes[index]);
    setEditIndex(index);
  }

  async function limparLista() {
    await AsyncStorage.removeItem('nomes');
    setNomes([]);
  }

  function filtrarNomes() {
    return consulta.trim() === '' ? nomes : nomes.filter(nome => nome.toLowerCase().includes(consulta.toLowerCase()));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pokedex</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do Pokemon"
          placeholderTextColor="#666"
          value={nome}
          onChangeText={setNome}
        />
        <TouchableOpacity style={styles.addButton} onPress={salvarNome}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Procurar Pokemon"
        placeholderTextColor="#666"
        value={consulta}
        onChangeText={setConsulta}
      />

      <FlatList
        style={styles.list}
        data={filtrarNomes()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => editarNome(index)} style={styles.iconButton}>
                <Ionicons name="create-outline" size={20} color="#4477FF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirNome(index)} style={styles.iconButton}>
                <Ionicons name="trash-outline" size={20} color="#FF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {nomes.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={limparLista}>
          <Text style={styles.clearButtonText}>Limpar todos</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('RemoverUsuario')}>
        <Text style={styles.exitButtonText}>Sair?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#242424',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4477FF',
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  searchInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    color: '#242424',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  clearButton: {
    backgroundColor: '#FF4444',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  exitButton: {
    padding: 10,
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#4477FF',
    fontSize: 14,
    fontWeight: '500',
  },
});