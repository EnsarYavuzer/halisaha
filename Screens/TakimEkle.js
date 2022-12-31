import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import BiHalisaha from "../Components/BiHalisaha";
import { firebase } from "../src/index";

const TakimEkle = ({ navigation: { navigate } }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const email = firebase.auth().currentUser.email;
  const oyuncuSayisi = "2";
  const macSayisi = "3";

  //fotoPick-storage
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
    setİmage(source);
  };
  //storagea url gönderme
  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(fileName).put(blob);

    try {
      await ref;
    } catch (error) {
      alert(error.message)
    }
    setUploading(false);
    alert("Photo uploudled");
    setİmage(null);
//resul1
    const uri = await firebase
      .storage()
      .ref()
      .child(fileName)
      .getDownloadURL()
      .then((downloadUrl) => {
        return downloadUrl;
      })
      .catch((error) => alert(error.message));
      console.log("URİ",uri)
      console.log("URi",uri)
      console.log("URRRL",url)
      console.log("URRRL",url)
      console.log("URRRL",url)
    setUrl(uri);
    console.log("URRR2",url)
    console.log("URRRL2",url)
    
    
  };

  //ensar 1
  // await firebase
  //     .storage()
  //     .ref()
  //     .child(fileName)
  //     .getDownloadURL()
  //     .then((downloadUrl) => {
  //       firebase
  //         .firestore()
  //         .collection("users")
  //         .doc(firebase.auth().currentUser.uid)
  //         .update({
  //           photoUrl: downloadUrl,
  //         });
  //     })
  //     .catch((error) => Alert(error.message));
  // };

  //////// urli takımın tablosuna set etme
  const setTeam = async () => {
    await firebase
      .firestore()
      .collection("Takimlar")
      .doc(firebase.auth().currentUser.uid)
      .set({
        macSayisi:macSayisi,
        oyuncuSayisi:oyuncuSayisi,
        sahibinEmail:email,
        takimAd:name,
        teamUrl:url,
      }) 
      .catch((error)=>alert(error.message))
      .then(
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            currentTeam:name,
          })
      )
      .then(() => {
        alert("Takım Eklendi");
      });
  };
  
    const updateTeam=  ()=>{
      var users_query =firebase.firestore().collection('users').where('sahibinEmail','==',email);
      users_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
         doc.ref.update({
          teamUrl:url
         });
      });
    })
    .catch((error)=>alert(error.message))
    .then(()=>alert("Url güncelleme başarılı"))
     }
  
  const CombineFunctions=  ()=>{
   uploadImage()
   .then(()=>{
    setTeam();
   })
   .then(()=>{
    updateTeam();
   })
  }
    

console.log("photoUrl",url)
  return (
    <SafeAreaView>
      <BiHalisaha></BiHalisaha>

      <ScrollView>
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
              <Text style={{ color: "white" }}>Pick an Image</Text>
              <Icon
                style={{ marginLeft: 3, marginTop: 1 }}
                name="build-outline"
                size={16}
                color="white"
              ></Icon>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 12 }}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon style={styles.Icon} name="color-wand" size={20} color="black" />
          <Text style={{ marginTop: 9 }}>Takim Fotoğrafı Yükle</Text>
        </View>

        <TextInput
          placeholder="Takım İsmi"
          placeholderTextColor="black"
          onChangeText={(name) => setName(name)}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
        />
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            style={styles.kayitButon}
            onPress={()=>CombineFunctions()}         
          >
            <Text style={styles.butonText}>Takımı Ekle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TakimEkle;

const styles = StyleSheet.create({
  butonImg: {
    padding: 12,
    marginTop: 30,
    flexDirection: "column",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },

  textInput: {
    color: "white",
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "lightgray",
    marginTop: 30,
    padding: 10,
    borderRadius: 14,
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
