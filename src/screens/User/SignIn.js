import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { useState } from "react";
import { FormInput } from "../../components/formUI/formInput";
import { FormButton } from "../../components/formUI/formButton";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../../constants/screenColors";

const initValue = {
  email: { value: "", isValid: true },
  password: { value: "", isValid: true },
};

export const SignIn = ({navigation}) => {
    const [input, setInput] = useState(initValue);
    const [formIsValid, setFormIsValid] = useState(true);
    const inputChangeHandler = (inputIdentifier, inputValue) =>
        setInput((curValues) => {
            return {
                ...curValues,
                [inputIdentifier]: { value: inputValue, isValid: true },
            };
        });

    const validateData = (data) => {
        const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailIsValid = validEmailRegex.test(data.email);
        const passwordIsValid = data.password.trim().length > 8 &&
                                /[A-Z]/.test(data.password) &&
                                /[a-z]/.test(data.password) &&
                                /\d/.test(data.password) &&
                                /[!@#$%^&*(),.?":{}|<>]/.test(data.password);

        setInput((curState) => {
            return {
                email: { value: curState.email.value, isValid: emailIsValid },
                password: {
                    value: curState.password.value,
                    isValid: passwordIsValid,
                },
            };
        });
        const valid = emailIsValid && passwordIsValid;
        setFormIsValid(valid);
        return valid;
    };
    const onClearHandler = () => {
        setInput(initValue);
        setFormIsValid(true);
    };
    
    const onSignInHandler = () => {
        const data = {
            email: input.email.value,
            password: input.password.value,
        };
        if (!validateData(data)) {
            Alert.alert("Wrong email or password");
        }
    };

    const signUpScreen = ()=>navigation.navigate('Sign Up')

    return (
        <View style={styles.container}>
            <Ionicons name="storefront" color={colors.green} size ={75} paddingBottom={'10%'}/>
            <View style={styles.form}>
                <Text style={styles.title}>Hello</Text>
                <Text style={styles.subtitle}>Please sign in with your Email and Password</Text>
                
                <FormInput
                    label="Email"
                    invalid={!input.email.isValid}
                    config={{
                        placeholder: "abc@gmail.com",
                        value: input.email.value,
                        onChangeText: inputChangeHandler.bind(null, "email"),
                        maxLength: 100,
                    }}
                />
                <FormInput
                    label="Password"
                    invalid={!input.password.isValid}
                    config={{
                        value: input.password.value,
                        onChangeText: inputChangeHandler.bind(null, "password"),
                        secureTextEntry: true
                    }}
                />
                
                <View style={styles.buttonPanel}>
                    <FormButton onPress={onClearHandler}>Clear</FormButton>
                    <FormButton onPress={onSignInHandler}>Sign In</FormButton>
                </View>
                <View style={styles.switchFormContainer}>
                    <Text style={styles.label}>Don't have an account?</Text>
                    <Pressable onPress={()=>signUpScreen()}>
                        <Text style={styles.swithForm}> Sign Up</Text>
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
        paddingHorizontal: '7%',
        paddingVertical: '8%',
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "white",
        padding: 5,
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
        fontSize: 30,
        color: colors.text,
        fontFamily: "Poppins_600SemiBold",
        textAlign: 'center',
        paddingBottom: 5,
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
        marginVertical: 10,
    },
    halfInput: {
        flex: 1,
    },
    errorBack: {
        padding: 5,
    },
    errorText: {
        color: colors.red,
        fontSize: 14,
        textAlign: "center",
    },
    switchFormContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    label: { 
        fontSize: 14, 
        color: colors.text, 
        fontFamily: 'Poppins_400Regular',
        paddingVertical: 10,
    },
    swithForm: {
        fontSize: 14, 
        color: colors.green, 
        fontFamily: 'Poppins_600SemiBold',
        paddingVertical: 10, 
    }
});
