import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../baseComponents/Header';

const Calender = () => {
  const [selected, setSelected] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + mondayOffset + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates();
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const renderComponent = () => {
    return (
      <View style={styles.weekContainer}>
        <View style={styles.weekRow}>
          {weekDates.map((date, index) => {
            const dateString = formatDate(date);
            const isToday = dateString === today;
            const isSelected = dateString === selected;

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={dateString}
                style={[
                  styles.dayContainer,
                  isToday && styles.todayContainer,
                  isSelected && styles.selectedContainer,
                ]}
                onPress={() => setSelected(dateString)}>
                <Text style={[styles.dayName, isToday && styles.todayText]}>
                  {dayNames[index]}
                </Text>
                <Text style={[styles.dayNumber, isToday && styles.todayText]}>
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selected && (
          <Text style={styles.selectedDateText}>
            Selected: {new Date(selected).toDateString()}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Week Calender" isBackVisible />
      {renderComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  weekContainer: {
    marginTop: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    minWidth: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  todayContainer: {
    backgroundColor: '#212121',
    borderColor: '#212121',
  },
  selectedContainer: {
    borderColor: '#212121',
  },
  dayName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  todayText: {
    color: '#fff',
  },
  selectedDateText: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
});

export default Calender;
