import { Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'


const TrackForm = () => {
    const { state: { name, recording, locations }, startRecording, stopRecording, changeName } = useContext(LocationContext)
    const [saveTrack] = useSaveTrack()
    console.log(locations.length)
    return (
        <>
            {/* <Text className='text-xl mt-11'>Email</Text> */}
            <TextInput className='mt-12 border-2 '
                // style={styles.input}
                onChangeText={changeName}
                value={name}
                // onEndEditing={() => changeName(trackName)}
                placeholder="Name for Track"
                autoCapitalize='none'
                autoCorrect={false}
            // keyboardType="numeric"
            />
            {recording ? (<TouchableOpacity className='mt-5 border-2 p-5 rounded-lg bg-red-100' onPress={stopRecording}>
                <Text className='text-xl text-center font-bold'>Stop </Text>
            </TouchableOpacity>) : (<TouchableOpacity className='mt-5 border-2 p-5 rounded-lg bg-green-100' onPress={startRecording}>
                <Text className='text-xl text-center font-bold'>Start Recording</Text>
            </TouchableOpacity>)}
            {
                !recording && locations.length ? (<TouchableOpacity className='mt-5 border-2 p-5 rounded-lg bg-blue-100' onPress={saveTrack}>
                    <Text className='text-xl text-center font-bold'>Save</Text>
                </TouchableOpacity>) : null
            }

        </>
    )
}
export default React.memo(TrackForm)