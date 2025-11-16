import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'


// cannot use export default AuthForm = () =>{} - Error
const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <Text className='text-3xl mt-32 font-semibold'>{headerText}</Text>
            <View className='mt-8'>
                <Text className='text-xl mt-11'>Email</Text>
                <TextInput className='mt-2 border-2 '
                    // style={styles.input}
                    onChangeText={(newEmail) => setEmail(newEmail)}
                    value={email}
                    placeholder="Enter email"
                    autoCapitalize='none'
                    autoCorrect={false}
                // keyboardType="numeric"
                />

            </View>
            <View className=' mt-8'>
                <Text className='text-xl'>Password</Text>
                <TextInput className='mt-2 border-2'
                    // style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Enter password"
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry
                // keyboardType="numeric"
                />

            </View>
            {errorMessage ? <Text className='text-red-600 mt-1'>{errorMessage}</Text> : null}

            <TouchableOpacity className='mt-12 border-2 p-5 rounded-lg bg-blue-100' onPress={() => onSubmit({ email, password })}>
                <Text className='text-xl text-center font-bold'>{submitButtonText}</Text>
            </TouchableOpacity>
        </>
    )
}

export default AuthForm