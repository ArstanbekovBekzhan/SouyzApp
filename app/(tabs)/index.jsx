import { useState, useCallback, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Layout from '../../components/layout/index'
import { Banner } from '../../components/Home/index.js';
import axiosInstance from '../../axios/index.js';
import Error from '../../components/demandes/Error.jsx';
import Loading from '../../components/demandes/Loading.jsx';
import News from '../../components/Home/News.jsx';

const Home = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNewsData = useCallback(async () => {
    try {
      const response = await axiosInstance.get('ntf/news/all?page=1&size=3');
      setNews(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNewsData();
  }, [getNewsData]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Layout>
      <Text style={stylesTitle.title}>О карте:</Text>
      <Banner/>

      <Text style={stylesTitle.title}>Новости:</Text>
      <News news={news} />
    </Layout>
  );
};

const stylesTitle = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#fff',
  },
});

export default Home;