import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { firebase } from "../src/index";
import * as ImagePicker from "expo-image-picker";

const ProfileUpdate = ({route }) => {
  console.log(route.params.user.name)
 
 

  const [username, setUsername] = useState(route.params.user.username);
  const [name, setName] = useState(route.params.user.name);
  const [surname, setSurname] = useState(route.params.user.surname);
  const [date, setDate] = useState(route.params.user.birthDate);
  const [image, setİmage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.assets[0].uri };
    console.log(source);
    setİmage(source);
  };
  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(fileName).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert("Photo uploudled");
    setİmage(null);

    await firebase
      .storage()
      .ref()
      .child(fileName)
      .getDownloadURL()
      .then((downloadUrl) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            photoUrl: downloadUrl,
          });
      })
      .catch((error) => Alert(error.message));
  };

  const Update = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        name: name,
        surname: surname,
        username: username,
        birthDate: date,
      })
      .then(alert("Update edildi"))
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ backgroundColor: "palegreen" }}>
          <Text style={styles.mainHeader}>Profilimi Güncelle</Text>
        </View>
        
        <View style={styles.imgContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {image && (
              <Image
                source={{ uri: image.uri }}
                style={{ width: 300, height: 300, borderRadius: 22 }}
              ></Image>
            )}
          </View>
          <TouchableOpacity style={styles.kayitButon} onPress={pickImage}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "white",fontWeight:"bold" }}>Pick an Image</Text>
              <Icon
                style={{ marginLeft: 3, marginTop: 1 }}
                name="build-outline"
                size={16}
                color="white"
              ></Icon>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.profileBar}>
            <View style={styles.seceneklerButonu}>
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="football-outline"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}> Ad :</Text>

              <TextInput
                
                onChangeText={(name) => setName(name)}
                autoCorrect={false}
                autoCapitalize="none"
                value={name}
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity
              style={styles.seceneklerButonu}
              
            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="document-text-outline"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}> Soyad :</Text>

              <TextInput
               
                onChangeText={(surname) => setSurname(surname)}
                value={surname}
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.textInput}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seceneklerButonu}
              
            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 8 }}
                name="document-text-outline"
                size={22}
                color="green"
              ></Icon>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {" "}
                Kullanıcı Adı :
              </Text>

              <TextInput
                value={username}
                onChangeText={(username) => setUsername(username)}
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.textInput}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.seceneklerButonu} >
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

              <TextInput
               value={date}
                onChangeText={(date) => setDate(date)}
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.textInput}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.kayitButon}
              onPress={() => {
                Update(name, surname, username, date);
                uploadImage();
              }}
            >
              <Text style={styles.butonText}>Güncelle</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileUpdate;

const styles = StyleSheet.create({
  textInput:{
    height:40,
    width:"80%",
    backgroundColor:"white"
  },
  container: {
    backgroundColor: "palegreen",
    flex: 1,
  },
  profileBar: {
    backgroundColor: "white",
    marginTop: 30,
    paddingTop: 30,
    height: "70%",
    borderTopWidth: 1,
    borderColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
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
    marginBottom:9,

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
  kayitButon: {
    backgroundColor: "blue",
    marginTop: 30,
    width: 150,
    padding: 8,
    alignItems: "center",
    borderRadius: 12,
    opacity: 0.6,
  },
  butonText: {
    color: "white",
    fontWeight: "900",
  },
});
