// Home.js
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../../constants/colors";
import Button from "../../components/Button";

import { selectUser } from "../../redux/userSlice";
import { displayStatus, updatePaidStatus, updateDeliveredStatus, displayOrder } from "../../redux/orderSlice";
import { selectOrders, selectNew, selectPaid, selectDelivered } from "../../redux/orderSlice";
import { updateOrder } from "../../service/orderService";

export const MyOrders = () => {
    const user = useSelector(selectUser);
    const orders = useSelector(selectOrders);
    const newOrders = orders.filter(order => order.status === 'new');
    const paidOrders = orders.filter(order => order.status === 'paid');
    const deliveredOrders = orders.filter(order => order.status === 'delivered');
    const dispatch = useDispatch();

    //Displaying each status label
    const Status = ({name, data, status, button}) => {
        const {buttonText, buttonName, buttonAction, buttonColor} = button || {}
        const statusData = useSelector(
            status === 'new' ? selectNew 
            : status === 'paid' ? selectPaid 
            : selectDelivered)

        const handleDisplayStatus = () => {
            dispatch(displayStatus(status));
        };

        const handleDisplayDetails = (order) => {
            dispatch(displayOrder(order));
        }

        return (
            <View style={styles.orderContainer}>
                <View style={styles.label}>
                    <View/>
                    <Text style={styles.labelName}>{name}: {data.length}</Text>

                    {/*Toggle Display Mode through Caret Icon => show list*/}
                    <Pressable onPress={()=>handleDisplayStatus()}>
                        <Ionicons name={statusData.icon} color={colors.tab} size={30}/> 
                    </Pressable>
                </View>

                {/*Expanded Mode Display*/}
                {statusData.value==true && data.map((order) => (
                    <View key={order.id}>
                        <View style={styles.orderInfoContainer}>
                            <View style={styles.orderInfo}>
                                <Text style={styles.textKey}>Order ID: 
                                    <Text style={styles.textValue}> {order.id}</Text>
                                </Text>
                                <Text style={styles.textKey}>Items: 
                                    <Text style={styles.textValue}> {order.item_numbers}</Text>
                                </Text>
                                <Text style={styles.textKey}>Total: 
                                    <Text style={styles.textValue}> ${order.total_price}</Text>
                                </Text>
                            </View>
                            <Pressable onPress={()=>handleDisplayDetails(order)}>
                                <Ionicons name={order.showDetails.icon} color={colors.text} size={20}/> 
                            </Pressable>
                        </View>
                        {order.showDetails.value === true && JSON.parse(order.order_items).map(item => (
                            <View style={[styles.product, {backgroundColor: status=='delivered'?colors.lightgreen:'white'}]} key={item.id}>
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                                <View style={styles.productText}>
                                <Text style={styles.productValue}>{item.title}</Text>
                                <View style={styles.productNumContainer}>
                                    <Text style={styles.productKey}>
                                    Price:
                                    <Text style={styles.productValue}> ${item.price}</Text>
                                    </Text>
                                    <Text style={styles.productKey}>
                                    Quantity:
                                    <Text style={styles.productValue}> {item.quantity}</Text>
                                    </Text>
                                </View>
                                </View>
                            </View>
                        ))}
                        
                        {button && (
                            <View style={styles.buttonContainer}>
                                <Button text={button.buttonText} name={button.buttonName} width={150} color={button.buttonColor} f={() => button.buttonAction(order)}/>
                            </View>
                        )}
                       <View style={styles.line}/> 
                    </View>
                ))}
            </View>
        )
    }

    const handlePaid = async(order) => {
        const update = {
            orderID: order.id,
            isPaid: 1,
            isDelivered: 0,
        };
        try {
            const result = await updateOrder(update, user.token)
            console.log(result)
            if (result.status === "error") {
                Alert.alert(user.message);
            } else if (result.result.changes > 0){
                dispatch(updatePaidStatus(order))
            }
        } catch(error){
            console.error("Send update order failed: ", error)
            Alert.alert("Failed to update user's order")
        }
    }

    const handleReceived = async(order) => {
        const update = {
            orderID: order.id,
            isPaid: 1,
            isDelivered: 1,
        };
        try {
            const result = await updateOrder(update, user.token)
            console.log(result)
            if (result.status === "error") {
                Alert.alert(user.message);
            } else if (result.result.changes > 0){
                dispatch(updateDeliveredStatus(order))
            }
        } catch(error){
            console.error("Send update order failed: ", error)
            Alert.alert("Failed to update user's order")
        }
    }

    const payButton = {buttonText: "Pay", buttonName: "wallet", buttonAction: handlePaid, buttonColor: colors.red}
    const receiveButton = {buttonText: "Receive", buttonName: "checkmark-done-circle", buttonAction: handleReceived, buttonColor: colors.green}

    const labelData = [
        { name: "New Orders", data: newOrders, status: "new", button: payButton},
        { name: "Paid Orders", data: paidOrders, status: "paid", button: receiveButton},
        { name: "Delivered Orders", data: deliveredOrders, status: "delivered"}
    ]

    return (
        <View style={styles.container}>
            <Title text="My Orders"/>

            <View style={styles.content}>
                <FlatList
                    data={labelData}
                    renderItem={({ item }) => (
                        <Status name={item.name} data={item.data} status={item.status} button={item.button} />
                    )}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.beige,
        paddingHorizontal: '5%',
        paddingVertical: '8%',
    },

    content: {
        height: '85%',
        marginTop: '5%'
    },
    
    orderContainer: {
        marginHorizontal: '2%',
        justifyContent: 'center',
        marginBottom: '10%'
    },
    //Label section
    label: {
        width: '100%',
        backgroundColor: colors.pink,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 15,
        elevation: 5,
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    labelName: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: 'white'
    },

    //Orders section
    orderInfoContainer: {
        backgroundColor: colors.beige,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
        padding: 10,
        alignItems: 'center',
    },
    orderInfo: {
        flexDirection: 'row',
        width: '87%',
        justifyContent: 'space-between'
    },
    textKey: {
        color: colors.text,
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14
    },
    textValue: {
        fontFamily: 'Poppins_500Medium',
    },

    buttonContainer: {
        alignItems: 'flex-end',
        marginTop: '2%'
    },

    product: {
        margin: "2%",
        padding: "2%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        elevation: 5,
        shadowColor: "gray",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1,
        },
      },
      productText: {
        width: "72%",
        height: 75,
        justifyContent: 'space-between',
      },
      productNumContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '75%'
      },
      productValue: {
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: colors.text,
      },
      productKey: {
        fontSize: 13,
        fontFamily: "Poppins_600SemiBold",
        color: colors.text,
      },
      productImage: {
        width: "23%",
        height: 85,
        resizeMode: "contain",
        borderRadius: 10,
        marginRight: "5%",
      },

    line: {
        borderWidth: 1,
        borderColor: colors.green,
        borderStyle: "dashed",
        marginTop: '5%'
    },
    
})