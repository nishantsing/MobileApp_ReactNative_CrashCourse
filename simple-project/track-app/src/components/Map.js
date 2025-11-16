import { View } from "react-native";
import MapView, { Marker, Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from '../context/LocationContext'
import React, { useContext } from "react";
import { ActivityIndicator } from 'react-native';

const Map = () => {
    const { state: { currentLocation, locations } } = useContext(LocationContext)
    // console.log(locations)
    if (!currentLocation) {
        return <ActivityIndicator size="large" /* style={{ marginTop: 200 }} */ />
    }

    return (
        // <View className="flex-1 bg-white dark:bg-black">
        <View className="mt-10 h-60 rounded-2xl overflow-hidden shadow-lg">
            {/* like image component need to give width and height to display it and you can not use native wind as its not expo or RN component but a native android/ ios component */}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    ...currentLocation?.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                region={{
                    ...currentLocation?.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            // showsUserLocation
            // showsMyLocationButton
            >
                <Circle center={currentLocation?.coords} radius={30} strokeColor="rgba(158, 158, 255, 1.0)" fillColor="rgba(158, 158, 255, 0.3)" />
                {/* Polyline */}
                <Polyline
                    coordinates={locations.map(loc => loc.coords)}
                    strokeWidth={4}
                    strokeColor="blue"
                />

                {/* Optional markers */}
                <Marker
                    coordinate={currentLocation?.coords}
                    title="Current Location"
                    description="Marker example"
                >
                    {/* custom marker view — NativeWind works on these children */}
                    {/*  <View style={{ backgroundColor: 'white', padding: 4, borderRadius: 8 }}>
                            <Image source={require('./assets/pin.png')} style={{ width: 24, height: 24 }} />
                        </View> */}
                </Marker>
            </MapView>
        </View>
        // </View>
    );
}
export default Map;