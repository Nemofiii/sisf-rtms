import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import Colors from '../../constant/Colors';

const Recommendation = ({ temperature, moisture }) => {
  const [recommendation, setRecommendation] = useState(null); // Store recommendation
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!temperature || !moisture) return; // Ensure valid data is present

      setLoading(true);
      try {
        // Replace with your backend's deployed API URL
        const response = await axios.post('http://localhost:5000/recommend', {
          temperature,
          moisture,
        });

        setRecommendation(response.data.recommended_plant);
      } catch (error) {
        console.error('Error fetching recommendation:', error);
        Alert.alert('Error', 'Failed to fetch recommendation. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [temperature, moisture]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : recommendation ? (
        <Text style={styles.recommendationText}>
          Recommended Plant: {recommendation}
        </Text>
      ) : (
        <Text style={styles.noRecommendationText}>No recommendation available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  recommendationText: {
    fontSize: 18,
    color: Colors.SECONDARY,
    textAlign: 'center',
  },
  noRecommendationText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default Recommendation;
