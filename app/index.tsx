import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

interface Login {
  email: string;
  password: string;
}

export default function Login() {
  const [formLogin, setFormLogin] = useState<Login>({
    email: "",
    password: "",
  });

  async function loginUser() {
    console.log('to aqui antes', `${process.env.EXPO_PUBLIC_BACKEND_URL}/login`);
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
      },
      body: JSON.stringify({
        email: formLogin.email,
        password: formLogin.password,
      }),
    });
    console.log('to aqui depois', response);
    const responseOk = response.ok
    const body = await response.json();
    console.log('responseOk', responseOk);

    if(response.ok){
        router.push('/index2')
    }else(
        Alert.alert(
            'Erro',
            'Senha ou usuário incorreto'
        )
    )

  }
  console.log(formLogin)

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Text>Email</Text>
        <TextInput
          style={{
            height: 40,
            width: 200,
            margin: 2,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
          }}
          value={formLogin.email}
          onChangeText={(setEmail) => {
            setFormLogin({
              ...formLogin,
              email: setEmail,
            });
          }}
        ></TextInput>
        <Text>Senha</Text>
        <TextInput
          style={{
            height: 40,
            width: 200,
            margin: 2,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
          }}
          value={formLogin.password}
          onChangeText={(setPassWord) => {
            setFormLogin({
              ...formLogin,
              password: setPassWord,
            });
          }}
        ></TextInput>
        <Button title="Entrar" onPress={loginUser}/>
      </View>
    </>
  );
}
