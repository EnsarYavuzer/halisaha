import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatScreen = () => {
  return (
    <SafeAreaView>
        <ScrollView>
            <Text style={{fontSize:50}}>Selam Chat</Text>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})