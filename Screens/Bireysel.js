import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BiHalisaha from "../Components/BiHalisaha";
import Icon from "react-native-vector-icons/Ionicons";
import { firebase } from "../src/index";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Bireysel = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [meetsList, setMeetsList] = useState([]);
  const [gecmisList, setGecmisList] = useState([]);
  const [gelecekList, setGelecekList] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [list, setList] = useState("");

  useEffect(() => {
    const meetsListele = async () => {
      const data = await firebase.firestore().collection("ilanlar2").get();
      setMeetsList(data.docs.map((doc) => ({ ...doc.data() })));
      const mList = data.docs.map((doc) => ({ ...doc.data() }));
      console.log("denemee", mList);
      let gelecek = [];
      let gecmis = [];

      for (let i = 0; i < mList.length; i++) {
        console.log(mList[i].gameDate);
        let tarih = new Date(mList[i].gameDate.split("/").reverse().join("/"));
        let tarihNow = new Date();

        if (
          tarih.getDate() < tarihNow.getDate() &&
          tarih.getMonth() <= tarihNow.getMonth() &&
          tarih.getFullYear() <= tarihNow.getFullYear()
        ) {
          gecmis.push(mList[i]);
        } else {
          gelecek.push(mList[i]);
        }
      }
      setGecmisList(gecmis);
      setGelecekList(gelecek);
      return data.docs.map((doc) => ({ ...doc.data() }));
    };
    meetsListele();

    console.log("gecmiş", gecmisList);
    console.log("gelecek", gelecekList);
  }, [refreshing]);

  const flatData = ({ item }) => {
    return (
      <View>
        <View style={styles.card}>
          <View style={{ flexDirection: "column" }}>
            {/* <View style={styles.dateView}>
              <Text style={{ fontSize: 11, color: "red" }}>
                {item.gameDate}
              </Text>
            </View>
            <Text style={styles.textStyle}>{item.taraf1} :</Text> */}
            <Text style={{color:"red"}}>     {item.gameDate}        Saat : {item.gameTime}</Text>
            <Text style={{color:"green",fontWeight:"bold"}}>            {item.gameOwner}</Text>
            <Text style={{fontStyle:"italic"}}> BiHalisaha kullanıcıları ile </Text>
            <Text style={{fontStyle:"italic"}}> buradan organize olup </Text>
            <Text style={{fontStyle:"italic",color:"red"}}>     kıran kırana</Text>
            <Text style={{fontStyle:"italic"}}> bir maç yapmak istiyor !</Text>
            <Text style={{color:"red",marginTop:7}}></Text>
          </View>
          
            <View style={{marginRight:12}}>
            
            <Text style={{fontStyle:"italic", color:"blue",marginTop:5}}>Konum: {item.gameLocation}</Text>
            <Text style={{fontWeight:"bold"}}>{item.gamePlace}</Text>
            <Text style={{fontWeight:"500"}}>     {item.kapasite} Kişilik</Text>

            <TouchableOpacity style={styles.buton} onPress={()=>navigation.navigate("Chat")}>
            <Text style={{color:"red"}}>Sende Katıl!</Text>
          </TouchableOpacity>
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <BiHalisaha></BiHalisaha>
        <TouchableOpacity
          style={styles.ilanverButon}
          onPress={() => navigation.navigate("Bireyselİlan")}
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
            <Text style={styles.headerText}>Bireysel İlan Listesi</Text>
          </View>
          <FlatList
            data={gelecekList}
            renderItem={flatData}
            keyExtractor={(item, index) => index}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bireysel;

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
    height: 130,
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
  textStyle2: {
    fontSize: 16,
    color: "black",
    marginLeft: 3,
    marginRight: 3,
    marginTop: 12,
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
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "silver",
    marginBottom: 3,
    flexDirection: "column",
    width:100,
    marginTop:10
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
  scrollView: {},
});
