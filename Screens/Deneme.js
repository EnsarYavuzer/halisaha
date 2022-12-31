import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BiHalisaha from "../Components/BiHalisaha";
const Deneme = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BiHalisaha />
      <ScrollView style={styles.scrollView}>
        <Text>Denemee</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Deneme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {},
});
