import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [editMode, setEditMode] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{
          uri: 'https://via.placeholder.com/150',
        }}
      />
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Bio"
            value={bio}
            onChangeText={setBio}
          />
          <Button title="Save" onPress={() => setEditMode(false)} />
        </>
      ) : (
        <>
          <Text style={styles.info}>Name: {name || 'N/A'}</Text>
          <Text style={styles.info}>Age: {age || 'N/A'}</Text>
          <Text style={styles.info}>Bio: {bio || 'N/A'}</Text>
          <Button title="Edit Profile" onPress={() => setEditMode(true)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf4fc',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
});
