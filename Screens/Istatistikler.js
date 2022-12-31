import { SafeAreaView,ScrollView, StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React from 'react'
import BiHalisaha from '../Components/BiHalisaha'

const Istatistikler = () => {
    let istaList = [
        {id:1,oynanan:"12",kazanilan:"5",goller:"9",},

       
    ]  
    const flatData = ({ item, index }) => {
        return (
          <View>
          
            <View style={styles.card} > 
              <Text style={styles.textStyle}>Kazanma Yüzdesi:  {item.kazanilan} / {item.oynanan} =  %46</Text>
               <Text  style={styles.textStyle}>Atılan Gol:  {item.goller}</Text> 
               <Text  style={styles.textStyle}>Maç Başına Gol Ortalaması : ({item.goller})</Text> 
            </View>
             </View>) }

  return (
    <SafeAreaView>
        
            <BiHalisaha></BiHalisaha>
            <View  style={styles.anaView} >
            <View style={styles.header}>
                <Text style={styles.headerText}>İstatistiklerim</Text>
            </View>
      <FlatList
     
        data={istaList}
        keyExtractor={(item) => item.id.toString()}

        renderItem={flatData } />
    </View>
        
        
    </SafeAreaView>
  )
}

export default Istatistikler

const styles = StyleSheet.create({
    anaView:{marginTop:12},

      
    card : { 
        paddingTop:3,
      borderBottomWidth:1,
      borderColor:'grey',
      backgroundColor:'lightblue',
      height:120,
      borderBottomLeftRadius:3,
      flexDirection:"column",
      justifyContent:"space-between",
      marginBottom:12
      
     
    },
    textStyle:{
      fontSize:16,
      color:'#fff'
    }
    ,dateView:{
        backgroundColor:"lightblue"
    },
    header:{
        justifyContent:"center",
        alignItems:"center",
        marginBottom:9
    },
    headerText:{
        fontSize:21,
        fontWeight:"600"
    }
});