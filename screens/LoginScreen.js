import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Assuming users are stored in a global array
let users = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
  { email: 'user3@example.com', password: 'password3' },
];
  
export default function LoginScreen({ navigation, setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Find the user by email and password
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // Successful login
      setIsAuthenticated(true); // Update authentication status
      Alert.alert('Login Success', `Welcome back, ${email}!`);
      navigation.navigate('Workouts'); // Navigate to the home screen (WorkoutList)
    } else {
      // Failed login
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
  },
});
