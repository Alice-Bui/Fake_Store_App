// SignIn.js

import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { useState } from "react";
import { FormInput } from "../../../components/Profile/FormInput";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../../../constants/colors";
import { signInUser } from "../../../service/authService";
import Button from "../../../components/Button";

import { useDispatch } from "react-redux";
import { handleSignIn } from "../../../service/statusService";

const initValue = {
  email: { value: "", isValid: true },
  password: { value: "", isValid: true },
};

export const SignIn = ({navigation}) => {
    const [input, setInput] = useState(initValue);
    const dispatch = useDispatch();

    const inputChangeHandler = (inputIdentifier, inputValue) =>
        setInput((curValues) => {
            return {
                ...curValues,
                [inputIdentifier]: { value: inputValue, isValid: true },
            };
        });

    const validateData = () => {
        setInput((curState) => {
            return {
                email: { value: curState.email.value, isValid: false },
                password: {
                    value: curState.password.value,
                    isValid: false,
                },
            };
        });
    };

    const onClearHandler = () => {
        setInput(initValue);
    };
    
    const onSignInHandler = async () => {
        const data = {
            email: input.email.value,
            password: input.password.value,
        };

        try {
            const user = await signInUser(data);
            if (user.status === "error") {
                validateData()
                Alert.alert(user.message);
            } else {
                handleSignIn(user, dispatch)
                onClearHandler();
                profileScreen();
            }
        } catch (error) {
            console.error("Sign in failed: ", error);
            Alert.alert("Failed to sign in.");
        }
    };


    const signUpScreen = ()=>navigation.navigate('Sign Up')
    const profileScreen = ()=>navigation.navigate('Profile')

    return (
        <View style={styles.container}>
            <Ionicons name="storefront" color={colors.green} size ={75} paddingBottom={'10%'}/>
            <View style={styles.form}>
                <Text style={styles.title}>Welcome to Fake Store</Text>
                <Text style={styles.subtitle}>Please sign in with your Email and Password</Text>
                
                <FormInput
                    label="Email"
                    invalid={!input.email.isValid}
                    config={{
                        value: input.email.value,
                        onChangeText: inputChangeHandler.bind(null, "email"),
                        maxLength: 100,
                    }}
                />
                {!input.email.isValid && (
                    <View style={styles.errorBack}/>
                )}


                <FormInput
                    label="Password"
                    invalid={!input.password.isValid}
                    config={{
                        value: input.password.value,
                        onChangeText: inputChangeHandler.bind(null, "password"),
                        secureTextEntry: true
                    }}
                />
                {!input.password.isValid && (
                    <View style={styles.errorBack}/>
                )}
                
                <View style={styles.buttonPanel}>
                    <Button text="Clear" name="remove" color={colors.green} width={120} f={onClearHandler}/>
                    <Button text="Sign In" name="eye" color={colors.green} width={120} f={onSignInHandler}/>
                </View>
                <View style={styles.switchFormContainer}>
                    <Text style={styles.label}>Don't have an account?</Text>
                    <Pressable onPress={()=>signUpScreen()}>
                        <Text style={styles.switchForm}> Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.beige,
        paddingHorizontal: '8%',
        paddingVertical: '8%',
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "white",
        padding: 10,
        margin: '2%',
        borderRadius: 6,
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    title: {
        fontSize: 20,
        color: colors.red,
        fontFamily: "Poppins_600SemiBold",
        textAlign: 'center',
        paddingBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: colors.text,
        fontFamily: "Poppins_600SemiBold",
        textAlign: 'center',
        paddingBottom: 5,
    },
    
    buttonPanel: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
        marginBottom: 10
    },
    errorBack: {
        paddingHorizontal: 5
    },
    errorText: {
        color: colors.red,
        fontSize: 14,
    },
    switchFormContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    label: { 
        fontSize: 14, 
        color: colors.text, 
        fontFamily: 'Poppins_400Regular',
        paddingVertical: 5
    },
    switchForm: {
        fontSize: 14, 
        color: colors.green, 
        fontFamily: 'Poppins_600SemiBold',
        paddingVertical: 5
    }
});
