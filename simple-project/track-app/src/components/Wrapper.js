import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wrapper = ({ children, style }) => {
    return (

        <SafeAreaView className='flex-1 bg-white px-11' style={style}>
            {children}
        </SafeAreaView>

    )
}

export default Wrapper