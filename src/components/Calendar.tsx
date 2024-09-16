import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import React, { useState } from 'react'
import { Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { useThemeColor } from '@/src/hooks/useThemeColor';

const Calendar = () => {
  const [items, setItems] = useState<AgendaSchedule>({});

  const loadItems = (day: { timestamp: number }) => {
    const time = day.timestamp;
    const newItems: AgendaSchedule = {};
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(time + i * 24 * 60 * 60 * 1000);
      const strTime = date.toISOString().split('T')[0];
      
      if (!items[strTime]) {
        newItems[strTime] = [];
        for (let j = 0; j < Math.floor(Math.random() * 3); j++) {
          newItems[strTime].push({
            name: `Reminder for ${strTime} #${j}`,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: strTime,
          });
        }
      }
    }


    setItems((prevItems) => {
      return {
        ...prevItems,
        ...newItems,
      };
    });
  };

  return (
    <Agenda
      theme={{
        backgroundColor: useThemeColor("background"),
        calendarBackground: useThemeColor("background"),
        textSectionTitleColor: useThemeColor("textSecondary"),
        selectedDayBackgroundColor: useThemeColor("primary"),
        selectedDayTextColor: useThemeColor("text"),
        todayBackgroundColor: useThemeColor("button"),
        dayTextColor: useThemeColor("text"),
        textDisabledColor: useThemeColor("border"),
        dotColor: useThemeColor("primary"),
        selectedDotColor: useThemeColor("text"),
        arrowColor: useThemeColor("text"),
        monthTextColor: useThemeColor("text"),
        indicatorColor: useThemeColor("primary"),
      }}
      items={items}
      loadItemsForMonth={loadItems}
      selected={new Date().toISOString().split('T')[0]}
      renderItem={(item: AgendaEntry) => {
        return (
          <ThemedView style={{ height: item.height, backgroundColor: 'lightblue' }}>
            <ThemedText>{item.name}</ThemedText>
          </ThemedView>
        );
      }}
    />
  );
}

export default Calendar;