import { Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Wrapper from '@/components/Wrapper'
import { useFocusEffect } from '@react-navigation/native'
import { Context as TrackContext } from '../context/TrackContext'

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext)
    useFocusEffect(
        React.useCallback(() => {
            fetchTracks()
        }, [])
    );
    return (
        <Wrapper>
            {/* <Text className='text-3xl mt-20 font-semibold'>TrackListScreen</Text> */}
            <FlatList
                data={state}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => { navigation.navigate('TrackDetail', { id: item._id, name: item.name }) }}>
                        <Text className='border p-4 mt-5 font-semibold rounded-md bg-blue-100'>{item.name}</Text>
                    </TouchableOpacity>
                }}
            />
        </Wrapper>
    )
}

export default TrackListScreen

// const styles = StyleSheet.create({})

{/* <Button title="Go to Signin" onPress={() => navigation.navigate("Signin")} />

<TouchableOpacity onPress={() => navigation.navigate("Signin")}>
    <Text style={{ color: "blue" }}>Sign In</Text>
</TouchableOpacity> */}