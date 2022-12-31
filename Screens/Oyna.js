import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BiHalisaha from "../Components/BiHalisaha";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";

const Oyna = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={styles.anaView}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.Image}  /> */}
      <BiHalisaha></BiHalisaha>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.kutu}
          onPress={() => navigate("TakimBul")}
        >
          <Icon
            style={{ paddingRight: 4 }}
            name="tshirt"
            size={22}
            color=""
          ></Icon>
          <Text> </Text>
          <Text style={styles.text}>Rakip Takım Bul</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.kutu}
          onPress={() => navigate("Bireysel")}
        >
          <Icon
            style={{ paddingRight: 4 }}
            name="running"
            size={26}
            color=""
          ></Icon>
          <Text> </Text>
          <Text style={styles.text}>Bireysel Oyna</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Oyna;

const styles = StyleSheet.create({
  anaView: {
    flex: 1,
  },

  container: {
    backgroundColor: "gainsboro",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height:"100%",
    
  },
  kutu: {
    backgroundColor: "gainsboro",
    flexDirection: "row",
    padding: 10,
    marginTop: 22,
    marginBottom: 22,
  },
  text: {
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 18,
    textDecorationStyle: "double",
  },
  Image: {
    flex: 1,
    justifyContent: "center",
  },
});
