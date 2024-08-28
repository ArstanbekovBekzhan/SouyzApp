import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'http://34.72.174.95/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      
      const accessToken = await AsyncStorage.getItem('access_token');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } else {
        console.warn('No access token found');
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

const refreshAuthToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    console.log('Refreshing token with:', refreshToken);

    const response = await axios.post('http://34.72.174.95/api/v1/auth/refresh-token', null, {
      headers: {
        Referer: refreshToken,
      },
    });

    const { access_token, refresh_token } = response.data;

    if (!access_token || !refresh_token) {
      throw new Error('Invalid response data');
    }

    await AsyncStorage.setItem('access_token', access_token);
    await AsyncStorage.setItem('refresh_token', refresh_token);
    return access_token;
  } catch (err) {
    console.error('Token refresh failed:', err);
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    throw err;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response && (response.status === 401 || response.status === 403)) {
      try {
        if (!config.__isRetryRequest) {
          config.__isRetryRequest = true;
          const newToken = await refreshAuthToken();

          config.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(config);
        }
      } catch (err) {
        console.error('Error retrying request:', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const checkAuthStatus = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    return !!accessToken;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('http://34.72.174.95/api/v1/auth/logout');
    if (response.status === 200) {

      console.log('Logged out successfully');
    } else {
      console.error('Logout failed');
    }
  } catch (err) {
    console.error('Logout error:', err);
  }
};

export default axiosInstance;
