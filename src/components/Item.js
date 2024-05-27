import { View, Image, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const Item = (item) => {
  <View style={styles.product} key={item.id}>
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
          <Text style={styles.productValue}> ${item.quantity}</Text>
        </Text>
      </View>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  product: {
    margin: "2%",
    padding: "2%",
    backgroundColor: "white",
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
    justifyContent: "space-between",
  },
  productNumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});
