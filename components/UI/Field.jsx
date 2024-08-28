import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Field = (props) => {
  return (
    <View style={styles.box}>
      <TextInput style={styles.input} {...props}  placeholderTextColor="#444444"/>
    </View>
  );
};

const styles = StyleSheet.create({
  box:{
    width:'100%',
  },
  input: {
    backgroundColor: '#BBBBBB',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: '#000',
    marginHorizontal: "auto",
    color:"#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: '70%',
    marginVertical: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
  },
});

export default Field;
