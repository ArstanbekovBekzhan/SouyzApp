import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Layout = ({ children = null }) => {
  // const refreshToken = AsyncStorage.getItem('refresh_token');
  // console.log(refreshToken);

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode="cover" 
        source={{ uri: "https://oir.mobi/uploads/posts/2021-06/1622814622_58-oir_mobi-p-gori-kirgizii-priroda-krasivo-foto-61.jpg" }} 
        style={styles.background}
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {children}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
    padding: 5,
  },
});

export default Layout;
