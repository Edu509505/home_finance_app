import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react"
import { Text, View, StyleSheet, Button } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
interface Post {
    id: number,
    title: string,
    content: string,
    user_id: number
}

export default function posts() {

    const [posts, setPosts] = useState<Post[]>([]);
    const { userId } = useLocalSearchParams();
    console.log('params ', userId)
    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`http://10.21.144.197:3000/users/${userId}/posts`);
            const body: Post[] = await response.json();
            console.log('body ', body);
            setPosts(body)
        }
        fetchPosts();
    }, []);

    return (
        <View>
            <Text>Lista de Posts</Text>
            <Text>Essa é a página de post do {userId}</Text>
            {
                posts.map((posts) => {
                    return (
                        <View key={posts.id}>
                            <Text>{posts.title}</Text>
                            <Text>{posts.content}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    point: {
        width: 50,
        height: 50,
        backgroundColor: '#D7FEFF',
        zIndex: 20,
        position: 'absolute',
        right: 10,
        bottom: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'black 0px 0px 10px'
    }
})
