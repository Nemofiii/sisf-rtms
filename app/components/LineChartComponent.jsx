import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Colors from '../../constant/Colors';

// Get screen width for dynamic chart size
const screenWidth = Dimensions.get('window').width;

// Function to format the timestamp into time (HH:MM AM/PM format)
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes} ${period}`;
};

// Helper function to filter data based on the selected date
const filterDataByDate = (data, selectedDate) => {
  const selectedDateString = selectedDate.toLocaleDateString();
  return data.filter(entry => {
    const entryDate = new Date(entry.timestamp).toLocaleDateString();
    return entryDate === selectedDateString;
  });
};

const LineChartComponent = ({ data, selectedDate }) => {
  const filteredData = filterDataByDate(data, selectedDate);

  const formattedData = {
    labels: [],
    datasets: [
      {
        data: [],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Blue color for temperature
      },
      {
        data: [],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Red color for moisture
      },
    ],
  };

  filteredData.forEach((entry) => {
    const timestamp = entry.timestamp;
    const temperature = parseFloat(entry.temperature);
    const soilMoisture = parseFloat(entry.soilMoisture);

    if (!isNaN(temperature) && !isNaN(soilMoisture)) {
      formattedData.labels.push(formatTime(timestamp)); // Add the formatted time as a label
      formattedData.datasets[0].data.push(temperature);
      formattedData.datasets[1].data.push(soilMoisture);
    }
  });

  if (formattedData.datasets[0].data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No valid data available for {selectedDate.toLocaleDateString()}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Data on: {selectedDate.toLocaleDateString()}</Text>

      {/* Horizontal ScrollView wrapper for the LineChart */}
      <ScrollView horizontal={true}>
        <LineChart
          data={formattedData}
          width={formattedData.labels.length * 60} // Dynamic width based on number of data points
          height={250}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#fffff1',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default LineChartComponent;
