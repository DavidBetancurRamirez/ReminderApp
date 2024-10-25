import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

type ThemedTextInputProps<T extends object> = TextInputProps & {
  keyName: keyof T;
  form: T;
  setValue: (update: { key: keyof T; value: T[keyof T] }) => void;
}

const ThemedTextInput = <T extends object>({ keyName, setValue, form, ...rest }: ThemedTextInputProps<T>) => {
  const cardColor = useThemeColor("card");
  const textColor = useThemeColor("text");
  const textSecundaryColor = useThemeColor("textSecondary");

  const name = capitalizeFirstLetter(String(keyName))

  return (
    <View style={styles.container}>
      <ThemedText type='inputTitle'>{name}</ThemedText>
      <TextInput
        style={[
          { 
            backgroundColor: cardColor,
            color: textColor,
          }, 
          styles.input
        ]}
        placeholder={rest.placeholder || name} 
        value={String(form[keyName])}
        placeholderTextColor={textSecundaryColor}
        onChangeText={(value) => 
          setValue({ key: keyName, value } as { key: keyof T; value: T[keyof T] })
        }
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

const capitalizeFirstLetter = (string: string) => 
  string.charAt(0).toUpperCase() + string.slice(1)

export default ThemedTextInput;
