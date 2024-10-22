import React, { ReactNode, FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardComposition {
  Header: FC<{ children: ReactNode }>;
  Body: FC<{ children: ReactNode }>;
  Footer: FC<{ children: ReactNode }>;
}

const Card: FC<{ children: ReactNode }> & CardComposition = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

Card.Header = ({ children }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{children}</Text>
  </View>
);

Card.Body = ({ children }) => (
  <View style={styles.bodyContainer}>
    <Text style={styles.bodyText}>{children}</Text>
  </View>
);

Card.Footer = ({ children }) => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyContainer: {
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 16,
  },
  footerContainer: {
    marginTop: 5,
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Card;
