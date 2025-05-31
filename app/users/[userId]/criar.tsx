import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert, Button, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';

export default function criar() {

    async function criarUsuario() {
        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/movimentacao`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: update.category,
                title: update.title,
                value: update.value,
                type: update.type
            })
        });
        if (response.ok) {
            Alert.alert(
                'Sucesso',
                'Movimentação criada',
                [
                    {
                        text: "ok", onPress: () => {
                            router.back()
                        }
                    }
                ]
            )
        } else {
            Alert.alert(
                'Erro',
                'Não foi possível criar Movimentação',
                [
                    {
                        text: "ok", onPress: () => {
                            router.back()
                        }
                    }
                ]
            )
        }
    };

    const [update, setUpdate] = useState({

        category: '',
        title: '',
        value: '',
        type: 'Entrada'

    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.main}>
                    <View style={{ backgroundColor: 'rgb(0,204,82)', width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontWeight: 500, fontSize: 30, color: 'white' }}>Criar novas movimentação</Text>
                    </View>

                    <View>
                        <View style={style.contentIcone}>
                            <MaterialIcons name="description" size={24} color="black" />
                            <Text style={style.titulosInputs}>Titulo</Text>
                        </View>
                        <TextInput style={style.input}
                            value={update.title}
                            onChangeText={(titleAtualizado) => {
                                setUpdate({
                                    ...update,
                                    title: titleAtualizado
                                })
                            }}
                        />
                    </View>
                    <View>
                        <View style={style.contentIcone}>
                            <MaterialIcons name="category" size={24} color="black" />
                            <Text style={style.titulosInputs}>Categoria</Text>
                        </View>
                        <TextInput style={style.input}
                            value={update.category}
                            onChangeText={(categoryAtualizado) => {
                                setUpdate({
                                    ...update,
                                    category: categoryAtualizado
                                })
                            }}
                        />
                    </View>
                    <View>
                        <View style={style.contentIcone}>
                            <MaterialIcons name="attach-money" size={30} color="black" />
                            <Text style={style.titulosInputs}>Valor</Text>
                        </View>
                        <TextInput style={style.input}
                            value={update.value}
                            onChangeText={(valueAtualizado) => {
                                setUpdate({
                                    ...update,
                                    value: valueAtualizado
                                })
                            }}
                        />
                    </View>

                    <View>
                        <View style={style.contentIcone}>
                            <FontAwesome6 name="money-bill-transfer" size={24} color="black" />
                            <Text style={style.titulosInputs}>Tipo de transação</Text>
                        </View>
                        <Picker style={style.input}
                            selectedValue={update.type}
                            onValueChange={(typeAtualizado) => {
                                setUpdate({
                                    ...update,
                                    type: typeAtualizado
                                })
                            }}
                        >
                            <Picker.Item label="Entrada" value="Entrada" />
                            <Picker.Item label="Saída" value="Saída" />
                        </Picker>
                    </View>

                    <Button title="Criar Movimentação" onPress={criarUsuario} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    titulosInputs: {
        fontSize: 25,
        marginLeft: 20
    },
    contentIcone: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        width: 350,
        height: 60,
        borderStyle: 'solid',
        borderRadius: 15,
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20
    }
})