import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/FirebaseConfig';
import Colors from '../../constant/Colors';

const HistoryTable = () => {
  const [historyData, setHistoryData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(5); // Initially show 5 rows

  useEffect(() => {
    // Fetch sensor data from Firebase Realtime Database
    const fetchData = () => {
      const sensorsRef = ref(database, 'sensorData'); // Accessing the sensorData node
      onValue(sensorsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.values(data).map((item) => ({
            timestamp: item.timestamp,
            temperature: item.temperature,
            soilMoisture: item.soilMoisture,
          }));
          setHistoryData(formattedData);
        }
      });
    };

    fetchData();
  }, []);

  const loadMoreRows = () => {
    setVisibleRows((prev) => prev + 5); // Load 5 more rows when "Load More" is clicked
  };

  const contractTable = () => {
    setVisibleRows(5); // Contract the table to show only 5 rows
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sensor Data History</Text>

      {/* Table Headings */}
      <View style={styles.row}>
        <Text style={styles.heading}>Timestamp</Text>
        <Text style={styles.heading}>Temperature (°C)</Text>
        <Text style={styles.heading}>Soil Moisture</Text>
      </View>

      {/* FlatList without ScrollView wrapping it */}
      <FlatList
        data={historyData.slice(0, visibleRows)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.timestamp}</Text>
            <Text style={styles.cell}>{item.temperature}°C</Text>
            <Text style={styles.cell}>{item.soilMoisture}</Text>
          </View>
        )}
      />

      {/* Buttons to load more or contract */}
      <View style={styles.buttonsContainer}>
        {historyData.length > visibleRows && (
          <Button color={Colors.PRIMARY} title="Load More" onPress={loadMoreRows} />
        )}
        {visibleRows > 5 && (
          <Button color={Colors.PRIMARY} title="Contract Table" onPress={contractTable} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  heading: {
    width: 120,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    width: 120,
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HistoryTable;



