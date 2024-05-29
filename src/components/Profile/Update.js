//Update.js

import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { useState } from "react";
import { FormInput } from "./FormInput";
import { colors } from "../../constants/colors";
import Button from "../Button";
import { updateUserProfile } from "../../service/authService";

export const Update = ({user, handleUpdateData, setUpdate}) => {
    const initValue = {
      name: { value: user.name, isValid: true },
      password: { value: "", isValid: true},
    };

    const [input, setInput] = useState(initValue);
    const inputChangeHandler = (inputIdentifier, inputValue) =>
      setInput((curValues) => {
          return {
              ...curValues,
              [inputIdentifier]: { value: inputValue, isValid: true },
          };
      });

    const validateData = (data) => {
        const nameIsValid = data.name.trim().length > 0
        const passwordIsValid = data.password.trim().length > 0

        setInput((curState) => {
            return {
                name: { value: curState.name.value, isValid: nameIsValid },
                password: {
                    value: curState.password.value,
                    isValid: passwordIsValid,
                },
            };
        });
    };

    const finishUpdate = () => {
      setInput(initValue);
      setUpdate(false)
    };

    const onConfirmHandler = async () => {
        const data = {
            name: input.name.value,
            password: input.password.value,
            token: user.token
        };

        validateData(data)

        try {
            const result = await updateUserProfile(data);
            if (result.status === "error") {
                Alert.alert(result.message);
            } else {
                Alert.alert(result.message);
                handleUpdateData(result.name);
                finishUpdate();
            }
        } catch (error) {
            console.error("Update failed: ", error);
            Alert.alert("Failed to update.");
        }
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.form}>
                <FormInput
                    label="New User Name"
                    invalid={!input.name.isValid}
                    config={{
                        placeholder: "abc@gmail.com",
                        value: input.name.value,
                        onChangeText: inputChangeHandler.bind(null, "name"),
                        maxLength: 100,
                    }}
                />
                {!input.name.isValid && (
                    <View style={styles.errorBack}>
                        <Text style={styles.errorText}>
                            Please enter your new name.
                        </Text>
                    </View>
                )}

                <FormInput
                    label="New Password"
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
                            Please enter your new password.
                        </Text>
                    </View>
                )}        
            </View>
            
            <View style={styles.buttonContainer}>
                <Button text="Confirm" name="checkmark" color={colors.green} width={170} f={onConfirmHandler}/>
                <Button text="Cancel" name="close" color={colors.green} width={170} f={finishUpdate}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        paddingHorizontal: '2%'
    },
    form: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 6,
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        marginVertical: '5%',
    },
    errorBack: {
        paddingHorizontal: 5
    },
    errorText: {
        color: colors.red,
        fontSize: 14,
    },
    buttonContainer: {
        marginVertical: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});