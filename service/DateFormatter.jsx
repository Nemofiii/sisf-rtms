import moment from 'moment';

// Function to safely parse and format a timestamp string
export const FormatDate = (timestamp) => {
  // Validate and parse the timestamp
  const validMoment = moment(timestamp, 'YYYY-MM-DD HH:mm:ss', true);
  if (validMoment.isValid()) {
    return validMoment.toDate();
  } else {
    console.warn(`Invalid timestamp: ${timestamp}`);
    return null; // Return null for invalid timestamps
  }
};

// Function to format a Date object or fallback to "N/A"
export const FormatDateForText = (date) => {
  if (date) {
    return moment(date).format('ll');
  }
  return 'N/A'; // Fallback for invalid dates
};

// Function to format a timestamp into a readable time string
export const FormatDateTime = (timestamp) => {
  const validMoment = moment(timestamp, 'YYYY-MM-DD HH:mm:ss', true);
  if (validMoment.isValid()) {
    return validMoment.format('hh:mm A'); // 12-hour time format
  } else {
    console.warn(`Invalid timestamp for time formatting: ${timestamp}`);
    return 'Invalid Time'; // Fallback for invalid timestamps
  }
};
