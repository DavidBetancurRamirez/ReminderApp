import { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedText } from "./Theme/ThemedText";
import Card from "./Card";
import { formatDate, formatTime } from "../utils/date.util";
import { useTheme } from "../context/ThemeContext";

type DateTimeSelectorProps<T extends object> = {
  title: string;
  keyName: keyof T;
  date: Date;
  minimumDate?: Date;
  setDate: (update: { key: keyof T; value: T[keyof T] }) => void;
}

type modeType = "date" | "time" | "datetime" | "countdown";

const DateTimeSelector = <T extends object>({ title, keyName, date, minimumDate, setDate }: DateTimeSelectorProps<T>) => {
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<modeType>("date");

  const { theme } = useTheme();

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      let saveDate = currentDate;
      
      if (mode !== "date") {
        const tempDate = new Date(date);
        tempDate.setHours(currentDate.getHours(), currentDate.getMinutes());
        saveDate = tempDate;
      }

      setDate({ key: keyName, value: saveDate} as { key: keyof T; value: T[keyof T] });
    }
  };

  const handlePress = (mode: modeType) => {
    setMode(mode);
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <ThemedText>{title}</ThemedText>

      <View style={styles.dateTimeContainer}>
        <Card onPress={() => handlePress("date")} style={styles.card}>
          <ThemedText>{formatDate(date)}</ThemedText>
        </Card>

        <Card onPress={() => handlePress("time")} style={styles.card}>
          <ThemedText>{formatTime(date)}</ThemedText>
        </Card>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="spinner"
          onChange={onChange}
          themeVariant={theme}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  dateTimeContainer: {
    width: "90%",
  },
  card: {
    margin: 5,
    justifyContent: "center"
  },
});

export default DateTimeSelector;
