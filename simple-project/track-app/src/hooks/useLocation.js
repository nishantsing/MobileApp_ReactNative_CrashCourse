import { useState, useRef, useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager";


// 🔥 Background task (required)
TaskManager.defineTask("TRACKING_TASK", ({ data, error }) => {
    if (error) return;
    const { locations } = data;
    // Call your same callback
    locations && onUpdate(locations[0]);
});

export default (isFocused, onUpdate) => {
    const [err, setErr] = useState(null);
    // const [subscriber, setSubscriber] = useState(null)
    // const watcherRef = useRef(null);
    const subscriber = useRef(null)
    const stopWatching = async () => {
        if (subscriber.current) {
            subscriber.current.remove();
            subscriber.current = null;
        }
        // 🔥 Stop background updates too
        const isBg = await Location.hasStartedLocationUpdatesAsync("TRACKING_TASK");
        if (isBg) await Location.stopLocationUpdatesAsync("TRACKING_TASK");
    };
    // Keep recording flag updated
    // const recordingRef = useRef(getRecording());
    /* useEffect(() => {
        recordingRef.current = getRecording();
    }, [getRecording]);
 */
    useEffect(() => {
        const watchLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErr('Permission to access location was denied');
                    return;
                }

                subscriber.current = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10,
                    },
                    onUpdate
                );
            } catch (e) {
                setErr(e.message || e);
            }
        };

        // 🔥 Background tracking
        const startBackground = async () => {
            const { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Background permission not granted");
                return;
            }

            await Location.startLocationUpdatesAsync("TRACKING_TASK", {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10,
                showsBackgroundLocationIndicator: true,
                foregroundService: {
                    notificationTitle: "Tracking Active",
                    notificationBody: "Location tracking in background",
                },
            });
        };

        if (isFocused) {
            if (!subscriber.current) watchLocation();
            // Always start background mode too
            startBackground(); // 🔥 added
        } else {
            stopWatching()

        }

        // return () => watcherRef.current?.remove();
        return () => {
            stopWatching()
        }
    }, [isFocused, onUpdate]);



    return [err];
};
