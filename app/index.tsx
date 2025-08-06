import { Feather, MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Text, ScrollView, Alert, Button, } from "react-native";

export default function Index() {

  const [somaSaida, setSomaSaida] = useState();
  const atualizar = useIsFocused();

  useEffect(() => {
    async function somaSaida() {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/somadosvalores`)
      const body = await response.json()
      setSomaSaida(body[2])
    }
    somaSaida()
  }, [atualizar])

  const [somaEntrada, setsomaEntrada] = useState();
  useEffect(() => {
    async function somaEntrada() {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/somadosvalores`)
      const body = await response.json()
      setsomaEntrada(body[1])
    }
    somaEntrada()
  }, [atualizar])

  const [saldo, setsaldo] = useState();
  useEffect(() => {
    async function saldo() {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/somadosvalores`)
      const body = await response.json()
      setsaldo(body[0])
    }
    saldo()
  }, [atualizar])


  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/movimentacao`);
      const body = await response.json();
      console.log('body', body);
      setUsers(body);
    };
    fetchUser();
  }, [atualizar]);


    async function deleteUser(userId: number) {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/movimentacao/${userId}`, {
        method: "DELETE"

      })

      if (response.ok) {
    
        const responseUsers = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/movimentacao`);
        const bodyUsers = await responseUsers.json();
        setUsers(bodyUsers);
        Alert.alert(
          'Sucesso!',
          'Usuário deletado com sucesso!',
          [
            {
              text: "Ok"
            }
          ]
        )
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível deletar usuário'
        )
      }
    }
  


  let corSaldo = 'white'

  if (saldo != undefined) {
    if (saldo < 0) {
      corSaldo = 'red'
    } else {
      corSaldo = 'white'
    }
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        /*backgroundColor:'#363636'*/
      }}
    >
      <View style={style.inicio}>

        <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Text style={{ fontSize: 40, fontWeight: 900, color: 'white' }}>Olá</Text>
          <Text style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>Seu saldo atual:</Text>
          <Text style={{ fontSize: 40, fontWeight: 900, color: corSaldo }}>R${saldo}</Text>
        </View>
        <View style={{ width: '100%', height: 100, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>

          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Text style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>Total de entrada:</Text>
            <Text style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>R$ {somaEntrada}</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Text style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>Total de saída:</Text>
            <Text style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>R$ {somaSaida}</Text>
          </View>
        </View>
      </View>



      <ScrollView style={{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }}>
        {users.map((movimentacao) => {
          let corTransacao = 'white'
          if (movimentacao.type == 'Saída') {
            corTransacao = 'red'
          } else {
            corTransacao = 'green'
          }

          console.log('movimentação ', movimentacao.type)

          return (

            //A View tem a propriedade Key que referencia o objeto JSON declarado lá em cima
            //declarando o id na Key no View tudo que estiver dentro dele será referenciado na 
            //na Key da View no caso o objeto pai

            <View key={movimentacao.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10, borderRadius: 15, backgroundColor: 'white' }}>
              <View style={{ width: 80, height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(124, 255, 194)', borderRadius: 100, marginRight: 10, marginLeft: 10 }}>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '71%' }}>
                <View>
                  <View style={{ width: '85%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 900 }} numberOfLines={1} ellipsizeMode="tail">{movimentacao.title}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">Categoia:{movimentacao.category}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, marginRight: 10 }}>Valor</Text>
                    <Text style={{ fontSize: 20, color: corTransacao }}>R$ {movimentacao.value / 100}</Text>
                  </View>
                  <Text>Transação: {movimentacao.type}</Text>
                </View>

                <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Link href={{
                    pathname: '/users/[userId]/atualizar',
                    params: { userId: movimentacao.id }
                  }}>
                    <View>
                      <Feather name="edit" size={30} color="black" />
                    </View>
                  </Link>

                  <TouchableOpacity onPress={() => { deleteUser(movimentacao.id) }}>
                    <MaterialIcons name="delete" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }
        )}
      </ScrollView>
      <Link href={'/users/[userId]/criar'} style={style.LinkAdd}>
        <TouchableOpacity style={style.add}>

          <Feather name="plus" size={35} color="white" />

        </TouchableOpacity>
      </Link>
    </View>
  );
}

const style = StyleSheet.create({
  inicio: {
    width: '100%',
    height: 250,
    backgroundColor: 'rgb(0,204,82)',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  styleValuePositive: {
    fontSize: 20,
    color: 'green'
  },
  styleValueNegative: {
    fontSize: 20,
    color: 'red'
  },
  LinkAdd: {
    width: 60,
    height: 60,
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  add: {
    width: 60,
    height: 60,
    backgroundColor: 'rgb(0,204,82)',
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: 2,
    width: 50,
    height: 50,
    //position: 'fixed',
    backgroundColor: 'rgb(0,204,82)',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});