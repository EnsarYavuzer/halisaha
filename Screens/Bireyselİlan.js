import { StyleSheet, Text, View, SafeAreaView,TextInput,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {firebase} from "../src/index"
import DateTimePicker from '@react-native-community/datetimepicker';

const Bireyselİlan = () => {
  //datepicker
  const [date, setDate] = useState(new Date());
  const [mode,setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [time,setTime] = useState("");
 
  const onChange =(event,selectedDate)=>{
    const currentDate = selectedDate || date;
    setShow(Platform.OS==="ios");
    setDate(currentDate);
    
    let tempDate= new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
   

    setText(fDate)
    console.log("text text00" + text)
   
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);    
    } 
////
  const [time1, setTime1] = useState("");
  const [konum, setKonum] = useState("");
  const [tesis, setTesis] = useState("");
  const [user,setUser] = useState("");
  const [kapasite,setKapasite]= useState("");
  const email = (firebase.auth().currentUser.email)
  useEffect(()=>{
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
    .then((user)=>{
      setUser(user.data())
    })
  },[])
 
  

const ilanver = async(date,time1,konum,tesis,kapasite)=>{
  await firebase.firestore().collection('ilanlar2').doc()
  .set({
    gameDate:text,
    gameTime:time1,
    gameLocation:konum,
    gamePlace:tesis,
    kapasite:kapasite,
    gameOwner:user.surname,
    userMail:email,
    taraf1:user.currentTeam,
    taraf2:(user.currentTeam + "2"),
    skor:"",
    doluluk:"",
    key:(Math.random())

  })
  .then(alert("İlan Verildi"))

  .catch((error) => {
    alert(error.message), console.log("İlan Verisi Kaydedilemedi..Tekrar Deneyiniz.");
   
  });
 
}

  return (
    <SafeAreaView>
      <View style={{marginTop:80}}>
      <Text style={{fontWeight:"900",fontSize:35,marginLeft:"35%"}}>İlan Ver</Text>
        <TextInput
          placeholder="Halısahanın Konumu"
          placeholderTextColor="black"
          onChangeText={(konum) => setKonum(konum)}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}/>
         <TextInput
          placeholder="Halısanın İsmi"
          placeholderTextColor="black"
          onChangeText={(tesis) => setTesis(tesis)}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.dateButon} onPress={()=>showMode('date')}>
          
          <Text style={styles.TextDate}>Tarih Seçiniz :</Text>
          <Text style={{fontWeight:"600", marginTop:14, marginLeft:8}}>{text}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              minimumDate={new Date()}
              display='default'
              onChange={onChange}
              style={{marginTop:30,marginLeft:20}}
            />
          )}
         </TouchableOpacity>
         <TextInput
          placeholder="Maç Saati"
          placeholderTextColor="black"
          onChangeText={(time1) => setTime1(time1)}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
        />
         <TextInput
          placeholder="Kadro Kapasitesi"
          placeholderTextColor="black"
          onChangeText={(kapasite) => setKapasite(kapasite)}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.ilanverButon} onPress={()=>ilanver(date,time1,konum,tesis,kapasite)} >
          <Icon
            style={{ paddingLeft: 1, paddingRight: 4,padding:3}}
            name="add-outline"
            size={24}
            color="black"
          />
          <Text>İlan Ver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Bireyselİlan;

const styles = StyleSheet.create({
  textInput:{ 
    color:"white",
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor:"lightgray",
    marginTop:30,
    padding:10,
    borderRadius:14
  },
  ilanverButon: {
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "silver",
    marginBottom: 5,
    width: 115,
    marginLeft: 230,
    marginTop:30
  },
  dateButon:{
    flexDirection:"row",
    color:"white",
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor:"lightgray",
    marginTop:30,
    justifyContent:"center",
    borderRadius:14
  },
  TextDate:{
    color:"black",
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:8,
    padding:10,
   
  }
});