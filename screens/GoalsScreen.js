import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function GoalsScreen() {
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    if (goal.trim()) {
      setGoals([...goals, { id: Math.random().toString(), value: goal }]);
      setGoal('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Fitness Goals</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your goal"
        value={goal}
        onChangeText={setGoal}
      />
      <Button title="Add Goal" onPress={addGoal} />
      <FlatList
        data={goals}
        renderItem={({ item }) => <Text style={styles.goalItem}>{item.value}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  goalItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e6ffe6',
    borderRadius: 5,
  },
});
