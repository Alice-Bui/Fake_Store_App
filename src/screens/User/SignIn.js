import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import { FormInput } from "../../components/formUI/formInput";
import { FormButton } from "../../components/formUI/formButton";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../../constants/screenColors";

const initValue = {
  email: { value: "", isValid: true },
  password: { value: "", isValid: true },
};

export const SignIn = () => {
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
    const onCancelHandler = () => {
        setInput(initValue);
        setFormIsValid(true);
    };
    const onSubmitHandler = () => {
        const data = {
            email: input.email.value,
            password: input.password.value,
        };
        if (validateData(data)) {
            Alert.alert("Everything looks good...");
        }
    };
    return (
        <View style={styles.container}>
            <Ionicons name="storefront" color={colors.green} size ={75} paddingBottom={'10%'}/>
            <View style={styles.form}>
                <Text style={styles.title}>Hello</Text>
                <Text style={styles.subtitle}>Please sign in with your Email and Password</Text>
                <View style={styles.panel}>
                    <FormInput
                    label="Email"
                    invalid={!input.email.isValid}
                    style={styles.halfInput}
                    config={{
                        placeholder: "abc@gmail.com",
                        value: input.email.value,
                        onChangeText: inputChangeHandler.bind(null, "email"),
                        maxLength: 100,
                    }}
                    />
                </View>
                <FormInput
                    label="Password"
                    invalid={!input.password.isValid}
                    config={{
                        value: input.password.value,
                        onChangeText: inputChangeHandler.bind(null, "password"),
                        secureTextEntry: true
                    }}
                />
                {!formIsValid && (
                    <View style={styles.errorBack}>
                        <Text style={styles.errorText}>
                            Wrong email or password
                        </Text>
                    </View>
                )}
                <View style={styles.buttonPanel}>
                    <FormButton onPress={onCancelHandler}>Cancel</FormButton>
                    <FormButton onPress={onSubmitHandler}>Submit</FormButton>
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
        paddingHorizontal: '5%',
        paddingVertical: '8%',
    },
    form: {
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
    panel: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
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
        //backgroundColor: colors.primary50,
        padding: 5,
        borderRadius: 6,
    },
    errorText: {
        color: colors.red,
        fontSize: 14,
        textAlign: "center",
    },
});
