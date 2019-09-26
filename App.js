import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOver";

export default function App() {
  const [userNumber, setUserNumber] = useState(0);
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0)
  }

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRounds == 2) {
    content = <GameOverScreen roundNumber={guessRounds} userNumber={userNumber} />;
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
