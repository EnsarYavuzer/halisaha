import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import React, { useState,useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import {firebase} from "../src/index"
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const ProfileInfo = ({ navigation }) => {
  const anonim ="https://st3.depositphotos.com/3864435/16692/i/600/depositphotos_166926972-stock-photo-unknown-person-concept.jpg";
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [user,setUser]=useState("")
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((user) => {
        setUser(user.data());
      });
  }, [refreshing]);
  console.log("user : ",user)
  const image = (user.photoUrl)
  
 
  
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ backgroundColor: "palegreen" }}>
          <Text style={styles.mainHeader}>Profil Bilgilerim</Text>
        </View>
        <View style={styles.imgContainer}>
          <TouchableOpacity
            style={{ flexDirection: "row", marginLeft: 20 }}
            
            onPress={() => navigation.navigate("ProfilUpdate", {user:user})}
          >
          <View>
             {image != "" ?
             <Image source={{uri:image}} style={{backgroundColor: "lightgray",
                width: 165,
                height: 165,
                backgroundColor: "lightgray",
                borderRadius: 9999,}}></Image> :
                <Image source={{uri:anonim}} style={{backgroundColor: "lightgray",
                width: 165,
                height: 165,
                backgroundColor: "lightgray",
                borderRadius: 9999,}}></Image>
                }
          </View>
          
            <View>
              <Icon
                style={{ marginLeft: 3, marginTop: 1 }}
                name="build-outline" 
                size={24}
                color="gray"
              ></Icon>
            </View>
          </TouchableOpacity>

          <Text style={styles.headerText}>{user.name} {user.surname}</Text>
        </View>
        <ScrollView>
          <View style={styles.profileBar}>
            <TouchableOpacity
              style={styles.seceneklerButonu}
              onPress={() => navigation.navigate("ProfilUpdate", { user:user })}
            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="football-outline"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {" "}
                Kullanıcı Adı :
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 30,
                  marginBottom: 7,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.secenekText}>{user.username}</Text>
                <Icon
                  style={{ marginLeft: 7, marginTop: 1 }}
                  name="build-outline"
                  size={12}
                  color="red"
                ></Icon>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seceneklerButonu}
              onPress={() => navigation.navigate("ProfilUpdate", { user:user})}
            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="document-text-outline"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}> Email :</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 30,
                  marginBottom: 7,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.secenekText}>{user.email}</Text>
                <Icon
                  style={{ marginLeft: 7, marginTop: 1 }}
                  name="build-outline"
                  size={12}
                  color="red"
                ></Icon>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seceneklerButonu}
              onPress={() => navigation.navigate("ProfilUpdate", { user })}
            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="document-text-outline"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {" "}
                Doğum Tarihi :
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 30,
                  marginBottom: 7,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.secenekText}>{user.birthDate}</Text>
                <Icon
                  style={{ marginLeft: 7, marginTop: 1 }}
                  name="build-outline"
                  size={12}
                  color="red"
                ></Icon>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seceneklerButonu}
              onPress={() => navigation.navigate("ProfilUpdate", { user })}
            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="star"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}> Mevki :</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 30,
                  marginBottom: 7,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.secenekText}>Forvet</Text>
                <Icon
                  style={{ marginLeft: 7, marginTop: 1 }}
                  name="build-outline"
                  size={12}
                  color="red"
                ></Icon>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seceneklerButonu}
              onPress={() => navigation.navigate("ProfilUpdate", {user})}

            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="star"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {" "}
                Mevcut Takım :
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 30,
                  marginBottom: 7,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.secenekText}>Fenerbahçe</Text>
                <Icon
                  style={{ marginLeft: 7, marginTop: 1 }}
                  name="build-outline"
                  size={12}
                  color="red"
                ></Icon>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seceneklerButonu}
              onPress={() => navigation.navigate("ProfilUpdate")}
            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="star"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}> Dil :</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 30,
                  marginBottom: 7,
                  flexDirection: "row",
                }}
              >
                <Text style={styles.secenekText}>Türkçe</Text>
                <Icon
                  style={{ marginLeft: 7, marginTop: 1 }}
                  name="build-outline"
                  size={12}
                  color="red"
                ></Icon>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "palegreen",
    flex: 1,
  },
  profileBar: {
    backgroundColor: "white",
    marginTop: 30,
    paddingTop: 30,
    height: 400,
    borderTopWidth: 1,
    borderColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  img: { width: 160, height: 160, borderRadius: 9999 },

  headerText: {
    fontSize: 21,
    fontWeight: "600",
    letterSpacing: 2,
    textDecorationLine: "underline",
    textDecorationStyle: "double",
    textShadowRadius: 13,
    object: { width: 30, height: 30 },
    textShadowColor: "brown",
  },

  seceneklerButonu: {
    backgroundColor: "white",
    borderBottomWidth: 0.3,
    flexDirection: "row",
    margin: 7,

    alignItems: "center",
  },
  secenekText: { fontSize: 17, fontWeight: "400" },

  ayarlartext: { fontSize: 22, fontWeight: "bold" },

  cikisYap: {
    flexDirection: "row",
    height: 40,
    borderTopWidth: 1,
    borderTopColor: "black",
    borderRadius: 5,
    justifyContent: "space-around",
    padding: 5,
  },
  cikisYapButon: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 9,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "silver",
  },
  cikisYapText: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,

    textShadowRadius: 10,
    object: { width: 27, height: 27 },
    textShadowColor: "gray",
  },

  mainHeader: {
    fontSize: 19,
    fontWeight: "600",
    letterSpacing: 2,
    textDecorationLine: "underline",
    textShadowRadius: 13,
    object: { width: 27, height: 27 },
    textShadowColor: "brown",
  },
});
