import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Layout from '../../components/layout';

function History() {
  const [filter, setFilter] = useState({
    date: '',
    establishment: '',
    discount: '',
  });

  const transactions = [
    {
      translates: {},
      establishment_name: "Не указано заведение",
      client_email: "omurkulovaidin94@gmail.com",
      card_uuid: "3f57cc5e-f50a-40f3-9b79-63b03770ec98",
      discount: 0.5,
      establishment_uuid: "0fde16f3-0c20-46ee-98f7-cd2fcf353ddd",
      created_time: "2024-08-20T10:49:41.263280Z"
    },
    // Добавьте больше данных по необходимости
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesDate = filter.date ? formatDate(transaction.created_time).includes(filter.date) : true;
    const matchesEstablishment = filter.establishment ? transaction.establishment_name.includes(filter.establishment) : true;
    const matchesDiscount = filter.discount ? (transaction.discount * 100).toFixed(2).includes(filter.discount) : true;
    return matchesDate && matchesEstablishment && matchesDiscount;
  });

  const handleFilterChange = (name, value) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
      <Text style={styles.td}>{formatDate(item.created_time)}</Text>
      <Text style={styles.td}>{item.establishment_name}</Text>
      <Text style={styles.td}>{(item.discount * 100).toFixed(2)}%</Text>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.th}>Дата</Text>
      <Text style={styles.th}>Заведение</Text>
      <Text style={styles.th}>Скидка</Text>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>Нет транзакций для отображения</Text>
    </View>
  );

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.header}>История</Text>
        <View style={styles.filters}>
          <TextInput
            placeholder="Фильтр по дате"
            value={filter.date}
            placeholderTextColor="#fff"
            onChangeText={(text) => handleFilterChange('date', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Фильтр по заведению"
            value={filter.establishment}
            placeholderTextColor="#fff"
            onChangeText={(text) => handleFilterChange('establishment', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Фильтр по скидке"
            value={filter.discount}
            placeholderTextColor="#fff"
            onChangeText={(text) => handleFilterChange('discount', text)}
            style={styles.input}
          />
        </View>

        <FlatList
          data={filteredTransactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={EmptyState}
          contentContainerStyle={styles.tableContainer}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  filters: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap:"wrap",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: 150,
    marginVertical:10,
  },
  tableContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.66)',
    padding: 10,
  },
  th: {
    flex: 1,
    textAlign: 'left',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  td: {
    flex: 1,
    color: '#fff',
    textAlign: 'left',
  },
  rowEven: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
  },
  rowOdd: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default History;