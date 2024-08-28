import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const CumButton = (props) => {
  return (
    <Button
    buttonStyle={styles.button}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    marginVertical: 15,
    marginHorizontal: '15%',
    backgroundColor: '#059669',
  },
});

export default CumButton;
