import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const workouts = [
  { id: '1', name: 'Cardio Blast', duration: '30 mins', calories: '200 kcal' },
  { id: '2', name: 'Strength Training', duration: '45 mins', calories: '350 kcal' },
  { id: '3', name: 'Yoga Flow', duration: '60 mins', calories: '150 kcal' },
];

export default function WorkoutListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Routines</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('WorkoutTimer', { workout: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>Duration: {item.duration}</Text>
            <Text style={styles.details}>Calories: {item.calories}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf4fc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});
