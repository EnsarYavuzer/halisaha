import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/Home";
import Deneme from "./Screens/Deneme";
import Oyna from "./Screens/Oyna";
import Takim from "./Screens/Takim";
import Profil from "./Screens/Profil";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import '../halisaha/src/index';
import LoginScreen from "./Screens/Login/LoginScreen";
import {useState,useEffect} from "react";
import ProfileInfo from "./Screens/ProfileInfo"
import MacGecmis from "./Screens/MacGecmis"
import Istatistikler from "./Screens/Istatistikler"
import TakimBul from "./Screens/TakimBul"
import Bireysel from "./Screens/Bireysel"
import Bireyselİlan from "./Screens/Bireyselİlan";
import TakimIlanVer from "./Screens/TakimIlanVer"
import TakimEkle from "./Screens/TakimEkle"
import RegisterScreen from "./Screens/Login/RegisterScreen";
import {firebase} from "../halisaha/src/index"
import { NavigationContainer } from '@react-navigation/native';
import TakimProfil from "./Screens/TakimProfil"
import ChatScreen from "./Screens/Chat/ChatScreen";
import ProfileUpdate from "./Screens/ProfileUpdate";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator= ()=> {
 
  return(
    
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused  ? 'home' : 'home-outline';
        } else if (route.name === 'Deneme') {
          iconName = focused ? 'pie-chart-sharp' : 'pie-chart-outline';
        }
        else if (route.name === 'Profil') {
          iconName = focused ? 'person' : 'person-outline';
        }
        else if (route.name==='Takim') {
          iconName= focused ? 'shirt' : 'shirt-outline';
        }
        else if (route.name==='Oyna') {
          iconName= focused ? 'football-sharp' : 'football-outline';
        }
        else if (route.name==='Chat'){
          iconName=focused ? 'chatbox-ellipses-sharp' : 'chatbox-ellipses-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25}/>;
      },
      tabBarShowLabel: false
    })}
    > 
      <Tab.Screen  name="Home" options={{headerShown:false}} component={Home}  />
      <Tab.Screen name="Takim" component={Takim}></Tab.Screen>
      <Tab.Screen name="Oyna"  options={{headerShown:false}} component={Oyna}></Tab.Screen>
      <Tab.Screen name="Profil" options={{headerShown:false}}  component={Profil} /> 
       <Tab.Screen name="Chat" options={{headerShown:false}} component={ChatScreen} />
      
      
    </Tab.Navigator>
  )
}

function App  (){
  const [user, setUser] = useState();
  const [initalizing, setInitalizing] = useState(true);
  const x=(firebase.auth().currentUser)

  function onAuthStateChanged(user) {
    setUser(user);
    if (initalizing) setInitalizing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initalizing) return null;
  if (!user) {
    return (
      <Stack.Navigator>
         <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
         <Stack.Screen name="Kayit"  options={{ headerShown: false }} component={RegisterScreen} />
      </Stack.Navigator>
    )
  }

  return (
  <Stack.Navigator>
      <Stack.Screen name="Anasayfa" component={TabNavigator} options={{headerShown:false}}/>
      <Stack.Screen name="Info"  options={{headerShown:false}} component={ProfileInfo}></Stack.Screen>
      <Stack.Screen name="Gecmis" component={MacGecmis}/>
      <Stack.Screen name="İsta" options={{headerShown:false}} component={Istatistikler}/>    
      <Stack.Screen name="TakimBul" options={{headerShown:false}}  component={TakimBul}/>
      <Stack.Screen name="Bireysel" options={{headerShown:false}}  component={Bireysel}/> 
      <Stack.Screen name="Bireyselİlan"  options={{headerShown:false}} component={Bireyselİlan} />      
      <Stack.Screen name='TakimIlan' options={{headerShown:false}}  component={TakimIlanVer} />
      <Stack.Screen name='TakimEkle' options={{headerShown:false}} component={TakimEkle} />
      <Stack.Screen name="Kayit" options={{headerShown:false}} component={RegisterScreen} />
      <Stack.Screen name="TakimProfil" options={{headerShown:false}} component={TakimProfil}/>
      <Stack.Screen name="ProfilUpdate" options={{headerShown:false}} component={ProfileUpdate} />
      <Stack.Screen name="Chat" options={{headerShown:false}} component={ChatScreen} />
      
  </Stack.Navigator>
)

}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}


