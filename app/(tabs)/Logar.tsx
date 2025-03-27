import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logar() {
    const usuarios = [
        { usuario: "Alexandre", senha: "1234" },
        { usuario: "Bruno", senha: "1234" },
        { usuario: "Nicolas", senha: "1234" }
    ];

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        logado();
    }, []);

    async function logado() {
        const login = await AsyncStorage.getItem('usuario');
        const senhaSalva = await AsyncStorage.getItem('senha');
        if (login && senhaSalva) {
            const usuarioEncontrado = usuarios.find(u => u.usuario === login && u.senha === senhaSalva);
            if (usuarioEncontrado) {
                setUsuario(login);
                setSenha(senhaSalva);
                navigation.navigate('Home');
            } else {
                Alert.alert("Usuário não encontrado");
            }
        }
    }

    async function fazerLogin() {
        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);
        if (usuarioEncontrado) {
            await AsyncStorage.setItem('usuario', usuario);
            const senhaEncontrada = usuarios.find(u => u.senha === senha);
            if (senhaEncontrada) {
                await AsyncStorage.setItem("senha", senha);
                navigation.navigate('Home');
            } else {
                Alert.alert("Senha incorreta");
            }
        } else {
            Alert.alert("Usuário não encontrado");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder='Usuário'
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={fazerLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 30,
        color: "#333",
    },
    input: {
        width: '100%',
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingLeft: 12,
        marginBottom: 12,
        backgroundColor: "#f9f9f9",
        fontSize: 16,
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    }
});
