import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Wrapper from '@/components/Wrapper'
import { useRoute } from '@react-navigation/native';
import { Context as TrackContext } from '../context/TrackContext'
import MapView, { Marker, Polyline, Circle } from "react-native-maps";
import { analyzeTrack, formatTime } from '@/utils/analyzeTrack';

const TrackDetailScreen = () => {
    const route = useRoute();
    const { id } = route.params;
    const { state } = useContext(TrackContext)
    const track = state.find(t => t._id === id)
    const initialCoords = track.locations[0].coords

    const result = analyzeTrack(track?.locations)
    return (
        /*  <ScrollView
             showsVerticalScrollIndicator={true}
             bounces={true}
             overScrollMode="always"
         > */
        <Wrapper>

            {/* <Text className='text-3xl mt-20 font-semibold'>{track.name}</Text> */}
            <View className="mt-10 h-96 rounded-2xl overflow-hidden shadow-lg">
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        ...initialCoords,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation
                // showsMyLocationButton
                >

                    {/* Polyline */}
                    <Polyline
                        coordinates={track.locations.map(loc => loc.coords)}
                        strokeWidth={4}
                        strokeColor="blue"
                    />


                </MapView>

            </View>
            <View className="mt-4 space-y-4">

                {/* Summary Card */}
                <View className="bg-white p-4 rounded-2xl shadow">
                    <Text className="text-xl font-semibold mb-2">Track Summary</Text>

                    <View className="flex-row justify-between mb-1">
                        <Text className="text-gray-600">Distance</Text>
                        <Text className="font-semibold">{Math.round(result.totalDistance)} m</Text>
                    </View>

                    <View className="flex-row justify-between mb-1">
                        <Text className="text-gray-600">Time</Text>
                        <Text className="font-semibold">{formatTime(result.totalTime)}</Text>
                    </View>

                    <View className="flex-row justify-between mb-1">
                        <Text className="text-gray-600">Avg Speed</Text>
                        <Text className="font-semibold">{result.avgSpeedKph} m/s</Text>
                    </View>
                </View>

                {/* Segments Card */}
                {/* <View className="bg-white p-4 rounded-2xl shadow mt-4">
                        <Text className="text-xl font-semibold mb-2">Segments</Text>

                        {result.segments.map((seg, i) => (
                            <View key={i} className="mb-2">
                                <Text className="font-medium">Segment {i + 1}</Text>

                                <View className="ml-2">
                                    <Text className="text-gray-600">Distance: {seg.distance} m</Text>
                                    <Text className="text-gray-600">Time: {seg.time} s</Text>
                                    <Text className="text-gray-600">
                                        Speed: {seg.speed.toFixed(1)} m/s
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View> */}

            </View>


        </Wrapper >
        // </ScrollView>
    )
}

export default TrackDetailScreen

const styles = StyleSheet.create({})