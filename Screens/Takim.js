import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import BiHalisaha from "../Components/BiHalisaha";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import { firebase } from "../src/index";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Takim = ({ navigation }) => {
  const currentEmail = firebase.auth().currentUser.email;
  const [takimBilgi, setTakimbilgi] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Takimlar")
      .where("sahibinEmail", "==", currentEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          setTakimbilgi(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },[refreshing]);
 

  return (
    <SafeAreaView style={styles.container}>
      <BiHalisaha />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.scrollView}>
          <TouchableOpacity
            style={styles.takimim}
            onPress={() => navigation.navigate("TakimProfil", { takimBilgi })}
          >
            <Icon
              style={{
                paddingRight: 4,
              }}
              name="chevron-right"
              size={22}
              color="black"
            ></Icon>
            <Text style={styles.textButon}>Takımıma Git</Text>
            <Text style={styles.textButon2}>({takimBilgi.takimAd})</Text>
          </TouchableOpacity>

          <View style={styles.view}>
            <Text style={styles.text}> Henüz Bir Takımın Yok Mu ? </Text>
            <Text> </Text>

            <Text style={styles.text}>Hemen Oluştur ! </Text>
          </View>
          <TouchableOpacity
            style={styles.kutu}
            onPress={() => navigation.navigate("TakimEkle")}
          >
            <Icon
              style={{
                paddingRight: 4,
              }}
              name="tshirt"
              size={22}
              color="black"
            ></Icon>
            <Text style={styles.textButon}>Takımını Oluştur</Text>
          </TouchableOpacity>
         
        </View>

        <View>
          <Text></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Takim;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "gainsboro",
  },
  scrollView: {},
  view: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 23,
    height: "35%",
  },
  text: {
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 18,
    textDecorationStyle: "double",
  },
  kutu: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "26%",
  },
  textButon: {
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 18,
    textDecorationStyle: "double",
  },
  textButon2: {
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 18,
    textDecorationStyle: "double",
    color: "red",
  },
  takimim: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "32%",
  },
  yenile: {
    height: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
});
