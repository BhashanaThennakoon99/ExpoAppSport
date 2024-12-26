import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function WorkoutTimerScreen({ route, navigation }) {
  const { workout } = route.params;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text style={styles.timer}>{`Time: ${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`}</Text>
      <View style={styles.buttons}>
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={() => setIsRunning(!isRunning)} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
      <Button title="Back to Workouts" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
});
