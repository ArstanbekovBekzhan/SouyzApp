import { Text, StyleSheet, TextInput, View, Button } from 'react-native';
import Layout from '../../components/layout';
import axiosInstance from '../../axios';
import { useEffect, useState, useCallback } from 'react';
import Cards from '../../components/UI/Cards';
import Loading from '../../components/demandes/Loading';
import Error from '../../components/demandes/Error';
import Field from '../../components/UI/Field';

const News = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [page, setPage] = useState(1); // Для отслеживания текущей страницы
  const [hasMore, setHasMore] = useState(true); // Для отслеживания наличия дополнительных новостей

  const getData = useCallback(async (query = '', page = 1) => {
    try {
      const response = await axiosInstance.get('ntf/news/all', {
        params: {
          page: page,
          size: 20,
          title: query,
        },
      });
      if (page === 1) {
        setNews(response.data.data);
      } else {
        setNews(prevNews => ({
          ...prevNews,
          items: [...prevNews.items, ...response.data.data.items],
        }));
      }
      setHasMore(response.data.data.items.length > 0); // Проверка наличия дополнительных новостей
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true); // При изменении запроса или страницы начинаем загрузку
    getData(debouncedQuery, page);
  }, [getData, debouncedQuery, page]);

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1); // Загружаем следующую страницу
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  
  return (
    <Layout>
      <Text style={styles.title}>Страница новостей</Text>
      <Field
        style={styles.searchInput}
        placeholder="Поиск новостей..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {news && news.items ? (
        <>
          <Cards cardsData={news.items} />
          {hasMore && (
            <Button
              title="Еще"
              onPress={loadMore}
              color="#007bff" // Вы можете изменить цвет кнопки по вашему усмотрению
            />
          )}
        </>
      ) : (
        <Text>No news available</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#fff',
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: '#000',
    backgroundColor: '#fff',
    marginHorizontal:'auto'
  },
});

export default News;