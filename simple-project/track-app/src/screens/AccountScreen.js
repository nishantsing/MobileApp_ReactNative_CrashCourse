import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Context as AuthContext } from '../../src/context/AuthContext';
import Wrapper from '@/components/Wrapper';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);
    return (
        <Wrapper>
            <Text className='text-3xl mt-20 font-semibold'>Account Screen</Text>
            <TouchableOpacity className='mt-12 border-2 p-5 rounded-lg bg-blue-100' onPress={() => signout()}>
                <Text className='text-xl text-center font-bold'>Log Out</Text>
            </TouchableOpacity>
        </Wrapper>

    )
}

export default AccountScreen