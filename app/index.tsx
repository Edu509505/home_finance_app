import { useState } from "react"
import { View, Text, TextInput } from "react-native";

interface Login {
    email: string;
    password: string;
}

export default function Login() {

    const [formLogin, setFormLogin] = useState<Login>({
        email: '',
        password: ''
    })

    async function loginUser() {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: formLogin.email,
                password: formLogin.password
            })
        })
        const body = await response.json()
    }

    return (
        <>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text>Email</Text>
                <TextInput style={{
                    height: 40,
                    width: 200,
                    margin: 2,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10
                }} value={formLogin.email}
                    onChangeText={(setEmail) => {
                        setFormLogin({
                            ...formLogin,
                            email: setEmail
                        })
                    }}
                ></TextInput>
                <Text>Senha</Text>
                <TextInput style={{
                    height: 40,
                    width: 200,
                    margin: 2,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10
                }} value={formLogin.password}
                    onChangeText={(setPassWord) => {
                        setFormLogin({
                            ...formLogin,
                            password: setPassWord
                        })
                    }}
                ></TextInput>
            </View>
        </>
    )
}

