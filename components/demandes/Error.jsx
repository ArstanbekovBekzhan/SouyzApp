import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Error = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Что-то пошло не так:</Text>
      <Text style={styles.errorMessage}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721c24',
  },
  errorMessage: {
    fontSize: 16,
    color: '#721c24',
    marginTop: 5,
  },
});

export default Error;