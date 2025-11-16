import React, { useContext, useEffect } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '@/components/AuthForm'
import Link from '@/components/Link'
import { useFocusEffect } from '@react-navigation/native';
import Wrapper from '@/components/Wrapper'

const SignupScreen = ({ navigation }) => {

    const { state, signup, clearErrorMessage } = useContext(AuthContext)

    // clear the error message whenever the screen mounts.
    /*  useEffect(() => {
         const unsubscribe = navigation.addListener("focus", () => {
             clearErrorMessage();
         });
 
         return unsubscribe;
     }, [navigation]); */

    // useFocusEffect is a React Navigation hook that runs every time a screen comes into focus.
    /* Every time I open this screen, wipe the error message.
Don’t recreate the function unnecessarily.
Only run it when the screen comes into focus. */
    useFocusEffect(
        React.useCallback(() => {
            clearErrorMessage();
        }, [])
    )
    return (
        <Wrapper>
            <AuthForm
                headerText='Sign Up for Tracker'
                errorMessage={state.errorMessage}
                // onSubmit={({ email, password }) => signup({ email, password })}
                onSubmit={signup}
                submitButtonText='Register'
            />
            <Link
                navigation={navigation}
                routeName="Signin"
                displayText={"Already have an account?\nSign In instead."}
            />
        </Wrapper>


    )
}

export default SignupScreen

// const styles = StyleSheet.create({})
{/* <Pressable onPress={() => navigation.navigate("Signin")}>
    <Text className="text-blue-500 underline">
        Already have an account? Sign In
    </Text>
</Pressable> 

<TouchableOpacity onPress={() => navigation.navigate("Signin")}>
    <Text style={{ color: "blue" }}>Sign In</Text>
</TouchableOpacity> */}