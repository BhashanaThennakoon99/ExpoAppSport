import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkoutScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const loadTimer = async () => {
      try {
        const savedTime = await AsyncStorage.getItem('workoutTimer');
        if (savedTime) {
          setSeconds(parseInt(savedTime, 10));
        }
      } catch (error) {
        console.error('Error loading timer:', error);
      }
    };
    loadTimer();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const saveTimer = async () => {
      try {
        await AsyncStorage.setItem('workoutTimer', seconds.toString());
      } catch (error) {
        console.error('Error saving timer:', error);
      }
    };
    saveTimer();
  }, [seconds]);

  const resetTimer = async () => {
    setIsRunning(false);
    setSeconds(0);
    try {
      await AsyncStorage.removeItem('workoutTimer');
    } catch (error) {
      console.error('Error resetting timer:', error);
    }
  };

  const caloriesBurned = Math.floor((seconds / 60) * 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Timer</Text>
      <Text style={styles.timer}>{new Date(seconds * 1000).toISOString().substr(11, 8)}</Text>
      <Text style={styles.calories}>Calories Burned: {caloriesBurned} kcal</Text>
      <Button title={isRunning ? 'Pause' : 'Start'} onPress={() => setIsRunning(!isRunning)} />
      <Button title="Reset Timer" onPress={resetTimer} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6f5d6',
    padding: 20,
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
    color: '#333',
  },
  calories: {
    fontSize: 20,
    marginBottom: 20,
    color: '#555',
  },
});
