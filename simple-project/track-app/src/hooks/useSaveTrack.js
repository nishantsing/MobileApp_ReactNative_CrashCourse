import { useContext } from "react";
import { Context as LocationContext } from '../context/LocationContext'
import { Context as TrackContext } from '../context/TrackContext'
import { useNavigation } from '@react-navigation/native';

// import { Context as AuthContext } from '../context/AuthContext'

// getting the token here and passing it to the action method is the react way


export default () => {
    const navigation = useNavigation();
    const { createTrack } = useContext(TrackContext)
    const { state: { name, locations }, reset } = useContext(LocationContext)

    const saveTrack = async () => {
        await createTrack(name, locations)
        reset()
        navigation.navigate('Tracks')
    }

    return [saveTrack]
}