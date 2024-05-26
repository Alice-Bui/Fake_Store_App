// Profile.js

import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../../../components/Title";
import { colors } from "../../../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUser, clearUser } from "../../../redux/userSlice";

// 2 main components for Profile screen
import { Update } from "../../../components/Profile/Update";
import { UserInfo } from "../../../components/Profile/UserInfo";


export const Profile = ({navigation}) => {
    const [update, setUpdate] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    //Update
    const onUpdateHandler = () => {
        setUpdate(true);
    };

    const handleUpdateData = (updateData) => {
        dispatch(updateUser(updateData));
    };

    const onSignOutHandler = () => {
        dispatch(clearUser());
        navigation.navigate("Sign In");
    }

    return (
        <View style={styles.container}>
            <Title text="User Profile" />
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle" color={colors.pink} size={175} />
                {update ? (
                    <Update user={user} handleUpdateData={handleUpdateData} setUpdate={setUpdate}/>
                ) : (
                    <UserInfo user={user} onUpdateHandler={onUpdateHandler} onSignOutHandler={onSignOutHandler}/>
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
    }
})
