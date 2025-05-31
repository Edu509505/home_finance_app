import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert, Button } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
export default function atualizar() {

    const { userId } = useLocalSearchParams();

    useEffect(() => {
        async function fetchUserById() {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/movimentacao/${userId}`);
            const body = await response.json();
            console.log('aqui está: ', body);

            setmovimentacao({
                title: body.title,
                category: body.category,
                value: (parseFloat(body.value)/100).toString(),
                type: body.type
            });
        }
        fetchUserById();
    }, [userId])

    async function atualizarMovimentacao() {
        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/movimentacao/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: movimentacao.title,
                category: movimentacao.category,
                value: movimentacao.value,
                type: movimentacao.type
            })
        });

        //console.log(atualizarMovimentacao)
        if (response.ok) {
            Alert.alert(
                'Sucesso',
                'Movimentação Atualizada',
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
                'Não foi possível atualizar a movimentação',
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

    const [movimentacao, setmovimentacao] = useState({
        category: '',
        title: '',
        value: '',
        type: ''
    });
    return (
        <View style={style.main}>
            <View style={{ backgroundColor: 'rgb(0,204,82)', width: '100%', height: 75, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20, flexDirection: 'row' }}>
                <MaterialIcons name="edit-note" size={50} color="white" />
                <Text style={{ fontWeight: 500, fontSize: 30, color: 'white' }}>Editar</Text>
            </View>

            <View>
                <View style={style.contentIcone}>
                    <MaterialIcons name="description" size={24} color="black" />
                    <Text style={style.titulosInputs}>Titulo</Text>
                </View>
                <TextInput style={style.input}
                    value={movimentacao.title}
                    onChangeText={(tituloAtualizado) => {
                        setmovimentacao({
                            ...movimentacao,
                            title: tituloAtualizado
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
                    value={movimentacao.category}
                    onChangeText={(categotiaAtualizado) => {
                        setmovimentacao({
                            ...movimentacao,
                            category: categotiaAtualizado
                        })
                    }}
                />
            </View>
            <View>
                <View style={style.contentIcone}>
                    <Entypo name="credit" size={30} color="black" />
                    <Text style={style.titulosInputs}>Valor</Text>
                </View>
                <TextInput style={style.input}
                    value={movimentacao.value.toString()}
                    onChangeText={(valorAtualizado) => {
                        setmovimentacao({
                            ...movimentacao,
                            value: valorAtualizado
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
                    selectedValue={movimentacao.type}
                    onValueChange={(tipoAtualizado) => {
                        setmovimentacao({
                            ...movimentacao,
                            type: tipoAtualizado
                        })
                    }}
                >
                    <Picker.Item label="Entrada" value="Entrada" />
                    <Picker.Item label="Saída" value="Saída" />
                </Picker>
            </View>

            <Button title="Atualizar Movimentacao" onPress={atualizarMovimentacao} />
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    contentIcone: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    titulosInputs: {
        fontSize: 25,
        marginLeft: 20
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