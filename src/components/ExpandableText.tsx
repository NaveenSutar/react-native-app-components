import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const ExpandableText = ({text}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const [lines, setLines] = useState(3);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const onTextLayout = (e: any) => {
    const {lines} = e.nativeEvent;
    if (lines.length > 2) {
      setShouldShowToggle(true);
      setLines(2);
    }
  };

  return (
    <View>
      <Text
        numberOfLines={isExpanded ? undefined : lines}
        ellipsizeMode="tail"
        onTextLayout={onTextLayout}
        style={styles.text}>
        {text}
      </Text>
      {shouldShowToggle && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={styles.toggleText}>
            {isExpanded ? 'See less' : 'See more'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  toggleText: {
    marginTop: 4,
    color: '#007bff',
    fontWeight: '500',
  },
});

export default ExpandableText;
