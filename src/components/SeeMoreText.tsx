import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../baseComponents/Header';
import ExpandableText from '../baseComponents/ExpandableText';

const SeeMoreText = () => {
  const renderComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <ExpandableText
          text={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="See More Text" isBackVisible />
      {renderComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default SeeMoreText;
