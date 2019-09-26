import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default ({roundNumber, userNumber}) => {
  return (
    <View style={styles.screen}>
        <Text>The Game is over</Text>
        <Text>Number of rounds:{roundNumber}</Text>
        <Text>Number was: {userNumber}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
  });