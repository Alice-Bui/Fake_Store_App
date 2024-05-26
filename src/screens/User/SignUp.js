import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { FormInput } from "../../components/formUI/formInput";
import { FormButton } from "../../components/formUI/formButton";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../../constants/screenColors";
import { signUpUser } from "../../service/authService";


const initValue = {
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
};

export const SignUp = ({navigation}) => {
    const [input, setInput] = useState(initValue);
    
    const inputChangeHandler = (inputIdentifier, inputValue) =>
        setInput((curValues) => {
            return {
                ...curValues,
                [inputIdentifier]: { value: inputValue, isValid: true },
            };
        });

    const validateData = (data) => {
        const nameIsValid = data.name.trim().length > 0;
        const emailIsValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email);
        const passwordIsValid =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/g.test(data.password);

        setInput((curState) => {
            return {
                name: { value: curState.name.value, isValid: nameIsValid },
                email: { value: curState.email.value, isValid: emailIsValid },
                password: {
                    value: curState.password.value,
                    isValid: passwordIsValid,
                },
            };
        });

        // Count the number of invalid fields
        const invalidCount = [nameIsValid, emailIsValid, passwordIsValid].filter(isValid => !isValid).length;

        // If at least two fields are invalid, valid is false
        const valid = invalidCount < 2;
        return valid;
    };

    const onClearHandler = () => {
        setInput(initValue);
    };

    const onSignUpHandler = async () => {
        const data = {
            name: input.name.value,
            email: input.email.value,
            password: input.password.value,
        };

        //show alert for >= 2 invalid attributes
        if (!validateData(data)) {
            Alert.alert("Invalid entries detected.");
            return;
        };

        try {
            const user = await signUpUser(data);
            if (user.status === "error") {
                Alert.alert(user.message); //show alert for only 1 invalid attribute
            } else {
                onClearHandler();
                profileScreen(user);
            }
        } catch (error) {
            console.error("Sign up failed: ", error);
            Alert.alert("Failed to sign up.");
        }
    };

    const signInScreen = ()=>navigation.navigate('Sign In')
    const profileScreen = (userData)=>navigation.navigate({name: 'Profile', params: {user: userData}})

    return (
        <View style={styles.container}>
            <Ionicons name="storefront" color={colors.green} size ={75} paddingBottom={'10%'}/>
            <View style={styles.form}>
                <Text style={styles.title}>Hello</Text>
                <Text style={styles.subtitle}>Sign up now to get started with an account</Text>

                <FormInput
                    label="Name"
                    invalid={!input.name.isValid}
                    config={{
                        value: input.name.value,
                        onChangeText: inputChangeHandler.bind(null, "name"),
                        maxLength: 100,
                    }}
                />
                {!input.name.isValid && (
                    <View style={styles.errorBack}>
                        <Text style={styles.errorText}>
                            Please enter your name.
                        </Text>
                    </View>
                )}

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
                    <View style={styles.errorBack}>
                        <Text style={styles.errorText}>
                            Please enter a valid email address.
                        </Text>
                    </View>
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
                    <View style={styles.errorBack}>
                        <Text style={styles.errorText}>
                            Please enter a password that meets the required standards.
                        </Text>
                    </View>
                )}
                
                <View style={styles.buttonPanel}>
                    <FormButton onPress={onClearHandler}>Clear</FormButton>
                    <FormButton onPress={onSignUpHandler}>Sign Up</FormButton>
                </View>
                <View style={styles.switchFormContainer}>
                    <Text style={styles.label}>Already have an account?</Text>
                    <Pressable onPress={()=>signInScreen()}>
                        <Text style={styles.swithForm}> Sign In</Text>
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
    swithForm: {
        fontSize: 14, 
        color: colors.green, 
        fontFamily: 'Poppins_600SemiBold',
        paddingVertical: 5
    }
});
