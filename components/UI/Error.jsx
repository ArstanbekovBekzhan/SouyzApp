import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Error = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Error;
