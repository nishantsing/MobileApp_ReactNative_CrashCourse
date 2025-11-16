import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: "https://tracker-api-9qoy.onrender.com/" // deployed the web service on render
});
// returns a axios instance with the baseurl in it similar to default axios instance

// Token automatically added to request so we dnt need to handle it in action function of reducers
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, // at request 
    (err) => { return Promise.reject(err) } // error in making request
);


export default instance