import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../src/index";

const LoginScreen = ({ navigation: { navigate } }) => {
  const image = {
    uri: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("giriş yapıldı");
    } catch (error) {
      alert("Hatalı Kullanıcı Adı veya Şifre");
    }
  };
  return (
   
     
        <SafeAreaView onPress={Keyboard.dismiss}>
          <View style={{ }}></View>
          <ImageBackground
            source={image}
            resizeMode="stretch"
            style={styles.imgBg}
            imageStyle={{opacity:0.5}}
          >
          <Text style={{fontSize:67}}>Bİ HALISAHA?</Text>
            <TextInput
              placeholder="Email Adresi"
              placeholderTextColor="white"
              onChangeText={(email) => setEmail(email)}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Şifre"
              placeholderTextColor="white"
              onChangeText={(password) => setPassword(password)}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
            <View style={{alignItems:"flex-end"}}>

               <TouchableOpacity
              style={styles.buton}
              onPress={(email, password) => loginUser(email, password)}
            >
              <Text style={styles.butonText}>Giriş Yap</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.Kayitbuton}
              onPress={() => navigate("Kayit")}
            >
              <Text style={styles.butonText}>Kayit Ol</Text>
            </TouchableOpacity>
            
            </View>
           
          </ImageBackground>
        </SafeAreaView>
     
  
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    color: "white",
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "blue",
    marginTop: 30,
    padding: 10,
    borderRadius: 14,
  },
  imgBg: {
    justifyContent: "center",
    opacity: 0.5,
    height:"100%",
    width:"100%"
  },
  buton: {
    backgroundColor: "blue",
    marginTop: 30,
    width: 90,
    padding: 8,
    alignItems: "center",
    borderRadius: 12,
  },
  butonText: {
    color: "white",
    fontWeight: "900",
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "white",
    
    
  },
  Kayitbuton: {
    backgroundColor: "blue",
    marginTop: 30,
    width: 90,
    padding: 8,
    alignItems: "center",
    borderRadius: 12,
  },
});
