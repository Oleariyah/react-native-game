import React, { useState } from 'react';
import {
   StyleSheet, 
   Text, 
   View, 
   Button, 
   Keyboard, 
   Alert,
   TouchableWithoutFeedback 
  } from 'react-native';
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";

export default ({onStartGame}) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }
  const dismissKeyboard = () => Keyboard.dismiss();
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false)
  }
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if ( isNaN(chosenNumber) || chosenNumber <= 0 ) {
      Alert.alert("Invalid Number", "Number has to be a number between 1 and 99",
        [{text: "Okay", style: "destructive", onPress: resetInputHandler}]
      )
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  }
  
  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = 
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <View>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <Button title="START GAME" onPress={() => onStartGame(selectedNumber)}/>
        </View>
      </Card>
  }
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.screen}>
      <Text style={styles.title}>Start A New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
            <Input 
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
            autoCorrect={false}
            autoCapitalize="none" 
            blurOnsubmit 
            onChangeText={numberInputHandler}
            value={enteredValue}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button title="RESET" onPress={resetInputHandler} color={Colors.accent} />
                </View>
                <View style={styles.button}>
                  <Button title="CONFIRM"  onPress={confirmInputHandler} color={Colors.primary} />
                </View>
             </View>
        </Card>
        {confirmedOutput}
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      alignItems: "center"
    },
    title: {
      fontSize: 20,
      marginVertical: 10    
    },
    inputContainer: {
      width: 300,
      maxWidth: "80%",
      alignItems: "center"
    },
    buttonContainer: {
      flexDirection: "row",
      width: "100%",
      paddingVertical: 5,
      justifyContent: "space-between",
      paddingHorizontal: 15
    }, 
    button: {
      width: 100
    },
    input: {
      width: 50, 
      textAlign: "center"
    },
    summaryContainer: {
      marginTop: 20,
      alignItems: "center" 
    }
  });