import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../src/index";


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("name");
  const [surname, setSurname] = useState("surname");
  const [username, setUsername] = useState("username");
  const [birthDate, setBirthdate] = useState("2*/0*/199*");
  const [email, setEmail] = useState("xxxx@gmail.com");
  const [password, setPassword] = useState("*******");
  const [controlPassword, setControl] = useState("*******");
  const currentTeam = "";
  const photoUrl = "";

const alarm= async ()=>{
  
  alert("Oopps! Arka tarafta bir sorunla karşılaştık. Giriş yapmak için lütfen uygulamayı kapatıp tekrar açınız.")
}

  const image = {
    uri: "https://i.pinimg.com/736x/85/28/56/852856748bc62e67197709e54213b37d.jpg",
  };
  const register = async (
    name,
    surname,
    username,
    birthDate,
    email,
    password
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://ensarapp.firebaseapp.com",
          })

          .catch((error) => {
            console.log("1.catch"), alert(error.message);
          })
          .then(alert("Email gönderildi"))
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                name: name,
                surname: surname,
                username: username,
                birthDate: birthDate,
                email: email,
                password: password,
                currentTeam: currentTeam,
                photoUrl: photoUrl,
              })
              .catch((error) => {
                alert(error.message), console.log("2.catch");
              });
          })

          .catch((error) => {
            alert(error.message);
            console.log("3.catch");
          })
          .then(() => alert("Kayıt olundu"));
      });
  };
  return (
    <SafeAreaView>
      <ImageBackground source={image} resizeMode="stretch" style={styles.imgBg} imageStyle={{opacity:1}}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop:35
          }}
        >
          <Text style={styles.header}>Üye Ol</Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <TextInput
              value={name}
              onChangeText={(name) => setName(name)}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput2}
            />
            <TextInput
              value={surname}
              onChangeText={(surname) => setSurname(surname)}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput2}
            />
          </View>

          <TextInput
            value={username}
            onChangeText={(username) => setUsername(username)}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.textInput}
          />
          <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.textInput}
            keyboardType="email-address"
          />
          <TextInput
            value={birthDate}

            onChangeText={(birthDate) => setBirthdate(birthDate)}
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="birthdate-year"
            style={styles.textInput}
            keyboardType="numbers-and-punctuation"
          />
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            autoCorrect={false}
            style={styles.textInput}
            keyboardType="twitter"
            secureTextEntry={true}
          />
          <TextInput
            value={controlPassword}
            onChangeText={(controlPassword) => setControl(controlPassword)}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.textInput}
            keyboardType="twitter"
            secureTextEntry={true}
          />
        </View>
        <View style={{ alignItems: "flex-start" }}>
          <TouchableOpacity
            style={styles.kayitButon}
            onPress={() => {
              register(name, surname, username, birthDate, email, password)
              .then(()=>alarm())
              
            }}
          >
            <Text style={styles.butonText}>Kayıt Ol</Text>
          </TouchableOpacity>
          
       
        </View>
        
        <View style={{ height: 140 }}></View>
      </ImageBackground>
      
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
    marginTop: 30,
    padding: 10,
    borderRadius: 14,
    opacity: 0.8,
  },
  textInput2: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
    marginTop: 30,
    padding: 10,
    borderRadius: 14,
    width:"50%",
    opacity: 0.8,
  },
  header: {
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 2,
    color: "lightblue",
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
    color: "black",
    fontWeight: "900",
  },
  imgBg: {
    justifyContent: "center",
    opacity: 0.8,
    zIndex: -1,
    height: "100%",
    width: "100%",
  },
});
