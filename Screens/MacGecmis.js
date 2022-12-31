import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import React,{useEffect,useState} from "react";
import BiHalisaha from "../Components/BiHalisaha";
import {firebase} from "../src/index"





const MacGecmis = ({ navigation }) => {

const [list,setList]=useState("");
const [list2,setList2]=useState("");


const currentEmail = (firebase.auth().currentUser.email)


useEffect( ()=>{
  firebase.firestore().collection("ilanlar")
  .where("userMail", "==", currentEmail).get()
 .then((list)=>{
  const l1 =[];
  list.forEach(x => {
    const data= x.data();
    l1.push(data);
  });
  setList(l1);
 })
 .then(()=>{
  firebase.firestore().collection("ilanlar2")
  .where("userMail", "==", currentEmail).get()
 .then((list2)=>{
  const l2 = [];
  list2.forEach(x => {
    const data2= x.data();
    l2.push(data2);
  });
  setList2(l2);
 })
 })
 .catch((error)=>alert(error.message))
},[])


const skor1="12" 
const skor2="434"
const skorAta=async()=>{
  await firebase.firestore().collection("ilanlar").doc().update({
    skor1:skor1,
    skor2:skor2,
  })
}

  
   
const flatData = ({item}) => {
  return (
    <View>
      <View style={styles.dateView}>
        <Text style={{ fontSize: 16, color: "green" }}>  {item.gameDate} </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.textStyle}>Oynanan Yer:{item.gamePlace} </Text>
       <View style={{flexDirection:"row"}}>
        <Text style={styles.textStyle}>{item.taraf1}: 3 - {item.skor1}</Text>
        <Text style={styles.textStyle}>{item.skor2}  2 :{item.taraf2}</Text>
        <TouchableOpacity onPress={()=>skorAta(skor1,skor2)}  style={styles.buton}>
          <Text>Skor Ata</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buton2}>
          <Text style={{color:"white",fontSize:12}}>X</Text>
        </TouchableOpacity>
       </View>
       
      </View>
    
    </View>
  );
};
  
  const flatData2 = ({item}) => {
    return (
      <View>
        <View style={styles.dateView}>
          <Text style={{ fontSize: 16,color:"green"}}>  {item.gameDate} </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.textStyle}>Oynanan Yer :  {item.gamePlace} </Text>
         <View style={{flexDirection:"row"}}>
          <Text style={styles.textStyle}>{item.taraf1} : 3 - {item.skor1}</Text>
          <Text style={styles.textStyle}>{item.skor2}  2 :{item.taraf2}</Text>
         <TouchableOpacity onPress={()=>skorAta()} style={styles.buton}>
          <Text>Skor Ata</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buton2}>
          <Text style={{color:"white",fontSize:12}}>X</Text>
        </TouchableOpacity>
         </View>
         
        </View>
        
      </View>
    );
  };

  return (
    <SafeAreaView>
      
        <BiHalisaha></BiHalisaha>
        <View style={styles.anaView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Geçmiş Maçlar</Text>
          </View>
          <FlatList
            data={list}
           keyExtractor={(item,index)=>index}
            renderItem={flatData}
          />
          <FlatList 
            data={list2}
            keyExtractor={(item,index)=>index}
            renderItem={flatData2}
          />
        </View>
        
      
    </SafeAreaView>
  );
};

export default MacGecmis;

const styles = StyleSheet.create({
  anaView: { marginTop: 22 },

  imageStyle: {
    height: 180,
    width: 385,
    marginTop: 6,
    marginLeft: 3,
    marginRight: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  card: {
    paddingTop: 7,
    borderBottomWidth: 1,
    borderColor: "grey",
    backgroundColor: "lightblue",
    height: 73,
    
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  textStyle: {
    fontSize: 16,
    color: "black",
  },
  dateView: {
    backgroundColor: "white",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  headerText: {
    fontSize: 21,
    fontWeight: "600",
  },
  buton:{
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "silver",
    marginBottom: 5,
    width: 115,
    marginLeft:26
    
  }
  ,buton2:{
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "silver",
    marginBottom: 5,
    width: 20,
    marginLeft:7
    
  }
});
