import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Title from "../../components/Title";
import { colors } from "../../constants/screenColors";
import Button from "../../components/Button";
import { FormInput } from "../../components/formUI/formInput";
import { Update } from "./Update";

export const Profile = ({navigation, route}) => {
    const [user, setUser] = useState({});
    const [update, setUpdate] = useState(false);

    const signInScreen = () => navigation.navigate("Sign In");

    useEffect(() => {
        if (route.params?.user) {
            setUser(route.params?.user);
        }
    }, [route.params?.user]);

    //Update
    const onUpdateHandler = () => {
        setUpdate(true);
    };

    return (
        <View style={styles.container}>
            <Title text="User Profile" />
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle" color={colors.pink} size={175} />
        
                {update ? (
                    <Update user={user} setUpdate={setUpdate} setUser={setUser}/>
                ) : (
                    <View style={styles.profile}>
                        <View style={styles.userInfo}>
                            <View style={styles.infoContainer}>
                                <Ionicons name="id-card" color={colors.text} size={40} marginRight={"7%"}/>
                                <View style={styles.info}>
                                    <Text style={styles.infoKey}>User Name</Text>
                                    <Text style={styles.infoValue}>{user.name}</Text>
                                </View>
                            </View>
                
                            <View style={styles.infoContainer}>
                                <Ionicons name="mail" color={colors.text} size={40} marginRight={"7%"}/>
                                <View style={styles.info}>
                                    <Text style={styles.infoKey}>Email</Text>
                                    <Text style={styles.infoValue}>{user.email}</Text>
                                </View>
                            </View>
                        </View>
        
                        <View style={styles.buttonContainer}>
                            <Button text="Update" name="color-wand" color={colors.green} f={onUpdateHandler}/>
                            <Button text="Sign Out" name="exit" color={colors.red} f={signInScreen}/>
                        </View>
                </View>
                )}
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.beige,
        paddingHorizontal: '5%',
        paddingVertical: '8%',
    },
    profileContainer: {
        marginVertical: '5%',
        alignItems: 'center',
    },
    profile: {
        width: '100%',
        paddingHorizontal: '2%'
    },
    userInfo: {
        marginVertical: '5%',
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: '5%'
    },
    infoKey: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        marginBottom: '5%'
    },
    infoValue: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})
