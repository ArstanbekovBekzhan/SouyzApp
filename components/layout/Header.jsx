import { Text, View, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useState, useCallback, useEffect } from 'react';
import UserInformation from './UserInformation';
import axiosInstance from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const CustomHeader = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const getData = useCallback(async () => {
    try {
      const cachedData = await AsyncStorage.getItem('userData');
      if (cachedData) {
        setUserData(JSON.parse(cachedData));
      } else {
        const response = await axiosInstance.get('sys/users/me');
        const data = response.data.data;
        setUserData(data);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('refresh_token');
    router.push('/');
  };
  
  const nik = userData?.first_name
    ? `${userData.first_name[0]}${userData.first_name[userData.first_name.length - 1]}`
    : '';

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={handleLogout} style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Icon name="exit-to-app" color="#fff" />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'SOYUZ.KG',
          style: { color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 'auto' },
        }}
        rightComponent={
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#A68900',
                borderRadius: 50,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600' }}>
                {nik.toUpperCase()}
              </Text>
            </View>
            <Text style={{ fontSize: 16, color: "#fff" }}>{userData?.first_name || ''}</Text>
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: '#059669',
          justifyContent: 'center',
          marginHorizontal: -5,
          height: 80,
        }}
        statusBarProps={{ barStyle: 'light-content' }}
      />
      <UserInformation userData={userData} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
    </>
  );
};

export default CustomHeader;