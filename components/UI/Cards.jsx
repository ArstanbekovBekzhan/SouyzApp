import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Card, Image, Text, Button } from 'react-native-elements';

const Cards = ({cardsData}) => {
  return (
    <View style={styles.container}>
      {cardsData?.map((card) => (
        <Card key={card.uuid} containerStyle={styles.itemCard}>
          <Card.Title style={{marginVertical:10}}>{card.title}</Card.Title>
          <Card.Divider />
          <Button
            title="Подробнее"
            onPress={() => Linking.openURL(card.link)}
            buttonStyle={styles.button}
          />
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemCard: {
    borderRadius: 5,
    overflow: 'hidden',
    minHeight: 150,
    borderCurve: 'continuous', 
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#059669',
    borderRadius: 5,
    margin: 5
  },
});

export default Cards;
