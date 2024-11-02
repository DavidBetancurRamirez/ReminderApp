import Card from "./Card";
import { useState } from "react";
import { ThemedText } from "./Theme/ThemedText";
import { View, StyleSheet, Platform } from "react-native";
import { formatDate, formatTime } from "../utils/date.util";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type DateTimeSelectorProps<T extends object> = {
  title: string;
  keyName: keyof T;
  date: Date;
  minimumDate?: Date;
  setDate: (update: { key: keyof T; value: T[keyof T] }) => void;
}

type modeType = "date" | "time" | "datetime" | "countdown";

type DateTypeProps = {
  date: Date;
  minimumDate?: Date;
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

const DateTimeSelector = <T extends object>({ title, keyName, date, minimumDate, setDate }: DateTimeSelectorProps<T>) => {

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      setDate({ key: keyName, value: selectedDate } as { key: keyof T; value: T[keyof T] });
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText>{title}</ThemedText>

      {Platform.OS === "ios" ?
        <DateTimeIos
          date={date}
          minimumDate={minimumDate}
          onChange={onChange}
        />
      :
        <DateTimeAndroid
          date={date}
          minimumDate={minimumDate}
          onChange={onChange}
        />
      }
      
    </View>
  );
};

const DateTimeIos = ({ date, minimumDate, onChange }: DateTypeProps) => {
  return (
    <>
      <DateTimePicker
        value={date}
        mode={"date"}
        onChange={onChange}
        minimumDate={minimumDate}
        style={styles.picker}
      />

      <DateTimePicker
        value={date}
        mode={"time"}
        onChange={onChange}
        minimumDate={minimumDate}
        style={styles.picker}
      />
    </>
  )
};

const DateTimeAndroid = ({ date, minimumDate, onChange }: DateTypeProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<modeType>("date");

  const handlePress = (mode: modeType) => {
    setMode(mode);
    setShowPicker(true);
  };

  const onChangeAndroid = (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    onChange(event, selectedDate);
  };

  return (
    <>
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
          onChange={onChangeAndroid}
          minimumDate={minimumDate}
        />
      )}
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  dateTimeContainer: {
    width: "80%",
  },
  card: {
    marginVertical: 5,
    justifyContent: "center"
  },
  picker: {
    marginVertical: 5
  }
});

export default DateTimeSelector;
