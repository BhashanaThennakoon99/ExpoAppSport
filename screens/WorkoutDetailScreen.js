import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function WorkoutDetailScreen({ route, navigation }) {
  const { workout } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text style={styles.details}>Duration: {workout.duration}</Text>
      <Text style={styles.details}>Calories: {workout.calories}</Text>
      <Text style={styles.description}>
        This workout is designed to improve your overall fitness. Start whenever you're ready!
      </Text>
      <Button title="Back to Routines" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
});
