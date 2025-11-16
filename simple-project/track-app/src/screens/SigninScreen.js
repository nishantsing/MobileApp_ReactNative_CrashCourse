import React, { useContext, useEffect } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Context as AuthContext } from '../../src/context/AuthContext';
import AuthForm from '@/components/AuthForm';
import Link from '@/components/Link';
import { useFocusEffect } from '@react-navigation/native';
import Wrapper from '@/components/Wrapper';


// When we navigate to signup this screen is not removed of the screen its just at the corner
const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext)

    // clear the error message whenever the screen mounts.
    /* useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            clearErrorMessage();
        });

        return unsubscribe;
    }, [navigation]); */

    useFocusEffect(
        React.useCallback(() => {
            clearErrorMessage();
        }, [])
    )
    return (
        <Wrapper>
            <AuthForm
                headerText='Sign In for Tracker'
                errorMessage={state.errorMessage}
                // onSubmit={({ email, password }) => signin({ email, password })}
                onSubmit={signin}
                submitButtonText='Log In'
            />
            <Link
                navigation={navigation}
                routeName="Signup"
                displayText={"Don't have an account?\nGo back to sign up."}
            />
        </Wrapper>

    )
}

export default SigninScreen