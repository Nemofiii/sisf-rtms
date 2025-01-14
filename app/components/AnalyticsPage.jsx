import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/FirebaseConfig'; // Adjust the import path to your Firebase config
import LineChartComponent from './LineChartComponent'; // Import LineChartComponent
import HistoryTable from './HistoryTable';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import Colors from '../../constant/Colors';

const AnalyticsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Use Date object for selected date
  const [sensorData, setSensorData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of DateTimePicker

  useEffect(() => {
    const fetchData = () => {
      const sensorsRef = ref(database, 'sensorData');
      onValue(sensorsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.values(data).map((item) => ({
            timestamp: item.timestamp,
            temperature: item.temperature,
            soilMoisture: item.soilMoisture,
          }));
          setSensorData(formattedData);
        } else {
          setSensorData([]);
        }
      });
    };

    fetchData();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Data Analytics</Text>

      {/* Select Date Button */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerText}>Select Date</Text>
      </TouchableOpacity>

      {/* DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Line Chart Section */}
      <LineChartComponent data={sensorData} selectedDate={selectedDate} />

      {/* Table Section */}
      <HistoryTable data={sensorData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  datePickerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AnalyticsPage;
