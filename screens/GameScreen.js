import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'

const generateRandomBetween = ( min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
}

export default ({userChoice, onGameOver}) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 99, userChoice)
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [rounds, setRounds] = useState(0)

    useEffect(() => {
      if (currentGuess === userChoice) {
        onGameOver(rounds);
      }  
    }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction == "lower" && currentGuess < userChoice) ||
    (direction == "higher" && currentGuess > userChoice) 
    ){
      Alert.alert("Don't lie", "You know that this wrong...",
      [{text: "Sorry!", style:"cancel"}]);
      return;
    }
    if (direction == "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(currentRounds => {currentRounds + 1});
  }
  return (
   <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("lower")}/>
        <Button title="GREATER" onPress={() => nextGuessHandler("higher")}/>
      </Card>
    </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      alignItems: "center"
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: 300,
      marginTop: 20,
      maxWidth: "80%"
    }
  });