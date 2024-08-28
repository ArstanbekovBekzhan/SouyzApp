import { Text, View, Modal, Button, StyleSheet } from 'react-native';

const UserInformation = ({ userData, isModalVisible, setModalVisible }) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>Информация о пользователе:</Text>
          <Text style={styles.text}>Имя: <Text style={styles.span}>{userData?.first_name}</Text></Text>
          <Text style={styles.text}>Фамилия: <Text style={styles.span}t>{userData?.last_name}</Text></Text>
          <Text style={styles.text}>Почта: {userData?.email}</Text>
          <Text style={styles.text}>Телефон: {userData?.phone}</Text>
          <Button title="Закрыть" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text:{
    marginBottom: 10,
    fontSize: 16,
  },
  span:{
    textTransform: 'capitalize',
    
  },
});

export default UserInformation;
