import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Field from '../components/UI/Field';
import CumButton from '../components/UI/Button';
import Error from '../components/UI/Error';
import axiosInstance from '../axios';
import { useRouter } from 'expo-router';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const authHandler = useCallback(async () => {
    try {
      const response = await axiosInstance.post('auth/login', { email, password });
      const { access_token, refresh_token } = response.data.data;
  
      // Сохраняем токены в AsyncStorage
      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('refresh_token', refresh_token);
  
      // Переходим на главную страницу в разделе (tabs)
      router.push('/(tabs)');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  }, [email, password]);
  
  


  return (
    <ImageBackground source={require('../assets/images/backgroundA.jpg')} style={styles.container}>
      <Text style={styles.title}>Добро пожаловать <Text style={{color:'#f6ea34'}}>SOUYZ.KG</Text> </Text>
        <Field
          value={email}
          onChangeText={setEmail}
          placeholder='Email...'
          accessibilityLabel="Email Field"
          onSubmitEditing={authHandler}

        />
        <Field
          value={password}
          onChangeText={setPassword}
          placeholder='Password...'
          onSubmitEditing={authHandler}
          secureTextEntry
          accessibilityLabel="Password Field"
        />
        {error && <Error>{error}</Error>}
        <CumButton onPress={authHandler} title='Log In' accessibilityLabel="Login Button"/>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    textAlign: 'center',
  }
});

export default AuthForm;