import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import BiHalisaha from "../Components/BiHalisaha";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { Video } from "expo-av";
import { firebase } from "../src/index";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Home = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
  }, []);
  //anonim photo
  const anonim =
    "https://st3.depositphotos.com/3864435/16692/i/600/depositphotos_166926972-stock-photo-unknown-person-concept.jpg";
  const logOut = async () => {
    await firebase.auth().signOut();
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((user) => {
        setUser(user.data());
      });
    console.log("useEffect 1 çalıştı");
  }, [refreshing]);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [orientationIsLandscape, setOrientation] = React.useState(true);

  async function changeScreenOrientation() {
    if (orientationIsLandscape == true) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSSCAPE);
    } else if (orientationIsLandscape == false) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  const toggleOrientation = () => {
    setOrientation(!orientationIsLandscape);
    changeScreenOrientation();
  };
  const haftaninGoluAlert = () => {
    alert("ensaryavuzerx@gmail.com          Adresine mail olarak gönderiniz.");
    return alert;
  };
  const img = user.photoUrl;

  const image = {
    uri: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
  };

  return (
    <SafeAreaView style={styles.container}>
      <BiHalisaha />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginTop: 8 }}>
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
          </View>
          <View style={{ padding: 12 }}>
            <Text style={{ margin: 3, fontSize: 30, fontWeight: "bold" }}>
              {user.name} {user.surname}
            </Text>
            <Text
              style={{
                fontWeight: "300",
              }}
            >
              Bu hafta hiç maçın yok.
            </Text>
            <TouchableOpacity
              onPress={() => navigate("Oyna")}
              style={{
                backgroundColor: "greenyellow",
                alignItems: "center",
                marginTop: 5,
                flexDirection: "row",
              }}
            >
              <Icon
                style={{ paddingLeft: 8, paddingRight: 15 }}
                name="play-forward-sharp"
                size={15}
                color="green"
              ></Icon>
              <Text style={styles.hText2}>Hemen Oyna</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 3 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "greenyellow",
              alignItems: "center",
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
            }}
          >
            <Icon
              style={{ paddingRight: 4 }}
              name="football-outline"
              size={15}
              color=""
            ></Icon>
            <Text style={styles.hText2}>Haftanin Golleri</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Video
            ref={video}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/halisahaapp-d2523.appspot.com/o/Senibanabaa%C4%9Fla2.mov?alt=media&token=91634e9b-c3da-4272-b3e5-11beb2b0566a",
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            style={styles.video}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              position: "absolute",
              top: 100,
              left: 160,
              zIndex: 1,
            }}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            <Icon
              style={{ paddingRight: 4, opacity: 0.4 }}
              name="play-outline"
              size={15}
              color="white"
            ></Icon>
            <Text style={{ color: "white", opacity: 0.4 }}>
              {status.isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={haftaninGoluAlert}
          style={{ marginBottom: 8, marginTop: 8, borderBottomWidth: 1 }}
        >
          <Text style={{ fontWeight: "400", color: "lightblack" }}>
            Sende kendi golünün Hafta'nın Gölü seçilmesini istiyorsan golünü bu
            adresten hemen bize gönder.
          </Text>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              position: "absolute",
              left: 259,
              top: 18,
            }}
          >
            Buraya Tıkla.
          </Text>
        </TouchableOpacity>

        <View style={styles.hOyuncuContainer}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: "center",
              opacity: 0.2,
              zIndex: -1,
            }}
          >
            <View>
              <Icon
                style={{ paddingRight: 4 }}
                name="football-outline"
                size={40}
                color=""
              ></Icon>
            </View>
            <View style={styles.hTextContainer}>
              <Text> </Text>
              <Text> </Text>
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 460,
            left: 90,
          }}
        >
          <View>
            <Icon
              style={{ paddingRight: 4 }}
              name="football-outline"
              size={40}
              color="purple"
            ></Icon>
          </View>
          <View style={styles.hTextContainer}>
            <Text style={styles.hText1}>Haftanin Oyunucusu</Text>
            <Text style={styles.hText2}> Ensar Yavuzer</Text>
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {},

  video: {
    width: 320,
    height: 200,
    alignSelf: "center",
    zIndex: -1,
  },
  hOyuncuContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 100,
  },
  hIconContainer: {
    margin: 10,
  },
  hTextContainer: {},
  hText1: {
    fontWeight: "bold",
    zIndex: 1,
    color: "green",
  },
  hText2: {
    fontWeight: "600",
    color: "green",
  },
});
