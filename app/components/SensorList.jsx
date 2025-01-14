import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/FirebaseConfig';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Colors from '../../constant/Colors';
import { TypeList } from '../../constant/Sensors';
import Recommendation from './Recommendation'; // Import Recommendation component

const SensorList = () => {
  const [selectedType, setSelectedType] = useState('temperature');
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const sensorsRef = ref(database, 'sensorData');
      onValue(sensorsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.values(data).map((item) => ({
            soilMoisture: item.soilMoisture,
            temperature: item.temperature,
            timestamp: item.timestamp,
          }));
          const latestEntry = formattedData.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )[0];
          setCurrentData(latestEntry);
        } else {
          setCurrentData(null);
        }
      });
    };

    fetchData();
  }, []);

  const maxValue = selectedType === 'temperature' ? 50 : 1023;
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const value =
    currentData !== null
      ? selectedType === 'temperature'
        ? currentData.temperature
        : currentData.soilMoisture
      : 0;
  const progress = (value / maxValue) * 100;

  return (
    <View style={styles.container}>
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

      <View style={styles.circularContainer}>
        <Svg width={200} height={200}>
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#4caf50"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={circumference - (circumference * progress) / 100}
            strokeLinecap="round"
            rotation="-90"
            origin="100, 100"
          />
          <SvgText
            x="100"
            y="100"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="20"
            fill="#000"
          >
            {currentData !== null
              ? `${value}${selectedType === 'temperature' ? '°C' : ''}`
              : 'N/A'}
          </SvgText>
        </Svg>
      </View>

      {currentData && (
        <Text style={styles.timestampText}>Timestamp: {currentData.timestamp}</Text>
      )}

      {currentData === null && <Text style={styles.noDataText}>No data available</Text>}

      {/* Pass data to Recommendation component */}
      {currentData && (
        <Recommendation
          temperature={currentData.temperature}
          moisture={currentData.soilMoisture}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
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
  timestampText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default SensorList;
