import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center', // Center content vertically
  },
  container: {
    backgroundColor: 'rgba(128, 0, 128, 0.7)', // Transparent medium dark purple
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 5,
  },
});