import { router } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function addUser() {

    return (
        <View style={style.inicio}>
            <Text style={{ fontSize: 25, fontWeight: 900, margin: 10 }}>Cadastro de Usuário</Text>
            <View style={{ width: '70%', margin: 5 }}>

                <Text style={{ fontWeight: 900, margin: 2 }}>E-Mail</Text>
                <TextInput style={style.textInput}
                    placeholder="Digite seu E-Mail"
                />

                <Text style={{ fontWeight: 900, margin: 2 }}>Nome</Text>
                <TextInput style={style.textInput}
                    placeholder="Digite seu nome"
                />

                <Text style={{ fontWeight: 900, margin: 2 }}>Hirarquia</Text>
                <TextInput style={style.textInput}
                    placeholder="Hierarquia"
                />

                <Text style={{ fontWeight: 900, margin: 2 }}>Sua Idade</Text>
                <TextInput style={style.textInput}
                    placeholder="Digite sua idade"
                    keyboardType='numeric'
                />

                <Text style={{ fontWeight: 900, margin: 2 }}>Renda</Text>
                <TextInput style={style.textInput}
                    placeholder="Renda"
                    keyboardType='numeric'
                />

                <View style={{ flexDirection:'row',justifyContent:'space-evenly', margin: 12}}>
                    <Button 
                    title='Cadastrar'
                    />
                    <Button 
                    title='Cancelar'
                    color='red'

                    onPress={() => {
                        router.back();
                    }}
                    />
                </View>

            </View>

        </View>
    );
};

const style = StyleSheet.create({
    inicio: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        height: 40,
        margin: 2,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})