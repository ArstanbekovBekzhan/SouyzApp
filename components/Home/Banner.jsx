import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axiosInstance from '../../axios';

const Banner = () => {
  const [qrCode, setQrCode] = useState(null);
  const [userCard, setUserCard] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrCodeExpiry, setQrCodeExpiry] = useState(null);
  const [countdown, setCountdown] = useState(120);

  const fetchQrCode = async () => {
    try {
      const response = await axiosInstance.get('biz/card/qrcode');
      setQrCode(response.data.data);
      const expiry = Date.now() + countdown * 1000; // Set expiry to 2 minutes from now
      setQrCodeExpiry(expiry);
      setCountdown(Math.floor((expiry - Date.now()) / 1000)); // Reset countdown to the remaining time
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const fetchUserCard = async () => {
    try {
      const response = await axiosInstance.get('biz/card/user-card');
      setUserCard(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQrCode();
    fetchUserCard();
  }, [refreshKey]);

  useEffect(() => {
    let intervalId;
    if (qrCodeExpiry) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const remainingTime = Math.max(0, Math.floor((qrCodeExpiry - now) / 1000));
        setCountdown(remainingTime);
        if (remainingTime === 0) {
          setQrCode(null);
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [qrCodeExpiry]);

  const handleRefresh = () => {
    fetchQrCode(); // Trigger QR code to be fetched again
    setRefreshKey(prevKey => prevKey + 1);
  };

  const qrCodeUri = qrCode ? `data:image/png;base64,${qrCode}` : null;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <View style={styles.container}>
      <View style={styles.QrBox}>
        {qrCodeUri ? (
          <>
            <Image 
              source={{ uri: qrCodeUri }} 
              style={styles.qrImage} 
              resizeMode="cover" 
            />
            <Text style={styles.countdown}>
              Обновить через: {minutes}:{String(seconds).padStart(2, '0')}
            </Text>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleRefresh}>
            <Text style={styles.buttonText}>Обновить QR-код</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.overlay}>
        <Text style={styles.text}>
          <Text style={styles.span}>Тип карты:</Text> {userCard.type === "compatriot" ? 'соотечественник' : userCard.type === 'foreigner' ? 'иностранец' : userCard.type}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.span}>Дата истечения:</Text> {new Date(userCard.expire_date).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.span}>Название тарифа:</Text> {userCard.tariff?.translates?.ru?.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.span}>Описание:</Text>
        </Text>
        {userCard.tariff?.translates?.ru?.description.map((item, index) => (
          <Text key={index} style={styles.descriptionItem}>- {item}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 40,
    minHeight: 500
  },
  QrBox: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  qrImage: {
    width: '70%',
    height: '70%',
    borderRadius: 20, 
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  span: {
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  overlay: {
    width: '90%',
    backgroundColor: '#ffffffab',
    borderRadius: 4,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  countdown: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
});

export default Banner;
