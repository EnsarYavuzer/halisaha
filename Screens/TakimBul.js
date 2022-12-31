import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BiHalisaha from "../Components/BiHalisaha";
import Icon from "react-native-vector-icons/Ionicons";
import { firebase } from "../src/index";
const id = Math.random();

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const TakimBul = ({ navigation }) => {
  const [meetsList,setMeetsList]=useState([]);
  const [gecmisList,setGecmisList]=useState([]);
  const [gelecekList,setGelecekList]=useState([]);


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [list, setList] = useState("");

  // useEffect(()=>{
  //   const ilanGetir =async ()=>{
  //     const data= await firebase.firestore().collection("ilanlar").get()
  //     setList(data.docs.map((doc)=>({...doc.data()})))
  //   }
  //   ilanGetir();
  // },[refreshing])

  //caner useEffect
  useEffect(() => {
    const meetsListele = async () => {
      const data = await firebase.firestore().collection("ilanlar").get()
      setMeetsList(data.docs.map((doc) => ({ ...doc.data() })));
      const mList = data.docs.map((doc) => ({ ...doc.data() }));
      console.log("denemee", mList)
      let gelecek = [];
      let gecmis = [];

      for (let i = 0; i < mList.length; i++) {
        console.log(mList[i].gameDate)
        let tarih = new Date(mList[i].gameDate.split("/").reverse().join("/"))
        let tarihNow = new Date()
        
        if (tarih.getDate() < tarihNow.getDate() && tarih.getMonth() <= tarihNow.getMonth() && tarih.getFullYear() <= tarihNow.getFullYear()) {
          gecmis.push(mList[i])
        } else {
          gelecek.push(mList[i])
        }

      }
      setGecmisList(gecmis)
      setGelecekList(gelecek)
      return data.docs.map((doc) => ({ ...doc.data() }));
    };
    meetsListele();

    console.log("gecmiş", gecmisList)
    console.log("gelecek", gelecekList)
  }, [refreshing])
  
 


  const flatData = ({ item }) => {
    return (
      <View>
        <View style={styles.card}>
          <TouchableOpacity style={styles.buton}>  
            <Text style={{fontStyle:"italic",color:"red"}} >{item.gameLocation}</Text>  
            <Text  style={{marginTop:9,fontStyle:"italic",fontWeight:"600"}}>{item.taraf1} '</Text>
            <Text>in Takımı</Text>
          </TouchableOpacity>
          
          <View style={styles.dateView}>
            <Text style={{fontSize:8,color:"blue"}}>Konum: {item.gamePlace}</Text>
            <Text style={{fontSize:10,color:"green"}}>12.00-13-00</Text>
            <Text style={{marginTop:5,fontStyle:"italic"}}>Maç Tarihi:</Text>

            <Text style={{ fontSize: 14, color: "red",fontStyle:"italic" }}>{item.gameDate}</Text>
            
          </View>

          <View style={styles.buton}>
            
            <Text>{item.taraf1} ' in takımına</Text>
            <View style={{flexDirection:"row"}}>
              <Text>rakip olmak için </Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
                <Text style={{color:"red",fontSize:14}}>Tıkla!</Text>
              </TouchableOpacity>      
            </View>          
          </View> 
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          /> } >
        <BiHalisaha></BiHalisaha>
        <TouchableOpacity
          style={styles.ilanverButon}
          onPress={() => navigation.navigate("TakimIlan")}
        >
          <Icon
            style={{ paddingLeft: 1, paddingRight: 4 }}
            name="add-outline"
            size={26}
            color="black"
          />
          <Text>İlan Ver</Text>
        </TouchableOpacity>
        <View style={styles.anaView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Takım İlan Listesi</Text>
          </View>
          <FlatList data={gelecekList} renderItem={flatData} keyExtractor={(item,index)=>index}
          />
        </View>
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default TakimBul;

const styles = StyleSheet.create({
  anaView: {
    marginTop: 28,
  },

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
    height: 75,
    borderTopStartRadius:7,
    borderBottomStartRadius:7,
    borderBottomRightRadius: 22,
    borderTopRightRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  textStyle: {
    fontSize: 16,
    color: "black",
    marginLeft: 3,
    marginRight: 3,
    marginTop: 5,
  },
  dateView: {
    marginTop:1
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 21,
    fontWeight: "600",
    letterSpacing: 2,
    textDecorationLine: "underline",
    textDecorationStyle: "double",
    textShadowRadius: 13,
    object: { width: 30, height: 30 },
    textShadowColor: "green",
  },
  buton: {
    
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
    marginBottom: 5,
    flexDirection: "column",
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
  },
});
