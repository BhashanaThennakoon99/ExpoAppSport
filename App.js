import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import WorkoutListScreen from './screens/WorkoutListScreen';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
import WorkoutTimerScreen from './screens/WorkoutTimerScreen';
import GoalsScreen from './screens/GoalsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Workouts Stack for nested navigation inside the "Workouts" tab
function WorkoutsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutListScreen}
        options={{ title: 'Workout Routines' }}
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{ title: 'Workout Details' }}
      />
      <Stack.Screen
        name="WorkoutTimer"
        component={WorkoutTimerScreen}
        options={{ title: 'Workout Timer' }}
      />
    </Stack.Navigator>
  );
}

// Auth Stack for Login and Signup screens
function AuthStack({ setIsAuthenticated }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Sign Up' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Workouts') {
                iconName = 'fitness'; // Icon for Workouts tab
              } else if (route.name === 'Goals') {
                iconName = 'list'; // Icon for Goals tab
              } else if (route.name === 'Profile') {
                iconName = 'person'; // Icon for Profile tab
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2a9d8f', // Active tab color
            tabBarInactiveTintColor: 'gray', // Inactive tab color
            headerStyle: { backgroundColor: '#f7f7f7' },
            headerTitleStyle: { fontWeight: 'bold' },
          })}
        >
          {/* Workouts Tab - Nested Navigation for Workout Screens */}
          <Tab.Screen
            name="Workouts"
            component={WorkoutsStack}
            options={{ headerShown: false }} // Hiding header in this tab to avoid duplication
          />
          {/* Goals Tab */}
          <Tab.Screen name="Goals" component={GoalsScreen} />
          {/* Profile Tab */}
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <AuthStack setIsAuthenticated={setIsAuthenticated} />
      )}

      {/* Status bar style for the entire app */}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
