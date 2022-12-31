import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
const BiHalisaha = () => {
  const navigation = useNavigation();

  // Compenent her render olduğunda bu fonskiyonun çalışmasını sağlayan useLayoutEffcet
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View
      style={{
        backgroundColor: "whitesmoke",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <View style={{marginLeft:6}}>
        <Image
          style={{
            backgroundColor: "lightgray",
            width: 35,
            height: 35,
            backgroundColor: "lightgray",
            borderRadius: 9999,
            marginLeft:7
          }}
          source={{
            uri: "https://w7.pngwing.com/pngs/851/840/png-transparent-soccer-player-illustration-football-player-kick-sport-football-logo-computer-wallpaper-sports-equipment.png",
          }}
        ></Image>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          
        }}
      >
        <Text style={styles.HalisahaText}> Bİ HALISAHA ? </Text>
      </View>

      <View>    
      <Icon
          
          style={{ paddingTop:4,paddingLeft: 12,borderRadius:5 }}
          name="person"
          size={26}
          color="gray"
        ></Icon>
      </View>
    </View>
  );
};

export default BiHalisaha;
const styles = StyleSheet.create({
  HalisahaText: {
    fontWeight:"700",
    color: "green",
    fontSize:24
  },
});
