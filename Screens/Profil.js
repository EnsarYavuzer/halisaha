import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  BackHandler
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { firebase } from "../src/index";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Profil = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] =useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const anonim ="https://st3.depositphotos.com/3864435/16692/i/600/depositphotos_166926972-stock-photo-unknown-person-concept.jpg";
  const [user, setUser] = useState("");
  const logOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      (error) => {
        alert(error.message);
      };
    }
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((user) => {
        setUser(user.data());
      });
      console.log("get effecti çalıştı")
  },[refreshing]);

  const image = user.photoUrl;

 
  // deleteAccount
  const x= user.email
 const deleteAccount=  ()=>{
  var users_query =firebase.firestore().collection('users').where('email','==',x);
  users_query.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
     doc.ref.delete();
  });
})
.catch((error)=>alert(error.message))
.then(()=>alert("Hesap Silme Başarılı"))
.then(()=> BackHandler.exitApp())
 }

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
          <Text style={styles.mainHeader}>PROFİLE</Text>
        </View>
        <View style={styles.imgContainer}>
          {image != "" ?
            <Image
              source={{ uri: image }}
              style={{
                backgroundColor: "lightgray",
                width: 165,
                height: 165,
                backgroundColor: "lightgray",
                borderRadius: 9999,
              }}
            ></Image>: 
             <Image
              source={{ uri: anonim }}
              style={{
                backgroundColor: "lightgray",
                width: 165,
                height: 165,
                backgroundColor: "lightgray",
                borderRadius: 9999,
              }}
            ></Image>
          }
          
        </View>
        <View style={styles.profileBar}>
          <TouchableOpacity
            style={styles.seceneklerButonu}
            onPress={() => navigate("Gecmis")}
          >
            <Icon
              style={{ paddingLeft: 8, paddingRight: 15 }}
              name="football-outline"
              size={22}
              color="green"
            ></Icon>
            <Text style={styles.secenekText}>Maç Geçmişi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.seceneklerButonu}
            onPress={() => navigate("İsta")}
          >
            <Icon
              style={{ paddingLeft: 8, paddingRight: 15 }}
              name="bar-chart-outline"
              size={22}
              color="green"
            ></Icon>
            <Text style={styles.secenekText}>İstatistikler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.seceneklerButonu}
            onPress={() => navigate("Info")}
          >
            <Icon
              style={{ paddingLeft: 8, paddingRight: 15 }}
              name="document-text-outline"
              size={22}
              color="green"
            ></Icon>
            <Text style={styles.secenekText}>Profil Bilgileri</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seceneklerButonu}>
            <Icon
              style={{ paddingLeft: 8, paddingRight: 15 }}
              name="star-half-outline"
              size={22}
              color="green"
            ></Icon>
            <Text style={styles.secenekText}>Oyuncu Kartım</Text>
          </TouchableOpacity>
          <View style={styles.seceneklerButonu}>
            <Icon
              style={{ paddingLeft: 8, paddingRight: 15 }}
              name="ios-settings-outline"
              size={22}
              color="green"
            ></Icon>
            <Text style={styles.ayarlartext}>Ayarlar</Text>
          </View>
          <TouchableOpacity style={styles.seceneklerButonu}>
            <Icon
              style={{ paddingLeft: 8, paddingRight: 15 }}
              name="key-outline"
              size={22}
              color="green"
            ></Icon>
            <Text style={styles.secenekText}>Hesap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seceneklerButonu}>
            <Icon
              style={{ paddingLeft: 8, paddingRight: 15 }}
              name="help-circle-outline"
              size={22}
              color="green"
            ></Icon>
            <Text style={styles.secenekText}>Yardım</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seceneklerButonu}>
            <Icon
              style={{ paddingLeft: 8, paddingRight: 15 }}
              name="md-information-circle-outline"
              size={22}
              color="green"
            ></Icon>
            <Text style={styles.secenekText}>Hakkımızda</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cikisYap}>
          <TouchableOpacity
            style={styles.cikisYapButon}
            onPress={() => logOut()}
          >
            <Icon
              style={{ paddingLeft: 4, paddingRight: 4 }}
              name="exit-outline"
              size={14}
              color="red"
            ></Icon>
            <Text style={styles.cikisYapText}>Çıkış Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cikisYapButon} onPress={deleteAccount}>
            <Icon
              style={{ paddingLeft: 4, paddingRight: 4 }}
              name="close-circle-outline"
              size={14}
              color="red"
            ></Icon>
            <Text style={styles.cikisYapText}>Hesabi Sil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profil;
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
    marginTop: 9,
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
  },
  secenekText: { fontSize: 22, fontWeight: "400" },

  ayarlartext: { fontSize: 22, fontWeight: "bold" },

  cikisYap: {
    flexDirection: "row",
    height: 40,
    borderTopWidth: 1,
    borderTopColor: "black",
    borderRadius: 5,
    justifyContent: "space-around",
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
    height:18
  },

  mainHeader: {
    fontSize: 19,
    fontWeight: "600",
    letterSpacing: 2,
    textDecorationLine: "underline",
   
  },
});
