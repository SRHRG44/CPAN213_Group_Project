import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(128, 0, 128, 0.7)',
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