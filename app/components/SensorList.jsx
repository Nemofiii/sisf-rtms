import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/FirebaseConfig';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Colors from '../../constant/Colors';
import { TypeList } from '../../constant/Sensors';

const SensorList = () => {
  const [selectedType, setSelectedType] = useState('temperature'); // Default to 'temperature'
  const [sensorData, setSensorData] = useState(null); // Store the sensor data (either temperature or moisture)

  // Function to fetch sensor data based on the selected type
  useEffect(() => {
    const fetchData = () => {
      const sensorsRef = ref(database, 'sensors'); // Accessing the sensors node
      // Listen for real-time updates
      onValue(sensorsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSensorData(data[selectedType]); // Set the data based on the selectedType
        } else {
          setSensorData(null); // No data available
        }
      });
    };

    fetchData();
  }, [selectedType]); // Re-fetch data when selectedType changes

  // List of options for FlatList (Temperature and Moisture)
//   const TypeList = [
//     { id: 'temperature', name: 'Temperature' },
//     { id: 'moisture', name: 'Moisture' },
//   ];

  const maxValue = selectedType === 'temperature' ? 50 : 1023; // Set max value for temperature or moisture
  const radius = 70; // Radius of the circle
  const strokeWidth = 10; // Thickness of the progress circle
  const circumference = 2 * Math.PI * radius; // Calculate the circle's circumference
  const progress = sensorData !== null ? (sensorData / maxValue) * 100 : 0; // Progress percentage

  return (
    <View style={styles.container}>
      {/* FlatList for Temperature and Moisture options */}
      <FlatList
        style={styles.typeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={TypeList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            style={[styles.optionText, selectedType === item.id && styles.selectedOption]}
            onPress={() => setSelectedType(item.id)}
          >
            {item.name}
          </Text>
        )}
      />

      {/* Circular Animation for Sensor Data */}
      <View style={styles.circularContainer}>
        <Svg width={200} height={200}>
          {/* Background Circle */}
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#4caf50"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={
              circumference - (circumference * progress) / 100
            } // Animate progress
            strokeLinecap="round"
            rotation="-90"
            origin="100, 100"
          />
          {/* Text Inside the Circle */}
          <SvgText
            x="100"
            y="100"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="20"
            fill="#000"
          >
            {sensorData !== null
              ? `${sensorData}${selectedType === 'temperature' ? '°C' : ''}`
              : 'N/A'}
          </SvgText>
        </Svg>
      </View>

      {/* No data fallback */}
      {sensorData === null && <Text style={styles.noDataText}>No data available</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    marginTop: 20,
    // backgroundColor: '#f5f5f5',
  },
  typeList: {
    marginBottom: 20,
  },
  optionText: {
    marginRight: 15,
    fontSize: 18,
    color: Colors.PRIMARY,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,

  },
  selectedOption: {
    backgroundColor: Colors.PRIMARY,
    color: '#fff',
  },
  circularContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default SensorList;
