import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import BiHalisaha from "../Components/BiHalisaha";
import { firebase } from "../src/index";
const TakimProfil = ({ route }) => {
  const anonim =
    "https://st3.depositphotos.com/3864435/16692/i/600/depositphotos_166926972-stock-photo-unknown-person-concept.jpg";
  const img = route.params.takimBilgi.teamUrl;
  console.log(route.params.takimBilgi.teamUrl);
  let macList = [
    {
      id: 1,
      taraf1: "Fenerbahçe",
      taraf2: "Galatasray",
      sonuc: "6-0",
      date: "12.06.2022",
    },
    {
      id: 2,
      taraf1: "Beşiktaş",
      taraf2: "Trabzon",
      sonuc: "0-0",
      date: "12.06.2022",
    },
    {
      id: 3,
      taraf1: "Barcelona",
      taraf2: "Real-madrid",
      sonuc: "3-2",
      date: "12.06.2022",
    },
  ];
  
  const flatData = ({ item, index }) => {
    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.textStyle}> {item.taraf1} </Text>
          <Text style={styles.textStyle}>{item.sonuc}</Text>
          <Text style={styles.textStyle}> {item.taraf2} </Text>
        </View>
      </View>
    );
  };
  const flatData2 = ({ item, index }) => {
    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.textStyle}> {item.taraf1} </Text>
          <Text style={styles.textStyle}>{item.sonuc}</Text>
          <Text style={styles.textStyle}> {item.taraf2}  / / /  </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <BiHalisaha></BiHalisaha>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={styles.buton}>
          {img != "" ? (
            <Image
              style={{
                backgroundColor: "lightgray",
                width: 125,
                height: 125,
                backgroundColor: "lightgray",
                borderRadius: 9999,
              }}
              source={{ uri: img }}
            ></Image>
          ) : (
            <Image
              style={{
                width: 125,
                height: 125,
                borderRadius: 9,
              }}
              source={{ uri: anonim }}
            ></Image>
          )}

          <Icon style={styles.Icon} name="color-wand" size={20} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.takimAd}>{route.params.takimBilgi.takimAd}</Text>
          <View style={{ flexDirection: "row" }}>
            <Icon
              style={{ marginRight: 5 }}
              name="person"
              size={12}
              color="black"
            ></Icon>
            <Text>{route.params.takimBilgi.oyuncuSayisi}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon
              style={{ marginRight: 5 }}
              name="football"
              size={12}
              color="black"
            ></Icon>
            <Text>{route.params.takimBilgi.macSayisi}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.davetEt}>
        <Icon
          style={{ marginRight: 5 }}
          name="add-circle-outline"
          size={16}
          color="black"
        ></Icon>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>
          {" "}
          Oyuncu Davet Et
        </Text>
      </TouchableOpacity>
      <View style={{ height: 100, marginTop: 12 }}>
        <View style={styles.davetEt}>
          <Icon
            style={{ marginRight: 5 }}
            name="arrow-undo-outline"
            size={18}
            color="black"
          />
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Geçmiş Maçlar</Text>
        </View>
        <View style={styles.flatView}>
          <FlatList
            style={{ marginTop: 2 }}
            data={macList}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={flatData2}
          />
        </View>
      </View>

      <View style={{ height: 100, marginTop: 12 }}>
        <View style={styles.davetEt}>
          <Icon
            style={{ marginRight: 5 }}
            name="star"
            size={18}
            color="black"
          />
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Oyuncu Listesi
          </Text>
        </View>
        <View style={styles.flatView}>
          <FlatList
            style={{ marginTop: 3 }}
            data={macList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={flatData}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TakimProfil;

const styles = StyleSheet.create({
  buton: {
    padding: 12,
    marginTop: 30,

    borderRadius: 20,
  },
  Icon: {
    paddingLeft: 8,
    paddingRight: 15,
    position: "absolute",
    bottom: 235,
    left: 220,
  },
  takimAd: {
    fontSize: 22,
    backgroundColor: "lightgreen",
    padding: 3,
    marginBottom: 30,
    borderRadius: 18,
  },
  davetEt: {
    flexDirection: "row",
    borderRadius: 7,
    backgroundColor: "lightgreen",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },
  textStyle: {
    fontSize: 16,
    color: "black",
  },
  card: {
    paddingTop: 7,
    borderBottomWidth: 1,
    borderColor: "grey",
    backgroundColor: "white",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  flatView:{
    width:"100%",
    height:300
  }
});
