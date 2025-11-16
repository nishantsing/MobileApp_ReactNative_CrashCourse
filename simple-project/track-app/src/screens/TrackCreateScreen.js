// import '../utils/_mockLocation'
import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Wrapper from '@/components/Wrapper'
import Map from '@/components/Map'
// import { requestPermissionsAsync } from 'expo-location'
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation'
import TrackForm from '@/components/TrackForm'


const TrackCreateScreen = () => {
    const { state: { recording }, addLocation } = useContext(LocationContext)
    const [isFocused, setIsFocused] = useState(true)
    // const isFocusedRef = useRef(true);
    // Track screen focus
    useFocusEffect(
        React.useCallback(() => {
            setIsFocused(true)
            // isFocusedRef.current = true;
            return () => {
                setIsFocused(false)
                // isFocusedRef.current = false;
            };
        }, [])
    );


    const callback = useCallback(location => {
        addLocation(location, recording);
    }, [recording])
    const [err] = useLocation(isFocused || recording, callback)

    // const [err] = useLocation((location) => addLocation(location))

    return (
        // <KeyboardAvoidingView style={{ flex: 1 }}
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Wrapper>
            <Text className='text-3xl mt-20 font-semibold'>Create Track</Text>
            <View className='flex-1 '>
                <Map />
                {err ? <Text className='text-red-600 mt-1'>Please enable location services.</Text> : null}
                <TrackForm />
                {/* {location ? <Text>{JSON.stringify(location, null, 2)}</Text> : null} */}
            </View>
        </Wrapper>
        //  </KeyboardAvoidingView> 
    )
}

export default TrackCreateScreen

const styles = StyleSheet.create({})