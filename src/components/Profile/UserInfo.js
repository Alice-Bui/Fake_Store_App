//Profile.js

import {View, StyleSheet, Text} from "react-native";
import Button from "../Button";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export const UserInfo = ({user, onUpdateHandler, onSignOutHandler}) => {
    return (
        <View style={styles.profile}>
            <View style={styles.userInfo}>
                <View style={styles.infoContainer}>
                    <Ionicons name="id-card" color={colors.red} size={40} marginRight={"7%"}/>
                    <View style={styles.info}>
                    <Text style={styles.infoKey}>User Name</Text>
                    <Text style={styles.infoValue}>{user.name}</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Ionicons name="mail" color={colors.red} size={40} marginRight={"7%"}/>
                    <View style={styles.info}>
                    <Text style={styles.infoKey}>Email</Text>
                    <Text style={styles.infoValue}>{user.email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button text="Update" name="color-wand" color={colors.green} width={170} f={onUpdateHandler}/>
                <Button text="Sign Out" name="exit" color={colors.green} width={170} f={onSignOutHandler}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    profile: {
        width: '100%',
        paddingHorizontal: '2%'
    },
    userInfo: {
        marginVertical: '5%',
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: '5%',
        alignItems: 'center'
    },
    infoKey: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        marginBottom: '5%',
        color: colors.text
    },
    infoValue: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        color: colors.text
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

